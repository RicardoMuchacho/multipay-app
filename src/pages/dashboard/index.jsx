import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useMoralis } from 'react-moralis'
import { useBalance } from '../../hooks/useBalance'
import { roundDown } from '../../utils/formatter'
import { BeatLoader } from 'react-spinners'
import { DefaultModal, ReceiveModal } from '../../components/Modals'
import useModal from '../../hooks/useModal'
import { useState } from 'react'

const Dashboard = (props) => {
  const { user } = useMoralis()
  const { assets, loading, fetchBalance } = useBalance()
  const { visibleReceive, hideReceiveModal, openReceiveModal } = useModal()
  const [token, setToken] = useState('')

  return (
    <>
      <Navbar isLandingPage={false}></Navbar>
      <div className="relative h-[550px] w-full bg-[#E5E5E5]">
        <div className="grid h-full w-full grid-flow-col grid-cols-3 gap-5 p-8">
          <div className="w-500px col-span-2 row-span-2 h-full rounded-md bg-white p-5 shadow-md">
            <div className="h-full overflow-auto rounded-md  border-[#D1D1D1]">
              {user && (
                <BeatLoader
                  className="text-center"
                  color="gray"
                  loading={loading}
                ></BeatLoader>
              )}

              {!user ? (
                <div className="flex h-full place-items-center">
                  <p className="w-full text-center">
                    No user connected. Connect Wallet
                  </p>
                </div>
              ) : (
                <table class="w-full table-auto">
                  <thead className="text-sm  text-[#8C8C8C]">
                    <tr className="m-3">
                      <th className="font-normal">Coin</th>
                      <th className="font-normal">Balance</th>
                      <th className="font-normal">USD Value</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="border-[#D1D1D1] text-center">
                    {assets?.map((asset) => (
                      <>
                        <tr
                          key={asset.token_address}
                          className="border-y border-[#D1D1D1]"
                        >
                          <td className="whitespace-nowrap px-3 py-1 text-left">
                            {asset.name} ( {asset.symbol} )
                          </td>
                          <td className="px-3 py-1">
                            {roundDown(
                              asset.balance / Math.pow(10, asset.decimals),
                              3
                            )}
                          </td>
                          <td className="px-3 py-1">Not Ready</td>
                          <td className="py-1">
                            <button
                              onClick={async () => {
                                await setToken(asset.name)
                                openReceiveModal()
                              }}
                              className="mr-3 rounded-sm border bg-[#ECECEC]  p-0.5 px-1 text-sm hover:bg-slate-200"
                            >
                              Receive
                            </button>
                            <button className="rounded-sm border bg-[#ECECEC] p-0.5 px-1 text-sm hover:bg-slate-200">
                              Send
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="h-50%  relative w-full rounded-md bg-white p-5 shadow-md"></div>
          <div className="h-50%  relative w-full rounded-md bg-white p-5 shadow-md"></div>
          <ReceiveModal
            visible={visibleReceive}
            hide={hideReceiveModal}
            address={user.get('ethAddress')}
            token={token}
          ></ReceiveModal>
        </div>
      </div>
      <FooterComp></FooterComp>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { username: 'rick' }, // will be passed to the page component as props
  }
}

export default Dashboard
