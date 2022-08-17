import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
//const Dashboard: NextPage<{ username: string }> = ({ username }) => {

const Activity = (props) => {
  const [transactions, setTransactions] = useState()
  const Web3Api = useMoralisWeb3Api()
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    logout,
    isLoggingOut,
  } = useMoralis()

  const fetchTransactions = async () => {
    const data = await Web3Api.account.getTransactions({
      chain: 'rinkeby',
      address: user.get('ethAddress'),
    })
    if (data) {
      setTransactions(data.result)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  console.log(transactions)

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        isAuthenticating={isAuthenticating}
        user={user}
        authenticate={authenticate}
        logout={logout}
        isLoggingOut={isLoggingOut}
        isLandingPage={false}
      ></Navbar>
      <div className="relative h-[550px] w-full bg-[#E5E5E5] p-10">
        <div className="w-500px h-full rounded-md bg-white py-5 px-10 shadow-md">
          <h1 className="text-2xl">Transactions</h1>
          <div className="rounded-md border-[1px] border-[#D1D1D1]">Test</div>
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

export default Activity
