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

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { assets, loading, getUserBalance } = useBalance()
  const [userAddress, setUserAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tsxLink, setTsxLink] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [multipayErr, setMultipayErr] = useState(null)
  const [mpayBalance, setMpayBalance] = useState(null)

  const { isLoadingBtcChart, btcChartData, getBtcChartData } = useBtcChart()

  const { isLoadingEthChart, ethChartData, getEthChartData } = useEthChart()

  const testnet = 'goerli'
  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
    logout,
  } = useMoralis()

  const connectWallet = async () => {
    await enableWeb3()
    await authenticate()
  }

  const buyTokens = async (buyAmount) => {
    if (!isAuthenticated) {
      await enableWeb3()
      await connectWallet()
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
    if (!isAuthenticated) {
      await enableWeb3()
      await connectWallet()
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
    if (!isAuthenticated) {
      await enableWeb3()
      await connectWallet()
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
        console.log(gwei + 'll')
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
      setMultipayErr(`Successful transaction!`)
      setIsLoading(false)
    } catch (error) {
      setMultipayErr('Transaction failed!')
      console.log(error)
      setIsLoading(false)
    }
  }

  //set context user data
  useEffect(async () => {
    if (isAuthenticated) {
      const address = await user?.get('ethAddress')
      setUserAddress(address)
      await getUserBalance()
      // setMpayBalance(assets?.filter((i) => i.symbol == 'MPAY')[0].balance)
      // console.log(mpayBalance)
    }
  }, [isAuthenticated, authenticate, userAddress, user])

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
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
        logout,
        userAddress,
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
        getUserBalance,
        assets,
        loading,
        connectWallet,
        btcChartData,
        ethChartData,
        isLoadingBtcChart,
        isLoadingEthChart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
