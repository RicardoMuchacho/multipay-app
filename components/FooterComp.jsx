import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

export const FooterComp = () => {
  return (
    <footer className="position: relative bottom-0 left-0 h-[150px] w-full bg-[#2B2B2B] text-white">
      <div className="flex flex-row justify-start gap-10 px-10 py-5">
        <div className="order-1 flex">
          <ul>
            <li className="mb-1">Contact</li>
            <li className="text-sm text-[#7B7E84]">
              ricardomuchacho.developer@gmail.com
            </li>
            <li className="mt-1">
              <AiFillLinkedin
                className="h-5 w-5"
                color="#7B7E84"
                onClick={() => console.log('H')}
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
              <AiFillGithub className="h-5 w-5" color="#7B7E84" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default FooterComp
