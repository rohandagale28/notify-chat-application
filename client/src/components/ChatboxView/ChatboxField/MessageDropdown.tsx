import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropIcon, LogOutIcon, ProfileIcon, SettingIcon } from '@/components/svg/Index'
import { deleteMessage } from '@/services/appService'

export function MessageDropdown({ id }) {
  const handleDelete = async () => {
    await deleteMessage(id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 hover:bg-muted flex ml-auto box-border">
          <div className="h-2 w-2">
            <DropIcon />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-secondary'>
        <DropdownMenuItem className="cursor-pointer">
          <div className="h-4 w-4">
            <ProfileIcon />
          </div>
          <span>Edit</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <div className="h-4 w-4">
            <SettingIcon />
          </div>
          <span>Settings</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
          <div className="h-4 w-4">
            <LogOutIcon />
          </div>
          <span>Delete</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
