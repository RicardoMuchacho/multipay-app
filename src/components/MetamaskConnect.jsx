import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import Router from 'next/router'
import { truncateAddress } from '../utils/formatter'
import { AiOutlineUser } from 'react-icons/ai'
import { TbLogout } from 'react-icons/tb'

export const MetamaskConnect = (props) => {
  const { authenticate, isAuthenticated, user, logout, userAddress } =
    useContext(AppContext)

  if (!isAuthenticated) {
    return (
      <>
        <button
          className="mr-20 ml-5 inline-flex items-center self-center rounded border border-white p-1 px-2 text-white hover:bg-slate-600"
          onClick={() =>
            authenticate().then(() => {
              if (props.isLandingPage) Router.push('/dashboard')
            })
          }
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
    <>
      <div className="mr-5 ml-5 inline-flex items-center self-center rounded border border-white p-1 px-2 text-white hover:bg-slate-600">
        <p className="inline-flex items-center gap-1">
          {truncateAddress(userAddress)} <AiOutlineUser />
        </p>
      </div>
      <div className="mr-10 inline-flex items-center self-center rounded border border-white p-1 px-2 text-white hover:bg-slate-600">
        <button
          className="inline-flex items-center gap-2"
          onClick={() => logout()}
        >
          Logout <TbLogout />
        </button>
      </div>
    </>
  )
}

export default MetamaskConnect
