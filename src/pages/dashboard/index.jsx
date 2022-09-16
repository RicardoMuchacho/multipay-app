import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useMoralis } from 'react-moralis'
import { useBalance } from '../../hooks/useBalance'
import { roundDown } from '../../utils/formatter'
const Dashboard = (props) => {
  const { user } = useMoralis()
  const { assets, fetchBalance } = useBalance()

  return (
    <>
      <Navbar isLandingPage={false}></Navbar>
      <div className="relative h-[550px] w-full bg-[#E5E5E5]">
        <div className="grid h-full w-full grid-flow-col grid-cols-3 gap-5 p-8">
          <div className="w-500px col-span-2 row-span-2 h-full rounded-md bg-white p-5 shadow-md">
            <p>username: {props.username}</p>
            <div className="rounded-md border border-[#D1D1D1]">
              {!user ? (
                <div className="flex h-full justify-center">
                  <p className="mb-20 place-self-center">
                    No user connected. Connect Wallet
                  </p>
                </div>
              ) : (
                <table class="w-full table-auto">
                  <thead className="text-sm font-extralight text-[#8C8C8C]">
                    <tr className="m-3">
                      <th>Coin</th>
                      <th>Balance</th>
                      <th>USD Value</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="border-1 border-collapse border-[#D1D1D1] text-center">
                    {assets?.map((asset) => (
                      <>
                        <tr
                          key={asset.token_address}
                          className="border-y border-[#D1D1D1]"
                        >
                          <td className="whitespace-nowrap px-3 py-1">
                            {asset.symbol}
                          </td>
                          <td className="px-3 py-1">
                            {roundDown(
                              asset.balance / Math.pow(10, asset.decimals),
                              3
                            )}
                          </td>
                          <td className="px-3 py-1">Not Ready</td>
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
