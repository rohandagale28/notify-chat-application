import { AccountContext } from '@/context/AccountProvider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

interface RequestProps {
  id: string;
}

export const Request: React.FC<RequestProps> = () => {
  const { account } = useContext(AccountContext);

  const [data, setData] = useState<any>(null);
  console.log(account)
  const getUser = async () => {
    try {
      const response = await axios
        .get(`http://localhost:5000/friend/request/${account?._id}`, {
          withCredentials: true,
        })
        .then((data) => {
          setData(data);
          console.log(response, 'this is the response data');
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [account?._id]); // Dependency array to re-fetch when id changes

  return <div>hi</div>;
};
