import { useContext, useEffect } from "react"
import { ConversationHeader } from './ConversationHeader/ConversationHeader'
import { ConversationList } from './ConversationList/ConversationList'
import { AccountContext } from "../../context/AccountProvider"

export const ConversationView = () => {
    const { account } = useContext(AccountContext)

    useEffect(() => {
    }, [account])

    return (
        <>
            <div className="conversation">
                <ConversationHeader account={account} />
                <ConversationList account={account} />
            </div>
        </>
    )
}
