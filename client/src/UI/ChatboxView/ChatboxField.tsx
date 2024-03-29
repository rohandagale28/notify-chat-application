import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Message } from "./Message"
import { EmptyChatbox } from '../../components/EmptyChatbox/EmptyChatbox'
import { AccountContext } from '../../context/AccountProvider'
import { TypeAccountContext } from '../../context/AccountContext'

interface ChatboxFieldProps {
    messages: Array<{
        _id: string,
        senderId: string;
        text: string;
        createdAt: Date;
        conversationId: string;
        receiverId: string;
        type: string
    }>;
}

export const ChatboxField: React.FC<ChatboxFieldProps> = ({ messages }) => {

    const { person }: TypeAccountContext = useContext(AccountContext)


    useEffect(() => {
    }, [person.sub])

    const btn = document.querySelector('.chatbox-field')
    const el = document.querySelector('.message-container')
    btn?.addEventListener('focus', function () {
        el?.scrollIntoView(true)
    })

    return (
        <>
            <div className="chatbox-field" >
                {messages && messages.length > 0 ? (
                    messages.map((item) => (
                        <React.Fragment key={item?._id}>
                            <Message message={item} />
                        </React.Fragment>
                    ))
                ) : (
                    <EmptyChatbox text={"No Messages"} />
                )}
            </div>
        </>
    )
}
