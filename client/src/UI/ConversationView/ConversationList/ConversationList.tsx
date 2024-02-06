import React, { useContext, useEffect, useState } from "react"
import { Messanger } from "./Messanger"
import { AccountContext } from "../../../context/AccountProvider"
import { getUsers } from "../../../services/Api"
import { Account } from "../../../context/Account"


export const ConversationList = ({ account }: { account: Account }) => {
    const [searchResult, setSearchResult] = useState([])

    const { search } = useContext(AccountContext)

    const getSearchUser = async () => {
        try {
            const response = await getUsers(search);
            setSearchResult(response)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getSearchUser();
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [search])


    return (
        <>
            <div className="conversation-list">
                {/* query send after friend */}
                {!search ? <>
                    {account ? account?.contact_list?.map((item) => {
                        return (
                            <React.Fragment key={item.sub as string}>
                                <Messanger contact={item} />
                            </React.Fragment>
                        )
                    }
                    ) :
                        <>
                            Add Friends
                        </>
                    }
                </>
                    :
                    <>
                        {searchResult.length > 0 && searchResult.map((item) => {
                            if (item?.sub === account?.sub) {
                                return false
                            }
                            else {
                                return (
                                    <React.Fragment key={item.sub as string}>
                                        <Messanger contact={item} />
                                    </React.Fragment>
                                )
                            }
                        })}
                    </>}

            </div>
        </>
    )
}
