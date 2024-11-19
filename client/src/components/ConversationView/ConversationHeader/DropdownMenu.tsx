import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, InfoIcon } from 'lucide-react'
import { logoutUser } from '@/services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'

export function DropdownMenuDemo({ id }) {
  const navigate = useNavigate()

  const logOut = async () => {
    const res = await logoutUser()
    if (res.status == 200) {
      navigate('/login')
      toast({
        title: 'You have been logged out',
        description: 'Please sign up.',
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 hover:bg-secondary flex ml-auto box-border">
          <div className="h-8 w-8">
            <img src={id} className="h-8 w-8 object-cover rounded-full" alt="User" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-secondary border-primary absolute -left-5">
        <DropdownMenuItem className="cursor-pointer ">
          <div className="h-auto w-auto">
            <User height={16} width={16} />
          </div>
          <span>Profile</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
          <div className="h-auto w-auto">
            <Settings height={16} width={16} />
          </div>
          <span>Settings</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <div className="h-auto w-auto">
            <InfoIcon height={16} width={16} />
          </div>
          <span>About</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut} className="cursor-pointer">
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
