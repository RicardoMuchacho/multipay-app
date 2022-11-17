import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useContext, useState, useRef } from 'react'
import { AppContext } from '../../AppContext'
import { BuyModal } from '../../components/Modals'
import useModal from '../../hooks/useModal'
import { BeatLoader } from 'react-spinners'

const Multipay = (props) => {
  const {
    user,
    userAddress,
    mpayBalance,
    multiTransfer,
    multipayErr,
    isLoading,
  } = useContext(AppContext)
  const { hideBuyModal, visibleBuy, openBuyModal } = useModal()
  const [transferToken, setTransferToken] = useState('ETH')
  const addresses = useRef()
  const amounts = useRef()

  return (
    <>
      <Navbar buy={openBuyModal} isLandingPage={false}></Navbar>

      <div className="relative h-[650px] w-full bg-[#E5E5E5] p-10">
        <div className="w-500px h-full overflow-auto rounded-md bg-white py-6 px-10 shadow-md">
          <div className="mx-20">
            <p className=" mb-1 text-center text-2xl font-medium">
              Multipayment Feature
            </p>
            <p className="mb-5 text-center">
              Make up to 100 transactions at the cost of 1
            </p>
            <div className="rounded-sm border p-2">
              <p className="">1. Own at least 10 MPAY Tokens to enable</p>

              <p className="">2. Select a Token to send to the addresses</p>
              <p className="">
                3. Create your List of addresses with the corresponding amount
                to send
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <label onChange={() => console.log(tokenSelection)} for="token">
              Select token for transfer:
            </label>

            <select
              className="mx-2 w-16 rounded-md border text-center"
              name="token"
              id="tokenid"
              defaultValue={transferToken}
              onChange={(e) => {
                setTransferToken(e.target.value)
              }}
            >
              <option value="ETH">ETH</option>
              <option disabled value="USDC">
                USDC - Coming Soon!
              </option>
            </select>
          </div>
          {mpayBalance > 10 ? (
            <>
              <div className="flex h-60 w-full justify-center gap-2 overflow-auto p-5">
                <textarea
                  className="rounded-md border border-[#D1D1D1]  p-3 focus:border-gray-400 focus:outline-none"
                  name="textarea"
                  placeholder={
                    'addresses\nExample:\n0xecB0Cc64e7D5Bd306E1C86E702ba41c4E5B8a161\n0xecB0Cc64e7D5Bd306E1C86E702ba41c4E5B8a000\n...'
                  }
                  rows="5"
                  cols="50"
                  ref={addresses}
                ></textarea>

                <textarea
                  className="rounded-md border  border-[#D1D1D1] p-3 focus:border-gray-400 focus:outline-none"
                  name="textarea"
                  placeholder={'amounts\n\n0.2\n0.5\n...'}
                  rows="5"
                  cols="10"
                  ref={amounts}
                ></textarea>
              </div>
              <div className="flex justify-center">
                {isLoading ? (
                  <BeatLoader
                    className="text-center"
                    color="gray"
                    loading={isLoading}
                  ></BeatLoader>
                ) : (
                  <button
                    onClick={() =>
                      multiTransfer(
                        addresses.current.value,
                        amounts.current.value
                      )
                    }
                    className="text-md rounded-sm border bg-[#ECECEC] py-1 px-2 hover:bg-slate-200 disabled:bg-slate-400"
                  >
                    Transfer
                  </button>
                )}
              </div>
              {multipayErr && <p className="mt-1 text-center">{multipayErr}</p>}
            </>
          ) : (
            <div className="flex h-60 w-full justify-center gap-2 overflow-auto p-5">
              <div className="flex h-full w-2/3 place-content-center place-items-center rounded-sm border">
                <div>
                  <p className="w-full text-center">Disabled! </p>
                  <p className="w-full text-center">
                    You need at least 10 MPAY to enable this feature
                  </p>
                </div>
              </div>
            </div>
          )}

          <BuyModal visible={visibleBuy} hide={hideBuyModal}></BuyModal>
        </div>
      </div>
      <FooterComp></FooterComp>
    </>
  )
}

export default Multipay
