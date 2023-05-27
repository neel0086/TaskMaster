import React from 'react'
import StartLogo from "../assets/logo.png"

function Logo() {
  return (
    <div className='h-screen w-screen text-Roboto overflow-x-hidden  pb-40 mt-5 bg-gradient-to-tr from-neutral-700 via-neutral-700 to-neutral-700'>
      <section className="flex flex-col justify-center items-center w-screen mx-4 p-6 mx-auto mt-20">
        <div>
          <img src={StartLogo} className='mt-48 mb-2' />
          <p>Hello</p>
        </div>
      </section>
    </div>
  )
}

export default Logo
