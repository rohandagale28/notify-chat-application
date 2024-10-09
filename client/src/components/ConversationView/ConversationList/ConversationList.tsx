import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Messanger } from '../Messanger/Messanger';
import axios from 'axios';
import { Request } from '../ConversationHeader/Request';
import { searchUser } from '@/services/userApi';

interface User {
  _id: string;
  // Add other properties of a user as needed
  // e.g., name: string;
}

interface ConversationListProps {
  account: User | null; // Change this type based on your account structure
}

interface SearchResult {
  data: User[];
}

export const ConversationList: React.FC<ConversationListProps> = ({ account }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>({ data: [] });
  const [data, setData] = useState<{ contactList: User[] } | null>(null);

  const { search } = useContext(AccountContext);

  //===========|| search bar ||==========//
  const getSearchUser = async () => {
    try {
      if (search.length !== 0) {
        const response = await searchUser(search);
        setSearchResult(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // getContactList: retrieve all the users belongs to account
  const getUser = async () => {
    try {
      const response = await axios.get<{ contactList: User[] }>(`http://localhost:5000/request/contact/${account?._id}`, {
        withCredentials: true,
      });
      setData(response.data); // Update this line to set the actual data
      console.log(response); // Log the full response for debugging
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [account]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Memoize the mapped contact list for conversation
  const contactList = useMemo(() => {
    return data?.contactList?.map((item) => (
      <React.Fragment key={item._id}>
        <Messanger contact={item} />
      </React.Fragment>
    ));
  }, [data]);

  // Memoize the mapped search result
  const searchList = useMemo(() => {
    return searchResult.data
      .filter((item) => item._id !== account?._id)
      .map((item) => (
        <React.Fragment key={item._id}>
          <Request contact={item} />
        </React.Fragment>
      ));
  }, [searchResult, account]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      {!search ? (
        <>
          {contactList}
        </>
      ) : (
        <>
          {searchList}
        </>
      )}
    </div>
  );
};
