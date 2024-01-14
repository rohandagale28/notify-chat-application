import React, { useContext, useEffect, useState } from "react"
import { Messanger } from "./Messanger"
import { AccountContext } from "../../../context/AccountProvider"
import { getUsers } from "../../../services/Api"
import { Account } from "../../../context/Account"


export const ConversationList = ({ account }: Account) => {
    const [searchResult, setSearchResult] = useState([])

    const { search } = useContext(AccountContext)

    const fetchData = async () => {
        try {
            const response = await getUsers(search);
            console.log(response)
            setSearchResult(response)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData();
        }, 600);
        //new time out
        return () => clearTimeout(delayDebounceFn);
    }, [search])


    return (
        <>
            <div className="conversation-list">
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
                                    <React.Fragment key={item}>
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
