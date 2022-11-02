import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useMoralis, useWeb3Transfer } from 'react-moralis'
import { multipayAbi, multipayContract } from './utils/constants'
import { ethers } from 'ethers'
import { useBalance } from './hooks/useBalance'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tsxLink, setTsxLink] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const testnet = 'goerli'

  const { assets, loading, fetchBalance } = useBalance()

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
  //set context user data
  useEffect(async () => {
    if (isAuthenticated) {
      const currentUsername = await user?.get('nickname')
      setUsername(currentUsername)
      const address = await user?.get('ethAddress')
      setUserAddress(address)
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
