export default function table(){
    return(
        <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-8">
                <table className="border-collapse table-auto w-full text-sm">
                <thead>
                    <tr>
                    <th className="border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">Song</th>
                    <th className="border-b dark:border-gray-600 font-medium p-4 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">Artist</th>
                    <th className="border-b dark:border-gray-600 font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">Year</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    <tr>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 dark:text-gray-400">Malcolm Lockyer</td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pr-8 text-gray-500 dark:text-gray-400">1961</td>
                    </tr>
                    <tr>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">Witchy Woman</td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 dark:text-gray-400">The Eagles</td>
                    <td className="border-b border-gray-100 dark:border-gray-700 p-4 pr-8 text-gray-500 dark:text-gray-400">1972</td>
                    </tr>
                    <tr>
                    <td className="border-b border-gray-200 dark:border-gray-600 p-4 pl-8 text-gray-500 dark:text-gray-400">Shining Star</td>
                    <td className="border-b border-gray-200 dark:border-gray-600 p-4 text-gray-500 dark:text-gray-400">Earth, Wind, and Fire</td>
                    <td className="border-b border-gray-200 dark:border-gray-600 p-4 pr-8 text-gray-500 dark:text-gray-400">1975</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
}