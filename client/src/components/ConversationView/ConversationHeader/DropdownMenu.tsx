import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropIcon } from '@/components/svg/Index'
import { TrashIcon } from '@radix-ui/react-icons'
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
        <button className="rounded-xl p-1 hover:bg-muted flex ml-auto box-border">
          <div className="h-3 w-3">
            <DropIcon />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleDelete}>
          <TrashIcon />
          <span>Delete</span>
          <DropdownMenuShortcut>Del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
