import { useContext } from 'react'
import { AccountContext } from '@/context/AccountProvider'
import { FormatDate } from '@/utils/utils'
import { Messages } from './ChatboxField'
import { DropIcon } from '@/components/svg/Index'
import { DropdownMenuDemo } from '@/components/ConversationView/ConversationHeader/DropdownMenu'

interface MessageProps {
  message: Messages
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { account } = useContext(AccountContext)
  const isSender = account?._id == message?.senderId // Determine if the current user is the sender

  return (
    <div className={`flex ${!isSender ? 'justify-start' : 'justify-end'} `}>
      <div
        className={`group flex relative items-center w-auto pl-4 pt-[8px] pb-4 pr-14 rounded-xl bg-primary text-sm box-border`}
      >
        <div className="flex">{message?.text}</div>
        <div className="absolute right-2 bottom-[2px] text-[10px] text-muted-foreground">
          {FormatDate(message?.createdAt as Date)}
        </div>
        <div className="absolute top-1 right-1 invisible group-hover:visible box-border">
          <DropdownMenuDemo id={message?._id} />
        </div>
      </div>
    </div>
  )
}
