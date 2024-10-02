import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Messanger } from '../Messanger/Messanger';
import axios from 'axios';
import { Request } from '../ConversationHeader/Request';
import { searchUser } from '@/services/userApi';

export const ConversationList = ({ account }: { account: any }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState<[{}]>();

  const { search } = useContext(AccountContext);

  //===========|| search bar ||==========//
  const getSearchUser = async () => {
    try {
      if (search.length != 0) {
        const response = await searchUser(search);
        setSearchResult(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // getContactList : retrieve all the users belongs to account
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/request/contact/${account?._id}`, {
        withCredentials: true,
      });
      // Assuming setData expects the response data
      setData(response.data); // Update this line to set the actual data
      console.log(response); // Log the full response for debugging
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data, 'conversatoinList');
  useEffect(() => {
    getUser();
    console.log(data, 'this is converstaion data and pending list');
  }, [account]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  console.log(data, "list of the conversation id")
  return (
    <>
      <div className="flex flex-col h-full w-full gap-2">
        {!search ? (
          <>
            {data?.contactList?.map((item: any) => (
              <React.Fragment key={item._id as string}>
                <Messanger contact={item} />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {searchResult?.data?.length > 0 &&
              searchResult?.data?.map((item) => {
                if (item?._id === account?._id) {
                  return false;
                } else {
                  return (
                    <React.Fragment key={item._id as string}>
                      <Request contact={item} />
                    </React.Fragment>
                  );
                }
              })}
          </>
        )}
      </div>
    </>
  );
};
