import { useContext } from "react"
import { AccountContext } from "@/context/AccountProvider"
import { FormatDate } from "@/utils/utils"
import { Messages } from "./ChatboxField"

interface MessageProps {
  message: Messages
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { account } = useContext(AccountContext)

  const isSender = account?._id == message?.senderId // Determine if the current user is the sender

  return (
    <div className={`flex   ${!isSender ? "justify-start" : "justify-end"}`}>
      <div className={`flex relative items-center w-auto p-4 rounded-xl bg-primary-foreground `}>
        <div className="flex">{message?.text}</div>
        <div className="absolute right-2 bottom-1 text-[12px] text-muted-foreground">
          {FormatDate(message?.createdAt as Date)}
        </div>
      </div>
    </div>
  )
}
