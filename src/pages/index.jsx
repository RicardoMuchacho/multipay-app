import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import CustomLink from '../components/CustomLink'
import MetamaskConnect from '../components/MetamaskConnect'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

const HomePage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="gradientbg">
        <nav className="flex h-24 w-full flex-row content-center justify-between bg-royal-blue opacity-100">
          <div className="ml-20 flex ">
            <Image
              alt="landing page multipay logo"
              src="/assets/logo.svg"
              width={25}
              height={25}
            ></Image>
            <p className="ml-8 self-center text-2xl text-white">MULTIPAY</p>
          </div>

          <div className="order-last flex">
            <MetamaskConnect isLandingPage={true}></MetamaskConnect>
          </div>
        </nav>
        <div id="earthbg">
          <div className="absolute top-20 flex-col justify-center text-white">
            <div className="order-1 flex basis-1/2 animate-fadeIn justify-center">
              <p className="self-center text-center  text-4xl ">
                Reach new customers and manage multiple <br /> crypto payments
                with ease
              </p>
            </div>
            <div className="order-2 mt-20 flex basis-1/2 content-center justify-center px-20">
              <div className="order-1 basis-1/3 animate-[fadeIn_3s_ease-in-out] flex-col px-5">
                <span className="mb-5 flex -translate-x-4 justify-center">
                  <img src="/assets/secureCheck.svg" alt="dollars image" />
                  <p className="semi-bold ml-4 text-center text-xl">
                    Secure Operations
                  </p>
                </span>
                <p className="2">
                  We use the power of blockchain technology to achieve fast and
                  secure transactions
                </p>
              </div>

              <div className="order-2 basis-1/3 animate-[fadeIn2_3.5s_ease-in-out] flex-col px-5">
                <span className="mb-3 flex -translate-x-4 justify-center">
                  <img
                    className="object-contain"
                    src="/assets/dollars.png"
                    alt="dollars image"
                  />
                  <p className="semi-bold ml-3 text-center text-xl">
                    Save Money
                  </p>
                </span>
                <p className="2">
                  Make multiple transactions at the price of one with our
                  cutting edge Multipay function
                </p>
              </div>
              <div className="order-3 basis-1/3 animate-[fadeIn3_4s_ease-in-out] flex-col px-5">
                <span className="mb-5 flex -translate-x-4 justify-center">
                  <img
                    className=""
                    src="/assets/lock.svg"
                    alt="dollars image"
                  />
                  <p className="semi-bold inline-block px-5 text-center text-xl">
                    Privacy
                  </p>
                </span>
                <p className="2">
                  No personal data, long registrations, login or kyc
                  verification, just connect your wallet
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="position: absolute bottom-0 left-0 w-full bg-black bg-opacity-30 text-white">
          <div className="mx-10 mt-5 mb-10 flex flex-row justify-start gap-10">
            <div className="order-1 flex">
              <ul>
                <li className="mb-1">Contact</li>
                <li className="text-sm text-[#7B7E84]">
                  <a href="mailto: ricardojrmuchacho@gmail.com">
                    ricardomuchacho.developer@gmail.com
                  </a>
                </li>
                <li className="mt-1">
                  <AiFillLinkedin
                    className="h-5 w-5 hover:cursor-pointer"
                    color="#7B7E84"
                    onClick={() =>
                      window.open(
                        'https://www.linkedin.com/in/ricardo-muchacho-8400171b5/'
                      )
                    }
                  />
                </li>
              </ul>
            </div>
            <div className="order-2 flex">
              <ul>
                <li className="mb-1">Services</li>
                <li className="text-sm text-[#7B7E84]">Dashboard</li>
                <li className="text-sm text-[#7B7E84]">Multipay</li>
                <li className="text-sm text-[#7B7E84]">Activity</li>
              </ul>
            </div>
            <div className="order-3 flex">
              <ul>
                <li className="mb-1">More Info</li>
                <li className="text-sm text-[#7B7E84]">Terms and Conditions</li>
                <li className="text-sm text-[#7B7E84]">Privacy Policy</li>
              </ul>
            </div>
            <div className="order-4 flex">
              <ul>
                <li className="mb-1">Source Code</li>
                <li>
                  <AiFillGithub
                    onClick={() =>
                      window.open(
                        'https://github.com/RicardoMuchacho/multipay-app'
                      )
                    }
                    className="h-5 w-5 hover:cursor-pointer"
                    color="#7B7E84"
                  />
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default HomePage
