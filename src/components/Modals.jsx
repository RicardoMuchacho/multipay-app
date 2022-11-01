import React from 'react'
import { AppContext } from '../AppContext'
import { useContext, useRef } from 'react'
import { BeatLoader } from 'react-spinners'

export const DefaultModal = (props) => {
  return (
    <>
      <div
        className="absolute top-0 left-0 h-full w-full bg-transparent"
        style={{ display: props.visible }}
      >
        <div className="flex h-full w-full justify-center bg-slate-500 bg-opacity-40">
          <div className="h-250 absolute -mt-10 w-auto self-center rounded-lg border border-gray-200 bg-white p-3 shadow-md">
            <button
              onClick={props.hide}
              className="absolute top-0 right-0 rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 "
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}

export const ReceiveModal = (props) => {
  return (
    <DefaultModal visible={props.visible} hide={props.hide}>
      <div className="p-3">
        <div className="text-center">
          <p className="font-semibold">
            Copy and send this address to receive {props.token}
          </p>
        </div>
        <p className="my-3 rounded-md border p-1 text-center">
          {props.address}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(props.address)
              //alert('Copied address')
            }}
            className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Copy
          </button>
        </div>
      </div>
    </DefaultModal>
  )
}

export const SendModal = (props) => {
  return (
    <DefaultModal visible={props.visible} hide={props.hide}>
      <div className="p-3">
        <div className="text-center">
          <p>Copy and send this address to receive {props.token}</p>
        </div>
        <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600">
          <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            I accept
          </button>
          <button className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Decline
          </button>
        </div>
      </div>
    </DefaultModal>
  )
}

export const BuyModal = (props) => {
  const { buyTokens2, buyTokens, isLoading, tsxLink, setTsxLink } =
    useContext(AppContext)
  const amountRef = useRef()

  return (
    <DefaultModal visible={props.visible} hide={props.hide}>
      <div className="p-3">
        <div className="text-center">
          <p className="pb-2 font-semibold">Buy MPAY Tokens {props.token}</p>
        </div>
        <p className="py-0 text-gray-500">Rate: 0.001 ETH = 1 MPAY</p>
        <p className="pt-2 text-gray-500">Amount:</p>
        <input
          id="mpayAmount"
          className="mb-3 rounded-md border px-1 text-center"
          type="number"
          min="1"
          ref={amountRef}
        />

        <div className="flex-col justify-center">
          {isLoading ? (
            <>
              <BeatLoader
                className="text-center"
                color="gray"
                loading={isLoading}
              ></BeatLoader>
              <p className="text-center">
                Transaction in progress, wait a moment!
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                setTsxLink(null)
                buyTokens2(amountRef.current.value)
              }}
              className="block rounded-lg bg-blue-700 px-5 py-1 text-sm font-medium text-white hover:bg-blue-800"
            >
              Buy
            </button>
          )}
        </div>
        {tsxLink && (
          <a
            className="text-center text-blue-600 hover:underline"
            href={tsxLink}
            target="_blank"
          >
            Completed!, Check on etherscan
          </a>
        )}
      </div>
    </DefaultModal>
  )
}
