import { useContext } from "react"
import { More } from "../../../components/svg/More"
import { AccountContext } from "../../../context/AccountProvider"

export const ConversationHeader = ({ account }) => {
    const { setSearch } = useContext(AccountContext)
    return (
        <>
            <div className="conversation-header">
                <div className="user">
                    <div className="user-profile">
                        <img src={account.picture} />
                    </div>
                    <div className="more">
                        <More />
                    </div>
                </div>
                <div className="searchbar">
                    <input type="text" placeholder="search friend and groups" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
        </>
    )
}
