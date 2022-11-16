import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { AppContext } from '../../AppContext'
import { useBalance } from '../../hooks/useBalance'
import { roundDown } from '../../utils/formatter'
import { BeatLoader } from 'react-spinners'
import { ReceiveModal, BuyModal, SendModal } from '../../components/Modals'
import useModal from '../../hooks/useModal'
import { useContext, useState } from 'react'

const Dashboard = (props) => {
  const { user, userAddress, assets, loading, getUserBalance } =
    useContext(AppContext)

  // const { assets, loading, getUserBalance } = useBalance()
  const {
    visibleReceive,
    hideReceiveModal,
    openReceiveModal,
    visibleSend,
    openSendModal,
    hideSendModal,
    visibleBuy,
    hideBuyModal,
    openBuyModal,
  } = useModal()
  const [token, setToken] = useState({})

  return (
    <>
      <Navbar buy={openBuyModal} isLandingPage={false}></Navbar>
      <div className="relative h-[550px] w-full overflow-auto bg-[#E5E5E5]">
        <div className="grid h-full w-full grid-flow-col grid-cols-3 gap-5 p-10">
          <div className="w-500px col-span-2 row-span-2 h-full rounded-md bg-white shadow-md">
            <div className="h-full overflow-auto rounded-md  border-[#D1D1D1] py-5 px-10 ">
              <div className="mb-2 flex items-center gap-2">
                <h1 className="text-2xl">Portofolio</h1>
                <button className="text-2xl" onClick={() => getUserBalance()}>
                  &#128259;
                </button>
                {user && (
                  <BeatLoader
                    className="text-center"
                    color="gray"
                    loading={loading}
                  ></BeatLoader>
                )}
              </div>

              {!user ? (
                <div className="flex h-full place-items-center">
                  <p className="w-full text-center">
                    No user connected. Connect Wallet
                  </p>
                </div>
              ) : (
                <table className="w-full table-auto">
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
                              onClick={() => {
                                setToken(asset)
                                openReceiveModal()
                              }}
                              className="mr-3 rounded-sm border bg-[#ECECEC]  p-0.5 px-1 text-sm hover:bg-slate-200"
                            >
                              Receive
                            </button>
                            <button
                              onClick={() => {
                                console.log(asset)

                                setToken(asset)
                                openSendModal()
                              }}
                              className="rounded-sm border bg-[#ECECEC] p-0.5 px-1 text-sm hover:bg-slate-200"
                            >
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
            address={userAddress}
            token={token.name}
          ></ReceiveModal>
          <BuyModal visible={visibleBuy} hide={hideBuyModal}></BuyModal>
          <SendModal
            token={token.name}
            balance={token.balance}
            decimals={token.decimals}
            contract={token.token_address}
            visible={visibleSend}
            hide={hideSendModal}
          ></SendModal>
        </div>
      </div>
      <FooterComp></FooterComp>
    </>
  )
}

export default Dashboard
