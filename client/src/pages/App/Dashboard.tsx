import { ConversationView } from "@/components/ConversationView/ConversationView";
import { ChatboxView } from "@/components/ChatboxView/ChatboxView";
import { useAccount } from "@/context/AccountProvider";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { account, socket } = useAccount();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (socket && account) {
      socket.emit("addUsers", account._id);
      setIsLoading(false);
    }
    console.log(account);
  }, [account, socket]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-row h-screen w-full box-border bg-primary text-secondary-foreground">
      <ConversationView />
      <ChatboxView />
    </main>
  );
};

export default Dashboard;
