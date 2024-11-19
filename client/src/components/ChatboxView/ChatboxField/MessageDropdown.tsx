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
import { DeleteIcon, InfoIcon, SettingsIcon, TrashIcon } from 'lucide-react'

export function MessageDropdown({ id, senderId, accountId }) {
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
      <DropdownMenuContent className="bg-primary">
        {senderId != accountId ? (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <div className="h-4 w-4">
                <InfoIcon height={16} width={16} />
              </div>
              <span>Info</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
        <DropdownMenuItem className="cursor-pointer">
          <div className="h-4 w-4">
            <SettingsIcon  height={16} width={16}  />
          </div>
          <span>Settings</span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {senderId != accountId ? (
          <>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
              <div className="h-4 w-4">
                <TrashIcon height={16} width={16} />
              </div>
              <span>Delete</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
