import React from 'react'
import Image from 'next/image'
import CustomLink from '../components/CustomLink'
import MetamaskConnect from '../components/MetamaskConnect'

export const Navbar = () => {
  return (
    <nav className="flex h-24 w-full flex-row content-center justify-between bg-royal-blue opacity-100">
      <div className="order-first ml-20 flex">
        <Image src="/assets/logo.svg" width={25} height={25}></Image>
        <p className="ml-8 self-center text-2xl text-white">MULTIPAY</p>
      </div>

      <div className="order-last flex">
        <CustomLink
          className="mr-10 self-center rounded border border-solid border-white p-1 px-2 text-white hover:bg-slate-600"
          href={'/dashboard'}
        >
          Dashboard (test)
        </CustomLink>
        <button className="self-center rounded border border-solid border-white p-1 px-2 text-white hover:bg-slate-600">
          Buy MPAY
        </button>
        <MetamaskConnect></MetamaskConnect>
      </div>
    </nav>
  )
}

export default Navbar
