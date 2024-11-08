import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, InfoIcon } from 'lucide-react'
import axios from 'axios'

export function DropdownMenuDemo({ id }) {
  const handleDelete = async () => {
    await axios
      .get(`http://localhost:5000/dashboard/message/delete/${id}`, { withCredentials: true })
      .then((res) => console.log(res))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 hover:bg-primary flex ml-auto box-border">
          <div className="h-8 w-8">
            <img src={id} className="h-8 w-8 object-cover rounded-full" alt="User" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-black border-primary absolute -left-5">
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer ">
          <div className="h-auto w-auto">
            <User height={16} width={16} />
          </div>
          <span>Profile</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer hover:bg-muted">
          <div className="h-auto w-auto">
            <Settings height={16} width={16} />
          </div>
          <span>Settings</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
          <div className="h-auto w-auto">
            <InfoIcon height={16} width={16} />
          </div>
          <span>About</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
          <div className="h-auto w-auto">
            <LogOut height={16} width={16} />
          </div>
          <span>Logout</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
