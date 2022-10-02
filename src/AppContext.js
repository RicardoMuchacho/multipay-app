import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('')
  const [userAddress, setUserAddress] = useState('')

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
    logout,
  } = useMoralis()

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
