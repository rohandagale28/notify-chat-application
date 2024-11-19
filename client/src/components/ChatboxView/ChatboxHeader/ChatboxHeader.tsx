import { memo, useEffect, useState } from 'react'
import { CallIcon, VideoCameraIcon } from '@/components/svg/Index'
import { useAccount } from '@/context/AccountProvider'

interface Person {
  image: string
  _id?: string
  username?: string
  picture?: string
}

const ChatboxHeader = ({ person }: { person: Person }) => {
  const status = true

  return (
    <div className="w-full h-[4.6rem] px-5 pb-5 flex text-secondary-foreground justify-between items-center border-b-2">
      <div className="pl-4">
        <img
          src={person?.image}
          alt="Profile"
          className="h-10 w-10 object-cover rounded-full cursor-pointer"
        />
      </div>
      <div className=" text-sm font-medium flex flex-row items-center justify-center gap-2">
        {person?.username}
        <div className="flex items-center gap-2 text-xs">
          <div
            className={`h-1.5 w-1.5 ${status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
          ></div>
          <div className="tracking-wider">
            {' '}
            {status === true ? <span>Online</span> : <span>Offline</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 pr-8">
        <div className="bg-secondary h-8 w-12 items-center justify-center flex rounded-s-lg hover:bg-muted cursor-pointer">
          <div className="h-4 w-4 ">
            <CallIcon />
          </div>
        </div>
        <div className="bg-secondary h-8 w-12 items-center justify-center flex rounded-e-lg hover:bg-muted cursor-pointer">
          <div className="h-4 w-4">
            <VideoCameraIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChatboxHeader)
