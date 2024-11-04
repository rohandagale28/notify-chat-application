import { useCallback, useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { EmptyChatbox } from './EmptyChatbox'
import { ChatboxHeader } from './ChatboxHeader/ChatboxHeader'
import { createConversation } from '@/services/userService'
import { ChatboxInput } from './ChatboxInput/ChatboxInput'
import { ChatboxField } from './ChatboxField/ChatboxField'

interface Message {
  _id: string
  senderId: string
  text: string
  createdAt: Date | number
  conversationId: string
  receiverId: string
  type: string
}

export const ChatboxView: React.FC = () => {
  const { person, account, socket, setIncomingMessage, incomingMessage } =
    useContext(AccountContext)

  // Use state
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  // Function to fetch data from database
  const getConversationMessages = useCallback(async () => {
    if (!account || !person._id) return

    try {
      const { data } = await createConversation({ senderId: account._id, receiverId: person._id })
      setConversationId(data._id)
      setMessages(data.messages)
    } catch (err) {
      console.warn('Get conversation messages error : ', err)
    }
  }, [account._id, person._id])

  // Handle incoming socket message
  useEffect(() => {
    if (!socket) return

    const handleMessage = (data: Message) => {
      setIncomingMessage({ ...data, createdAt: Date.now() })
    }

    socket.on('getMessage', handleMessage)
  }, [socket])

  // Update messages for new incoming message
  useEffect(() => {
    if (
      (incomingMessage && incomingMessage?.senderId === person._id) ||
      incomingMessage?.receiverId === person._id
    ) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage])
      console.warn('this is called')
    }
  }, [incomingMessage])

  // Fetch message when person changes
  useEffect(() => {
    if (person._id) {
      getConversationMessages()
    }
  }, [person._id])

  useEffect(() => {}, [])
  console.log(messages, 'thse are the messages')
  return (
    <div className="h-full w-full box-border p-5 bg-secondary flex flex-col gap-3">
      {Object.keys(person).length ? (
        <>
          <ChatboxHeader person={person} />
          <ChatboxField messages={messages} />
          <ChatboxInput conversationId={conversationId} />
        </>
      ) : (
        <EmptyChatbox text="Select a chat to start conversation" />
      )}
    </div>
  )
}
