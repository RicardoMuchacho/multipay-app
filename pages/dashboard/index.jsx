import Link from 'next/link'
import Navbar from '../../components/Navbar'
import FooterComp from '../../components/FooterComp'
import { useMoralis } from 'react-moralis'
//const Dashboard: NextPage<{ username: string }> = ({ username }) => {

const Dashboard = (props) => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    logout,
    isLoggingOut,
  } = useMoralis()

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
      <div className="relative h-[550px] w-full bg-[#E5E5E5]">
        <div className="grid h-full w-full grid-flow-col grid-cols-3 gap-5 p-8">
          <div className="w-500px col-span-2 row-span-2 h-full rounded-md bg-white p-5 shadow-md">
            <p>username: {props.username}</p>
            <Link href={'/'}>
              <a> Home </a>
            </Link>
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
