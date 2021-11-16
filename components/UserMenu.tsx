import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'

interface UserMenuProps{
    sub: string
    name: string
    email: string
}

export default function UserMenu({sub,name,email}: UserMenuProps) {
  return (
    <div className="w-14 text-right top-16">
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="justify-center text-sm font-medium rounded-md hover:scale-110 transition transition-all ease-in-out duration-300 dark:text-gray-200">
            {sub}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-4">
                <div className="font-semibold text-gray-700">{name}</div>
                <div className="text-xs text-gray-500 mb-4">{email}</div>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-200 font-semibold' : ''
                    } text-[#775FBD] group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                        active ? 'bg-gray-200 font-semibold' : ''
                    } text-[#775FBD] group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Setting
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className={`${
                    active ? 'bg-gray-200 font-semibold' : ''
                } text-[#775FBD] group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                  <Link href="/logout">
                    <a className='w-full'>
                      Sign Out
                    </a>
                  </Link>
                </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}