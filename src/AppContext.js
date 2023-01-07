import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useMoralis, useWeb3Transfer, useMoralisWeb3Api } from 'react-moralis'
import {
  multipayAbi,
  multipayContract,
  multipaymentAbi,
  multipaymentContract,
} from './utils/constants'
import { BigNumber, ethers } from 'ethers'
import { useBalance } from './hooks/useBalance'
import { useBtcChart } from './hooks/useBtcChart'
import { useEthChart } from './hooks/useEthChart'
import moment from 'moment/moment'
import { formatNativeBalance } from './utils/formatter'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [assets, setAssets] = useState()
  const [loading, setLoading] = useState(false)
  const [userAddress, setUserAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tsxLink, setTsxLink] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [multipayErr, setMultipayErr] = useState(null)
  const [multipayTsx, setMultipayTsx] = useState(null)
  const [mpayBalance, setMpayBalance] = useState(null)

  const { isLoadingBtcChart, btcChartData, getBtcChartData } = useBtcChart()

  const { isLoadingEthChart, ethChartData, getEthChartData } = useEthChart()

  const testnet = 'goerli'
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_WEB3API_KEY
  const { authenticate, enableWeb3, Moralis, user, isWeb3Enabled, logout } =
    useMoralis()

  const connectWallet = async () => {
    await enableWeb3()
    await authenticate()
  }

  async function handleAuth(prov) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signedMessage = await signer.signMessage(
        'Multipay App Authentication'
      )
      console.log(signedMessage)
      const signerAddr = await ethers.utils.verifyMessage(
        'Multipay App Authentication',
        signedMessage
      )
      console.log(signerAddr)
      setUserAddress(signerAddr)
    } catch (error) {
      console.log(error)
    }
  }
  // async function handleAuth(provider) {
  //   try {
  //     await Moralis.enableWeb3({
  //       throwOnError: true,
  //       provider,
  //     })

  //     const { account, chainId } = Moralis

  //     if (!account) {
  //       throw new Error(
  //         'Connecting to chain failed, as no connected account was found'
  //       )
  //     }
  //     if (!chainId) {
  //       throw new Error(
  //         'Connecting to chain failed, as no connected chain was found'
  //       )
  //     }

  //     const { message } = await Moralis.Cloud.run('requestMessage', {
  //       address: account,
  //       chain: parseInt(chainId, 16),
  //       network: 'evm',
  //     })

  //     await authenticate({
  //       signingMessage: message,
  //       throwOnError: true,
  //     }).then((user) => {
  //       console.log(user)
  //       console.log(user?.get('ethAddress'))
  //       setUserAddress(user.get('ethAddress'))
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const buyTokens = async (buyAmount) => {
    if (!userAddress) {
      await handleAuth()
    }
    if (!isWeb3Enabled) {
      await enableWeb3()
    }
    if (buyAmount <= 0 || buyAmount == undefined || buyAmount == null) {
      return
    }
    let options = {
      amount: Moralis.Units.ETH(buyAmount * 0.001),
      receiver: multipayContract,
      type: 'native',
      contractAddress: multipayContract,
    }
    setIsLoading(true)
    try {
      const transaction = await Moralis.transfer(options)
      const result = await transaction.wait()
      console.log(transaction)
      setTsxLink(`https://goerli.etherscan.io/tx/${transaction.hash}`)
      setIsLoading(false)
    } catch (error) {
      setTsxLink(null)
      setErrorMsg('Transaction failed!')
      console.log(error)
      setErrorMsg(null)
      setIsLoading(false)
    }
  }

  //0xc717879FBc3EA9F770c0927374ed74A998A3E2Ce
  const transferTokens = async (
    sendAmount,
    receiver,
    contractAddress,
    decimals
  ) => {
    if (!userAddress) {
      await handleAuth()
    }
    if (!isWeb3Enabled) {
      await enableWeb3()
    }
    console.log(sendAmount, receiver, contractAddress)
    if (sendAmount <= 0 || sendAmount == undefined || sendAmount == null) {
      return console.log('Invalid amount')
    }
    if (!receiver || receiver.length < 42 || !receiver.startsWith('0x')) {
      return console.log('Invalid address')
    }
    let options = {
      amount: Moralis.Units.Token(sendAmount, decimals),
      receiver: receiver,
      type: 'erc20',
      contractAddress: contractAddress,
    }
    if (contractAddress == 'goerli eth') {
      options = {
        type: 'native',
        amount: Moralis.Units.ETH(sendAmount),
        receiver: receiver,
      }
    }
    setIsLoading(true)
    try {
      const transaction = await Moralis.transfer(options)
      const result = await transaction.wait()
      console.log(transaction)
      setTsxLink(`https://goerli.etherscan.io/tx/${transaction.hash}`)
      setErrorMsg(null)
      setIsLoading(false)
    } catch (error) {
      setTsxLink(null)
      setErrorMsg('Transaction failed!')
      console.log(error)
      setIsLoading(false)
    }
  }

  //0xc717879FBc3EA9F770c0927374ed74A998A3E2Ce
  //0xecB0Cc64e7D5Bd306E1C86E702ba41c4E5B8a161
  const multiTransfer = async (addresses, amounts) => {
    if (!userAddress) {
      await handleAuth()
    }
    if (!isWeb3Enabled) {
      await enableWeb3()
    }
    setMultipayErr(null)
    let validAddresses = true
    let validAmounts = true
    var totalAmount = 0

    if (!addresses || !amounts) {
      return setMultipayErr('ERROR - missing data')
    }
    let addressArray = addresses.split('\n')
    let amountArray = amounts.split('\n')

    addressArray.forEach((element) => {
      if (element.length < 4) {
        validAddresses = false
        setMultipayErr('ERROR - Invalid address')
      }
      if (!element.startsWith('0x')) {
        validAddresses = false
        setMultipayErr('ERROR - Addresses must start with 0x')
      }
    })

    console.log(addressArray)
    if (validAddresses == false) return

    amountArray.forEach((element, i) => {
      if (isNaN(parseFloat(amountArray[i]))) {
        validAmounts = false
        setMultipayErr('ERROR - Invalid Amounts')
      } else {
        totalAmount += parseFloat(amountArray[i])
        let gwei = Moralis.Units.Token(parseFloat(element, 18))
        amountArray[i] = BigNumber.from(gwei)
      }
    })
    console.log(amountArray, totalAmount)
    if (validAmounts == false) return

    if (amountArray.length != addressArray.length) {
      return setMultipayErr('ERROR - Addresses and amounts are not equal')
    }

    let options = {
      abi: multipaymentAbi,
      contractAddress: multipaymentContract,
      functionName: 'withdrawls',
      msgValue: Moralis.Units.ETH(totalAmount),
      params: {
        withdrawls: Moralis.Units.ETH(totalAmount),
        addrs: addressArray,
        amnts: amountArray,
      },
    }
    setIsLoading(true)
    try {
      const transaction = await Moralis.executeFunction(options)
      const result = await transaction.wait()
      console.log(transaction)
      setMultipayTsx(`https://goerli.etherscan.io/tx/${transaction.hash}`)
      setMultipayErr('Transaction Successful!')
      setIsLoading(false)
    } catch (error) {
      setMultipayErr('Transaction failed!')
      setMultipayTsx(null)
      console.log(error)
      setIsLoading(false)
    }
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_WEB3API_KEY,
    },
  }

  const fetchNativeBalance = async () => {
    const nativeBalance = await fetch(
      `https://deep-index.moralis.io/api/v2/${userAddress}/balance?chain=goerli`,
      options
    )
    const nativeBalanceJson = await nativeBalance.json()
    return await formatNativeBalance(nativeBalanceJson.balance)
  }

  const fetchBalance = async () => {
    const balance = await fetch(
      `https://deep-index.moralis.io/api/v2/${userAddress}/erc20?chain=goerli`,
      options
    )
    const balanceJson = await balance.json()
    console.log(balanceJson)

    return balanceJson
  }

  const getUserBalance = async () => {
    if (userAddress) {
      setLoading(true)
      var assetsArray = await fetchBalance()
      await fetchNativeBalance().then((nativeBalance) =>
        assetsArray.unshift(nativeBalance)
      )
      setAssets(assetsArray)
      setLoading(false)
    }
  }

  //set context user data
  useEffect(async () => {
    // const address = await user?.get('ethAddress')
    // setUserAddress(address)
    await getUserBalance()
    console.log(assets)
    // setMpayBalance(assets?.filter((i) => i.symbol == 'MPAY')[0].balance)
    // console.log(mpayBalance)
  }, [userAddress])

  useEffect(async () => {
    await setTimeout(5000)
    await getBtcChartData()
    await getEthChartData()
    console.log('chart data imported')
  }, [])

  return (
    <AppContext.Provider
      value={{
        authenticate,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
        logout,
        userAddress,
        setUserAddress,
        testnet,
        buyTokens,
        tsxLink,
        setTsxLink,
        isLoading,
        buyTokens,
        transferTokens,
        errorMsg,
        setErrorMsg,
        mpayBalance,
        setMpayBalance,
        multiTransfer,
        multipayErr,
        multipayTsx,
        getUserBalance,
        assets,
        loading,
        connectWallet,
        btcChartData,
        ethChartData,
        isLoadingBtcChart,
        isLoadingEthChart,
        handleAuth,
        apiKey,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
