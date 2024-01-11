import { useContext, useEffect, useState } from 'react'
import { AccountContext } from "../../context/AccountProvider"
import "../../sass/chatbox.scss"
import { ChatboxField } from "./ChatboxField"
import { ChatboxHeader } from "./ChatboxHeader"
import { ChatboxInput } from "./ChatboxInput"
import { EmptyChatbox } from '../../components/EmptyChatbox/EmptyChatbox'
import { createConversation, getMessages } from '../../services/Api'

export const ChatboxView = () => {
    const { person, account, socket } = useContext(AccountContext)

    const [conversationId, setConversationId] = useState<object | undefined>({ undefined });
    const [messages, setMessages] = useState<object[]>([])
    const [incomingMessage, setIncomingMessage] = useState<object | null>(null)

    const getConversationMessages = async () => {
        try {
            const conversationIdResponse = await createConversation({ senderId: account.sub, receiverId: person.sub })
            setConversationId(conversationIdResponse)

            const res = await getMessages(conversationIdResponse._id)
            setMessages(res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (socket) {
            const handleMessage = (data: object) => {
                setIncomingMessage({ ...data, createdAt: Date.now() });
            }
            socket.on("getMessage", handleMessage)
        }
    }, [socket])

    useEffect(() => {
        incomingMessage && (incomingMessage.senderId === person.sub) &&
            setMessages((prev: object) => [...prev, incomingMessage])
    }, [incomingMessage, person.sub])

    useEffect(() => {
        getConversationMessages()
    }, [incomingMessage, person.sub])

    return (
        <>
            <div className="chatbox">
                {Object.keys(person).length ? (
                    <>
                        <ChatboxHeader person={person} />
                        <ChatboxField messages={messages} />
                        <ChatboxInput conversationId={conversationId} setMessages={setMessages} />
                    </>
                ) : (
                    <>
                        <EmptyChatbox text={"select a chat to start conversation"} />
                    </>
                )}
            </div>
        </>
    )
}
