import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Messanger } from '../Messanger/Messanger';
import { getUsers } from '@/services/Api';
import axios from 'axios';

export const ConversationList = ({ account }: { account: any }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState<[{}]>();

  const { search } = useContext(AccountContext);

  const getSearchUser = async () => {
    try {
      if (search.length != 0) {
        const response = await getUsers(search);
        setSearchResult(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:5000/friend/request/${account._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setData(response?.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(data, 'conversatoinList');
  useEffect(() => {
    getUser();
  }, [account]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <div className="flex flex-col h-full w-full gap-2">
        {!search ? (
          <>
            {data?.data[0]?.contactUsers?.map((item: any) => (
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
                      <Messanger contact={item} />
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
