import NextPage from 'next'
import Link from 'next/link'

//const Dashboard: NextPage<{ username: string }> = ({ username }) => {

export const index = () => {
  return <div>index</div>
}

const Dashboard = (props) => {
  return (
    <>
      <div>Dashboard</div>
      <p>username: {props.username}</p>
      <Link href={'/'}>
        <a> Home </a>
      </Link>
      <div>
        <Link href={'/test'}>
          <a> test </a>
        </Link>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { username: 'rick' }, // will be passed to the page component as props
  }
}

export default Dashboard
