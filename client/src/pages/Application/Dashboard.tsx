import { ConversationView } from '@/components/ConversationView/ConversationView';
import { AccountContext } from '@/context/AccountProvider';
import React, { useEffect, useContext } from 'react';
import { Request } from '../../components/PendingRequest/Request';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/services/userApi';
import { ChatboxView } from '@/components/ChatboxView/ChatboxView';

const Dashboard = () => {
  const { account, setAccount, socket } = useContext(AccountContext);
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await getUser();
      console.log(response);
      if (response.status == 200) {
        setAccount(response.data);
      }
    } catch (error) {
      navigate('/login');
      console.log('making erros: ', error, 'catching errors');
    }
  };
// console.log(account._id, "hehehehehehe")
  useEffect(() => {
    getUserData();
    if (socket) {
      socket.emit('addUsers', { sub: account._id }); // Assuming you're using user ID from Clerk
    } else {
      console.log('Socket connection error or user not loaded');
    }
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-row h-screen w-full box-borde">
        <ConversationView />
        <ChatboxView />
        {/* <Request id={account?.data?._id} /> */}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
