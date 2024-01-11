import { useContext, useEffect } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { FormatDate } from '../../components/Utils/FormatDate'
import { TypeAccountContext } from '../../context/AccountContext'

interface MessageProps {
    message: {
        senderId: string;
        text: string;
        createdAt: Date;
        _id: string
        conversationId: string;
        receiverId: string;
        type: string
    };
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    console.log(message)
    const { account }: TypeAccountContext = useContext(AccountContext)

    const isSender = account.sub === message.senderId;

    useEffect(() => {

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
