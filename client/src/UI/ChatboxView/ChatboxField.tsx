import React, { useContext, useRef } from 'react'
import { useEffect } from 'react'
import { Message } from "./Message"
import { EmptyChatbox } from '../../components/EmptyChatbox/EmptyChatbox'
import { AccountContext } from '../../context/AccountProvider'

export const ChatboxField = ({ messages }) => {

    const containerRef = useRef(0)
    const { person } = useContext(AccountContext)

    // console.log(messages)

    useEffect(() => {
        // containerRef.current?.scrollIntoView(true)
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
                        <React.Fragment key={item._id}>
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
