import { useState } from 'react'
import { Switch } from '@headlessui/react'

type Props = {
    enabled : boolean , 
    onChange : () => void, 
}

export default function Toggle({enabled , onChange} : Props ) {
  

  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full  transition ease-in-out duration-200`}
      />
    </Switch>
  )
}