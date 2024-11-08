import { useEffect, useState } from 'react'
import { VideoCameraIcon } from '@/components/svg/Index'
import { useAccount } from '@/context/AccountProvider'

interface Person {
  image: string
  _id?: string
  username?: string
  picture?: string
}

export const ChatboxHeader = ({ person }: { person: Person }) => {
  const [status, setStatus] = useState(false)

  const { socket } = useAccount()

  console.warn(person)
  useEffect(() => {
    if (socket) {
      socket.emit('getOnlineUser', person?._id)
    }
  }, [socket, person._id])

  return (
    <div className="w-full h-[4.6rem] flex text-secondary-foreground justify-between items-center rounded-xl">
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
      <div className="flex gap-8 pr-8">
        <div className="h-6 w-6">
          <VideoCameraIcon />
        </div>
      </div>
    </div>
  )
}
