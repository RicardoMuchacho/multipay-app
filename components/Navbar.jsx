import React from 'react'
import Image from 'next/image'
import CustomLink from '../components/CustomLink'
import MetamaskConnect from '../components/MetamaskConnect'
import { useState } from 'react'

export const Navbar = (props) => {
  const [active, setActive] = useState(true)

  return (
    <nav className="flex h-24 w-full flex-row content-center justify-between bg-royal-blue opacity-100">
      <div className="flex justify-start">
        <div className="order-first ml-20 flex">
          <Image src="/assets/logo.svg" width={25} height={25}></Image>
          <CustomLink
            href={'/dashboard'}
            className="link-underline ml-8 self-center text-2xl text-white"
          >
            DASHBOARD
          </CustomLink>
        </div>
        <div className="ml-15 flex">
          <CustomLink
            href={'/multipay'}
            className="link-underline ml-8 self-center text-2xl text-white"
          >
            MULTIPAY
          </CustomLink>
        </div>
        <div className="ml-15 flex">
          <CustomLink
            href={'/activity'}
            className="link-underline ml-8 self-center text-2xl text-white "
          >
            ACTIVITY
          </CustomLink>
        </div>
      </div>
      <div className="order-last flex">
        <button className="self-center rounded border border-solid border-white p-1 px-2 text-white hover:bg-slate-600">
          Buy MPAY
        </button>
        <MetamaskConnect></MetamaskConnect>
      </div>
    </nav>
  )
}

export default Navbar
