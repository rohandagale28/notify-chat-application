import React, { useContext, useEffect } from 'react'
import "../sass/conversation.scss"
import { ConversationView } from './ConversationView'
import { ChatboxView } from './ChatboxView/ChatboxView'
import { AccountContext } from '../context/AccountProvider'

export const UI = () => {
    const { socket, account } = useContext(AccountContext)

    const { sub } = account

    useEffect(() => {
        if (socket) {
            socket.emit('addUsers', { sub });
        } else {
            console.log("error")
        }
    }, [sub, socket])



    return (
        <React.Fragment>
            <div className='main-container'>
                <ConversationView />
                <ChatboxView />
            </div>
        </React.Fragment>
    )
}
