import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useMoralis, useWeb3Transfer } from 'react-moralis'
import { multipayAbi, multipayContract } from './utils/constants'
import { ethers } from 'ethers'
import { useBalance } from './hooks/useBalance'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { assets, loading, fetchBalance, getUserBalance } = useBalance()

  const [username, setUsername] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tsxLink, setTsxLink] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [multipayErr, setMultipayErr] = useState(null)
  const [mpayBalance, setMpayBalance] = useState(null)

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
  const multiTransfer = async (addresses, amounts) => {
    setMultipayErr(null)
    let validAddresses = true
    let validAmounts = true

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
      amountArray[i] = parseFloat(element)
      console.log(element)
      if (typeof element != 'number') {
        validAmounts = false
        setMultipayErr('ERROR - Invalid Amounts')
      }
    })
    console.log(amountArray)
    if (validAmounts == false) return

    if (amountArray.length != addressArray.length) {
      return setMultipayErr('ERROR - Addresses and amounts are not equal')
    }
  }

  //set context user data
  useEffect(async () => {
    if (isAuthenticated) {
      const currentUsername = await user?.get('nickname')
      setUsername(currentUsername)
      const address = await user?.get('ethAddress')
      setUserAddress(address)
      await getUserBalance()
      setMpayBalance(assets?.filter((i) => i.symbol == 'MPAY')[0].balance)
      console.log(mpayBalance)
    }
  }, [isAuthenticated, authenticate, userAddress, setUsername, user, username])

  return (
    <AppContext.Provider
      value={{
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
        username,
        setUsername,
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
        multiTransfer,
        multipayErr,
        getUserBalance,
        assets,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
