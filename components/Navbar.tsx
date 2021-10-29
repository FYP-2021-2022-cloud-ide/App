import Image from 'next/image'
import Link from 'next/link'
import {HomeIcon, UserGroupIcon, CubeTransparentIcon, CogIcon} from '@heroicons/react/outline'
import { useRouter } from "next/router";

const Navbar = () => {
    var pages= [
      {name:"Dashboard", link:"/", icon:HomeIcon},
      {name:"Teams",link:"/Teams", icon:UserGroupIcon},
      {name:"Workspace",link:"/Workspace", icon:CubeTransparentIcon},
      {name:"Setting",link:"/Setting", icon:CogIcon}
    ]
    const router = useRouter();
    const baseClass='flex flex-row items-center text-gray-500 hover:text-gray-900'
    const activeClass='text-gray-900'
    return (
        <div className="w-[240px] min-h-screen bg-gray-50 flex flex-col border-r px-5 py-5">
          <div className="pb-10">
            <Link href="/">
              <Image  src="/logo.svg"  width="100" height="50" /> 
            </Link>
          </div>
          <div className="flex flex-col items-left space-y-6">
            {pages.map((page)=>{
                const isActive = router.pathname === page.link;
                return (
                <Link key={page.link} href={page.link}>
                  <a className={`${baseClass} ${isActive?activeClass:""}`}>
                    {/* <Image className="transform scale-100 hover:scale-105 hover:shadow-xl" 
                      src={page.image} width="50" height="50" /> */}
                      <page.icon className="w-6 h-6"/>
                    <div className="text-xs uppercase tracking-widest font-medium ml-2">{page.name}</div>
                  </a>
                 
                </Link>
                )
              }
              )
            }
          </div> 
        </div>
    )
}

export default Navbar