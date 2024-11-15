import { lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { EmptyChatbox } from './EmptyChatbox'
import { ChatboxHeader } from './ChatboxHeader/ChatboxHeader'
import { ChatboxInput } from './ChatboxInput/ChatboxInput'
import { createConversation } from '@/services/appService'

const ChatboxField = lazy(() => import('./ChatboxField/ChatboxField'))

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

  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  /*-------------------- Fetch Data from Database ------------*/
  const getConversationMessages = useCallback(async () => {
    if (!account || !person._id) return

    try {
      const { data } = await createConversation({ senderId: account?._id, receiverId: person?._id })
      setConversationId(data?._id)
      setMessages(data?.messages)
      console.log(data, 'conversation Data')
    } catch (err) {
      console.log('Get conversation messages error : ', err)
    }
  }, [account?._id, person?._id])

  /*------------------ Handle Upcoming Message ---------------*/
  useEffect(() => {
    if (!socket) return

    const handleMessage = (data: Message) => {
      setIncomingMessage({ ...data, createdAt: Date.now() })
    }

    socket.on('getMessage', handleMessage)
  }, [socket])

  /*-------------------- New Upcoming Message ----------------*/
  useEffect(() => {
    if (
      (incomingMessage && incomingMessage?.senderId === person._id) ||
      incomingMessage?.receiverId === person._id
    ) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage])
    }
  }, [incomingMessage])

  /*------------------- Fetch Message When Person Changes ---- */
  useEffect(() => {
    if (person._id) {
      getConversationMessages()
    }
  }, [person?._id])

  useEffect(() => {}, [])

  return (
    <div className="h-full w-full box-border p-5 bg-primary flex flex-col gap-3">
      {Object.keys(person).length ? (
        <>
          <ChatboxHeader person={person} />
          <Suspense fallback={<>Loading</>}>
            <ChatboxField messages={messages} />
          </Suspense>
          <ChatboxInput conversationId={conversationId} />
        </>
      ) : (
        <EmptyChatbox text="Select a chat to start conversation" />
      )}
    </div>
  )
}
