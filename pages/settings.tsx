import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/theme';
import { UserIcon } from '@heroicons/react/solid';

export default function Setting() {

    return (
        <div className="flex flex-col space-y-3 items-center mt-10 ">
            <div className="w-3/4 flex flex-row">
                <div className="1/4">
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300" >Yeung Man Lung Ken</p>
                    <p className="text-gray-400 dark:text-gray-500">mlkyeung 20510972</p>
                    <div className="avatar mt-10 ">
                        <div className="mb-8 rounded-full w-64 h-64 border border-gray-200 shadow">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUj9_abQcQsr4S5UZSl-3lLVf6omlGmEtUPA&usqp=CAU" />
                        </div>
                    </div>
                        <ul className="menu py-4 shadow-lg bg-gray-100 dark:bg-gray-600 rounded-box">
                            <li className="menu-title">
                              <p className="text-gray-400 dark:text-gray-300 px-4 font-bold text-sm mb-3">Account Setting</p>
                            </li>
                            <li className="hover-bordered bg-gray-200 dark:bg-gray-500">
                                <a >
                                   <p className="text-gray-500 dark:text-gray-300">Profile</p>
                                </a>
                            </li>
                        </ul>
                </div>
                <div className="w-3/4 flex flex-col px-10 mt-10">
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-bold">Public Profile </p>
                    <div className="divider"></div> 
                    <p className="text-gray-600 dark:text-gray-300 font-bold">Name</p>
                    <input className="w-80 border border-gray-200 text-gray-500 bg-gray-200 dark:border-gray-800 dark:text-gray-500  dark:bg-gray-700 focus:border mt-2 focus:outline-none p-1 px-3 rounded-md" readOnly value="mlkyeung"></input>
                    <p className="text-gray-600 dark:text-gray-300 font-bold mt-5">Public Email </p>
                    <input className="w-80 border border-gray-200 text-gray-500 bg-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-500 focus:border focus:outline-none p-1 px-3 rounded-md mt-2" readOnly value="mlkyeung@connect.ust.hk"></input>
                    <p className="text-gray-600 dark:text-gray-300 font-bold mt-5 mb-2">Bio</p>
                    <textarea className="w-full h-40 border border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-300  bg-white dark:bg-gray-900 focus:border focus:outline-none p-1 px-3 rounded-md min-h-16 "  placeholder="some description"></textarea>
                    <button className="rounded-md bg-green-500 text-white w-36 py-2 mt-10">Save Change</button>
                </div>
            </div>
        </div>
    )

}