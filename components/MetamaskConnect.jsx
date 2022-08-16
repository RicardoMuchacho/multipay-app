import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export const MetamaskConnect = () => {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis()

  // const login = async () => {
  //   if (!isAuthenticated) {
  //     await authenticate()
  //       .then(function (user) {
  //         console.log(user.get('ethAddress'))
  //       })
  //       .catch(function (error) {
  //         console.log(error)
  //       })
  //   } else {
  //     console.log('Auth')
  //   }
  // }

  if (!isAuthenticated) {
    return (
      <>
        <button
          className="mr-20 ml-10 inline-flex items-center self-center rounded border border-white p-1 px-2 text-white hover:bg-slate-600"
          onClick={() => authenticate()}
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          Connect wallet
        </button>
      </>
    )
  }
  return (
    <div>
      <p>Authenticated</p>
    </div>
  )
}

export default MetamaskConnect
