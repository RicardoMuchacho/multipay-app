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
  const [tsxLink, setTsxLink] = useState('')

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
    const transaction = await Moralis.transfer(options)
    console.log(transaction)
    setTsxLink(`https://goerli.etherscan.io/tx/${transaction.hash}`)
    setIsLoading(false)
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
