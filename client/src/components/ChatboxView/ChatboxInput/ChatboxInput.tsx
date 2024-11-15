import { useState, useContext } from 'react'
import { AccountContext } from '@/context/AccountProvider'
import axios from 'axios'
import { DocumentIcon, SendIcon } from '@/components/svg/Index'
import { addMessage } from '@/services/messageService'

interface Message {
  senderId: string
  receiverId: string
  conversationId: string | null
  type: string
  text: string
}

interface ChatboxInputProps {
  conversationId: string | null
}

export const ChatboxInput: React.FC<ChatboxInputProps> = ({ conversationId }) => {
  const { account, person, setIncomingMessage, socket } = useContext(AccountContext)
  const [text, setText] = useState('')

  const sendText = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()

    if (text.trim() === '') {
      console.log('Message cannot be empty')
      return
    }

    const message: Message = {
      senderId: account._id,
      receiverId: person._id,
      conversationId,
      type: 'text',
      text: text.trim(),
    }

    if (!navigator.onLine) {
      window.alert('You are offline')
      return
    }

    try {
      socket.emit('sendMessage', message)

      if (conversationId) {
        await addMessage(message)
        setIncomingMessage({ ...message, createdAt: Date.now() })
        setText('')
      }
    } catch (err) {
      console.log('Error sending message:', err)
    }
  }

  console.log('***** This is ChatboxInput *****')
  return (
    <div className="flex w-full h-[4.6rem] items-center justify-between rounded-xl  px-16 gap-16">
      <div className="">
        <div className="w-5 ">
          <DocumentIcon />
        </div>
      </div>
      <div className="flex-grow items-start self-center">
        <form onSubmit={sendText}>
          <input
            autoFocus
            type="text"
            placeholder="Write a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-8 w-full outline-none border-none bg-transparent  text-base"
          />
        </form>
      </div>
      <button
        onClick={sendText}
        disabled={text.trim() === ''}
        className="cursor-pointer h-auto w-auto"
      >
        <div className="w-5">
          <SendIcon />
        </div>
      </button>
    </div>
  )
}
