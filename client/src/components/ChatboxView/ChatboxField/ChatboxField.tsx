import { AccountContext } from '@/context/AccountProvider'
import React, { useContext, useRef, useEffect } from 'react'
import { Message } from './Message'

export interface Messages {
  _id: string
  senderId: string
  text: string
  createdAt: Date | number
  conversationId: string
  receiverId: string
  type: string
}

interface ChatboxFieldProps {
  messages: Messages[]
}

// Define ChatboxField as a React functional component
const ChatboxField: React.FC<ChatboxFieldProps> = ({ messages }) => {
  const { person } = useContext(AccountContext)
  const chatboxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
    }
  }, [person?._id, messages])

  console.log("***** This is ChatboxField *****")
  return (
    <div
      className="flex gap-4 h-full w-full p-8 box-border flex-col  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300"
      ref={chatboxRef}
    >
      {messages?.length > 0 ? (
        messages?.map((item: Messages) => (
          <React.Fragment key={item?._id}>
            <Message message={item} />
          </React.Fragment>
        ))
      ) : (
        <div className="flex justify-center items-center h-full w-full box-border">
          <div className="px-4 py-2 rounded-full text-sm bg-primary">No Messages</div>
        </div>
      )}
    </div>
  )
}

// Export ChatboxField as the default export
export default ChatboxField

