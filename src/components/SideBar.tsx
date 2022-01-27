import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, UserGroupIcon, CubeTransparentIcon, CogIcon, AnnotationIcon, CloudIcon, IdentificationIcon } from '@heroicons/react/outline'
import { useRouter } from "next/router";
import { useCnails } from '../contexts/cnails';
const SideBar = () => {
    var pages = [
        { name: "Dashboard", link: "/", icon: HomeIcon },
        // {name:"Teams",link:"/Teams", icon:UserGroupIcon},
        // {name:"Workspace",link:"/Workspace", icon:CubeTransparentIcon},
        // {name:"Setting",link:"/settings", icon:CogIcon},
        { name: "Messages", link: "/messages", icon: AnnotationIcon },
        { name: "Cloud", link: "/cloud", icon: CloudIcon },
        { name: "Admin", link: "/admin", icon: IdentificationIcon }
    ]
    const router = useRouter();
    const { isAdmin } = useCnails();
    if (!isAdmin)
        pages = pages.filter(page => (page.name !== "Admin"))
    return (
        <div className="w-[240px] min-h-screen bg-gray-50 dark:bg-gray-700 dark:border-gray-800 flex flex-col border-r px-5 py-5 ">
            <div className="pb-10">
                <Link href="/">
                    <Image src="/logo.svg" width="100" height="50" />
                </Link>
            </div>
            <div className="flex flex-col items-left space-y-6">
                {pages.map((page) => {
                    const isActive = router.pathname === page.link;
                    return (
                        <Link key={page.link} href={page.link}>
                            <a id={page.name} className={`flex flex-row items-center hover:text-gray-900 ${isActive ? "text-gray-900 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                                <page.icon className="w-6 h-6" />
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

export default SideBar