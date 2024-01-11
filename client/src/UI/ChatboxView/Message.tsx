import { useContext, useEffect, useRef } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { FormatDate } from '../../components/Utils/FormatDate'

export const
    Message = ({ message }) => {

        const { account } = useContext(AccountContext)

        const isSender = account.sub === message.senderId;
        const containerRef = useRef(null)

        useEffect(() => {
            // containerRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
        }, [])

        
        return (
            <>
                <div className={`message-container-main${isSender ? '-sender' : ''}`}>
                    <div className="message-container">
                        <div className="message-text">
                            {message.text}
                        </div>
                        <div className="message-container-created">
                            {FormatDate(message.createdAt)}
                        </div>
                    </div>
                </div >
            </>
        )
    }
