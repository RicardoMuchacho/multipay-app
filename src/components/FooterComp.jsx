import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import CustomLink from './CustomLink'

export const FooterComp = () => {
  return (
    <footer className="position: relative bottom-0 left-0 h-[150px] w-full bg-[#2B2B2B] text-white">
      <div className="flex flex-row justify-start gap-10 px-10 py-5">
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
            <li className="text-sm text-[#7B7E84]">
              <CustomLink href={'/dashboard'}>Dashboard</CustomLink>
            </li>
            <li className="text-sm text-[#7B7E84]">
              <CustomLink href={'/multipay'}>Multipay</CustomLink>
            </li>
            <li className="text-sm text-[#7B7E84]">
              <CustomLink href={'/activity'}>Activity</CustomLink>
            </li>
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
                  window.open('https://github.com/RicardoMuchacho/multipay-app')
                }
                className="h-5 w-5 hover:cursor-pointer"
                color="#7B7E84"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default FooterComp
