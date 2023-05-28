import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Transition } from '@headlessui/react';
import { HiOutlineX, HiMenuAlt3 } from 'react-icons/hi'
import logo from "../assets/logo.png";




const Navbar = () => {
    const closeWindow = () => {
        window.close();
        // const win = window.require('electron').remote.getCurrentWindow();
        // win.close();
        // const remote = (window.require) ? window.require("electron").remote : null;
        // const WIN = remote.getCurrentWindow();
        // WIN.close();
    };
    const [isOpen, setIsOpen] = useState(false);
    const [boxDataOpen, setBoxDataOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(() => {
        // Retrieve the color from local storage, or use a default value
        return localStorage.getItem('selectedColor') || '#2C2C2A';
      });

    
    return (
        // style={{background:`${selectedColor}`}}
        <nav  className="bg-white fixed shadow-md shadow-white-600 w-screen text-black  z-50 py-3">

            <div className="flex items-center justify-between  px-10">
                <div className="flex space-x-10 align-center">
                    <Link to="/" className="flex gap-2 text-2xl font-Roboto text-black font-semibold text-lg  items-center sm:flex ">
                        <img className='w-16 mr-2 ' alt='logo' src={logo} />
                        <span>Smart Rate</span>
                    </Link>
                    <ul className="hidden  items-center md:flex text-lg tracking-widest ">
                        <li className='hover:invert-0.4'>
                            <Link className='mx-1 px-2 font-Roboto text-black font-semibold text-lg' to='/zip_converter'>ZipConverter</Link>
                        </li>
                        <li className='hover:invert-0.4'>
                            <Link className='mx-1 px-2 font-Roboto text-black font-semibold text-lg' to='/photo_sizing'>PhotoSizing</Link>
                        </li>
                        <li className='hover:invert-0.4'>
                            <Link className='mx-1 px-2 font-Roboto text-black font-semibold text-lg' to='/pdf_converter'>PdfConverter</Link>
                        </li>


                    </ul>



                </div>

                <div className=" flex items-center" onClick={() => setIsOpen(!isOpen)}>
                    <button className="outline-none p-2  md:hidden mobile-menu-button bg-slate-500/30 rounded-full border-1 border-gray-500 select-none focus:bg-slate-800">
                        {isOpen ? <HiOutlineX className='text-2xl text-gray-200' /> :
                            <HiMenuAlt3 className='text-2xl text-gray-200' />
                        }
                    </button>
                    {/* onClick={()=>closeWindow()} */}
                    
                    <button type="button" onClick={() => closeWindow()} className=" rounded-md p-2 ml-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>



            </div>
            {/* Menu  Mobile*/}
            <Transition show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {
                    (ref) => (
                        <div className="md:hidden " id="mobile-menu">
                            <div
                                ref={ref}
                                className="dark:bg-transparent dark:text-black font-semibold mx-4 pt-4 pb-4 space-y-1"
                            >
                                <Link
                                    to="/"
                                    className="cursor-pointer hover:bg-blue-900/30 text-black dark:text-gray-200 hover:text-black font-semibold block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    ZipConverter
                                </Link>

                                <Link
                                    to="/photo_sizing"
                                    className="cursor-pointer hover:bg-blue-900/30 text-black dark:text-gray-200 hover:text-black font-semibold block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    PhotoSizing
                                </Link>
                                <Link
                                    to="/pdf_converter"
                                    className="cursor-pointer hover:bg-blue-900/30 text-black dark:text-gray-200 hover:text-black font-semibold block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    PdfConverter
                                </Link>
                                
                            </div>
                        </div>
                    )
                }
            </Transition>
        </nav >
    )
}

export default Navbar