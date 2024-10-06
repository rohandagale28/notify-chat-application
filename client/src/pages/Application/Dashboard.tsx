import { ConversationView } from '@/components/ConversationView/ConversationView';
import { useAccount } from '@/context/AccountProvider';
import { useEffect } from 'react';
import { ChatboxView } from '@/components/ChatboxView/ChatboxView';

const Dashboard = () => {
  const { account, socket } = useAccount();

  useEffect(() => {
    if (socket && account) {
      socket.emit('addUsers', account._id);
    }
  }, [account]);

  if (!account || !socket) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-row h-screen w-full box-border">
      <ConversationView />
      <ChatboxView />
    </main>
  );
};

export default Dashboard;
