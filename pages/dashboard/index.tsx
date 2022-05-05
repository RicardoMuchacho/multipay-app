import type { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  username: string
}

//const Dashboard: NextPage<{ username: string }> = ({ username }) => {

const Dashboard: NextPage<Props> = ({ username }) => {
  return (
    <>
      <div>Dashboard</div>
      <p>username: {username}</p>
      <Link href={'/'}>
        <a> Home </a>
      </Link>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { username: 'rick' }, // will be passed to the page component as props
  }
}

export default Dashboard
