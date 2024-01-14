import { useContext, useEffect } from "react"
import { ConversationHeader } from './ConversationHeader/ConversationHeader'
import { AccountContext } from "../../context/AccountProvider"
import { ConversationList } from "./ConversationList/ConversationList"
import { TypeAccountContext } from "../../context/AccountContext"

export const ConversationView = () => {
    const { account } = useContext(AccountContext) as TypeAccountContext

    console.log(account)
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
