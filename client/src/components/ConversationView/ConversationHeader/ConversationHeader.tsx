import { useContext, useCallback } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { DropdownMenuDemo } from './DropdownMenu'
import { SquarePenIcon } from 'lucide-react'

interface Account {
  _id: string
  image?: string
  username: string
}

interface ConversationHeaderProps {
  account: Account
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ account }) => {
  const { setSearch } = useContext(AccountContext)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [setSearch]
  )

  console.log('*** converstaion header re-rendered ***')
  return (
    <div className="flex flex-col gap-6 px-0">
      <div className="flex flex-row items-center w-full">
        <div className="cursor-pointer ">
          <DropdownMenuDemo id={account?.image} />
        </div>
        <div className="more cursor-pointer text-sm pl-4 capitalize">{account?.username}</div>
        <div className="h-auto box-border m-auto ">
          <SquarePenIcon height={16} width={16} />
        </div>
      </div>
      <div className="w-full h-auto box-border">
        <input
          type="text"
          placeholder="Search friends"
          onChange={handleSearchChange}
          className="border-none outline-none text-xs h-9 w-full rounded-lg bg-secondary text-textColorLightPrimary pl-4 box-border"
        />
      </div>
    </div>
  )
}
