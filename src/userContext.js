import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null)

  return (
    <UserContext.Provider value={{ globalUser, setGlobalUser }}>
      {children}
    </UserContext.Provider>
  )
}
