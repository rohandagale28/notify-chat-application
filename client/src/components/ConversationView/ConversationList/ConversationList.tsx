import React, { useContext, useEffect, useState, useMemo } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { Messanger } from '../Messanger/Messanger'
import { Request } from '../ConversationHeader/Request'
import { searchUser } from '@/services/userService'
import axios from 'axios'
import { getConverstionList } from '@/services/appService'

interface User {
  _id: string
  username: string
  image: string
}

interface ConversationListProps {
  account: User
}

interface SearchResult {
  data: User[]
}

interface ContactListResponse {
  contactList: User[]
}

export const ConversationList: React.FC<ConversationListProps> = ({ account }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>({ data: [] })
  const [data, setData] = useState<ContactListResponse | null>(null)

  const { search } = useContext(AccountContext)

  /*-------------------- Search Results ----------------------*/
  const getSearchUser = async () => {
    try {
      if (search && search.length !== 0) {
        const response: SearchResult = await searchUser(search)
        setSearchResult(response)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  /*-------------------- Get Conversation List ---------------*/
  const getConversationUsers = async () => {
    try {
      const response = await getConverstionList(account?._id)
      console.warn(response)
      setData(response)
    } catch (err) {
      console.error(err)
    }
  }

  /*-------------------- User Effects ------------------------*/
  useEffect(() => {
    getConversationUsers()
  }, [account?._id])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchUser()
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [search])

  // Memoize the mapped contact list for conversation
  const contactList = useMemo(() => {
    return data?.contactList?.map((item) => (
      <React.Fragment key={item?._id}>
        <Messanger contact={item} />
      </React.Fragment>
    ))
  }, [data, account?._id])

  // Memoize the mapped search result
  const searchList = useMemo(() => {
    return searchResult?.data
      .filter((item) => item._id !== account._id)
      .map((item) => (
        <React.Fragment key={item._id}>
          <Request contact={item} />
        </React.Fragment>
      ))
  }, [searchResult, account?._id])

  return (
    <div className="flex flex-col h-full w-full gap-2">
      {!search ? <>{contactList}</> : <>{searchList}</>}
    </div>
  )
}
