import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import moment from 'moment'
import { useTransactions } from '../../hooks/useTransactions'

const Activity = (props) => {
  const { transactions, loading, fetchTransactions } = useTransactions()
  const { user } = useMoralis()
  const BaseUrl = 'https://rinkeby.etherscan.io/tx/'

  return (
    <>
      <Navbar isLandingPage={false}></Navbar>
      <div className="relative h-[550px] w-full bg-[#E5E5E5] p-10">
        <div className="w-500px h-full overflow-auto rounded-md bg-white py-5 px-10 shadow-md">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">Transactions</h1>
            <button className="text-2xl" onClick={() => fetchTransactions()}>
              &#128259;
            </button>
            <BeatLoader color="gray" loading={loading}></BeatLoader>
          </div>
          {transactions.length === 0 ? (
            !user ? (
              <div className="flex h-full justify-center">
                <p className="mb-20 place-self-center">
                  No user connected. Connect Wallet
                </p>
              </div>
            ) : (
              <div className="flex h-full justify-center">
                <p className="mb-20 place-self-center">No transactions</p>
              </div>
            )
          ) : (
            <div class="min-w-full">
              <table class="my-5 w-full table-auto">
                <thead className="text-sm font-extralight text-[#8C8C8C]">
                  <tr className="m-3">
                    <th>Time</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Transaction Hash</th>
                  </tr>
                </thead>
                <tbody className="border-collapse border-y border-[#D1D1D1] text-center">
                  {transactions.map((transaction) => (
                    <>
                      <tr
                        key={transaction.hash}
                        className="border-y border-[#D1D1D1]"
                      >
                        <td className="whitespace-nowrap px-3 py-1">
                          {moment(transaction.block_timestamp).format(
                            'MM-DD-YYYY, h:mm:ss a'
                          )}
                        </td>
                        <td className="px-3 py-1">
                          {transaction.from_address == user.get('ethAddress')
                            ? 'sent'
                            : 'received'}
                        </td>
                        <td className="px-3 py-1">{transaction.value}</td>
                        <td className="px-3 py-1">
                          {transaction.receipt_status === '1'
                            ? 'success'
                            : 'failed'}
                        </td>

                        <td className="break-all px-3 py-1">
                          <a
                            className=" text-blue-600 hover:underline"
                            href={`${BaseUrl}${transaction.hash}`}
                            target="_blank"
                          >
                            {transaction.hash}
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <FooterComp></FooterComp>
    </>
  )
}

export default Activity
