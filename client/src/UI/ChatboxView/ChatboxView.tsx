import { useContext, useEffect, useMemo, useState } from 'react'
import { AccountContext } from "../../context/AccountProvider"
import "../../sass/chatbox.scss"
import { ChatboxField } from "./ChatboxField"
import { ChatboxHeader } from "./ChatboxHeader"
import { ChatboxInput } from "./ChatboxInput"
import { EmptyChatbox } from '../../components/EmptyChatbox/EmptyChatbox'
import { createConversation, getMessages } from '../../services/Api'
import { TypeAccountContext } from '../../context/AccountContext'

interface IncomingMessage {
    senderId: string;
    createdAt: number;
}

interface ConversationIdResponse {
    _id: string;
}


export const ChatboxView: React.FC = () => {
    const { person, account, socket }: TypeAccountContext = useContext(AccountContext)

    const [conversationId, setConversationId] = useState<ConversationIdResponse | null>();
    const [messages, setMessages] = useState<object[]>([])
    const [incomingMessage, setIncomingMessage] = useState<IncomingMessage | null>(null)

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
            const handleMessage = (data: IncomingMessage) => {
                setIncomingMessage({ ...data, createdAt: Date.now() });
            }
            socket.on("getMessage", handleMessage)
        }
    }, [socket])

    useEffect(() => {
        incomingMessage && (incomingMessage.senderId === person.sub) &&
            setMessages((prev: object[]) => [...prev, incomingMessage])
    }, [incomingMessage, person.sub])

    useEffect(() => {
        getConversationMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomingMessage, person.sub])

    return (

        <>
            <div className="chatbox">
                {Object.keys(person).length ? (
                    <>
                        <ChatboxHeader person={person} />
                        <ChatboxField messages={messages as never} />
                        <ChatboxInput conversationId={conversationId as unknown as string} senderId={''} receiverId={''} type={''} text={''} />
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
