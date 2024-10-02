import { ConversationView } from '@/components/ConversationView/ConversationView';
import { useAccount } from '@/context/AccountProvider';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/services/userApi';
import { ChatboxView } from '@/components/ChatboxView/ChatboxView';

const Dashboard = () => {
  const { account, setAccount, socket } = useAccount();
  const navigate = useNavigate();

  // Memoize getUserData to prevent re-creation on every render
  const getUserData = useCallback(async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        setAccount(response.data);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  // Only add the user to the socket after account is available
  useEffect(() => {
    if (socket && account) {
      socket.emit('addUsers', account._id);
    }
  }, [account]);

  return (
    <main className="flex flex-row h-screen w-full box-border">
      <ConversationView />
      <ChatboxView />
    </main>
  );
};

export default Dashboard;
