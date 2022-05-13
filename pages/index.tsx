import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const Test: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="gradientbg">
        <nav className="flex h-28 w-full flex-row content-center justify-between bg-royal-blue opacity-100">
          <div className="order-first ml-20 flex">
            <Image src="/assets/Logo.svg" width={30} height={30}></Image>
            <p className="ml-8 self-center text-3xl text-white">MULTIPAY</p>
          </div>

          <div className="order-last flex">
            <button className="self-center rounded border border-solid border-white p-1 px-2 text-lg text-white hover:bg-slate-600">
              Buy MPAY
            </button>
            <button className="mr-20 ml-10 self-center rounded border border-white p-1 px-2 text-lg text-white hover:bg-slate-600">
              Connect Wallet
            </button>
          </div>
        </nav>
        <div id="earthbg">
          <div className="text-white">
            <Link href={'/dashboard'}>
              <a className=""> Dashboard </a>
            </Link>

            <div className="absolute top-40 flex-col justify-center text-white">
              <div className="order-1 flex basis-1/2 justify-center">
                <p className="self-center text-center text-4xl">
                  Reach new customers and manage multiple <br /> crypto payments
                  with ease
                </p>
              </div>
              <div className="order-2 mt-40 flex basis-1/2 content-center justify-center px-20">
                <div className="order-1 basis-1/3 flex-col px-5">
                  <p className="semi-bold mb-5 text-center text-xl">
                    Secure Operations
                  </p>
                  <p className="2">
                    We use the power of blockchain technology to achieve fast
                    and secure transactions
                  </p>
                </div>
                <div className="order-2 basis-1/3 flex-col px-5">
                  <p className="semi-bold mb-5 text-center text-xl">
                    Save Money
                  </p>
                  <p className="2">
                    Make multiple transactions at the price of one with our
                    cutting edge Multipay function
                  </p>
                </div>
                <div className="order-3 basis-1/3 flex-col px-5">
                  <p className="semi-bold mb-5 px-5 text-center text-xl">
                    Privacy
                  </p>
                  <p className="2">
                    Make multiple transactions at the price of one with our
                    cutting edge Multipay function
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="position: absolute bottom-0 left-0 w-full bg-black bg-opacity-30 text-white">
          <div className="mx-10 mt-5 mb-10 flex flex-row justify-between">
            <div className="order-1 flex">
              <ul>
                <li className="mb-3">Contact</li>
                <li className="text-sm opacity-50">
                  ricardo.developer@gmail.com
                </li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="order-2 flex">
              <ul>
                <li>Services</li>
              </ul>
            </div>
            <div className="order-3 flex">
              <ul>
                <li>More Info</li>
              </ul>
            </div>
            <div className="order-4 flex">
              <ul>
                <li>Source Code</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Test
