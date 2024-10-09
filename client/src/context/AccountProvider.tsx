import { Socket, io } from 'socket.io-client';
import { createContext, useState, useEffect, useContext } from 'react';

export const AccountContext = createContext<any | null>(null);

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Object | null>(null);
  const [person, setPerson] = useState<object | null>({});
  const [user, setUser] = useState<object>({});
  const [messages, setMessages] = useState<object[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [newMessage, setNewMessage] = useState({});
  const [search, setSearch] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io('wss://rohan-dagale-server.glitch.me/', {
      extraHeaders: {
        "User-Agent": "Mozilla"
      }
    });
    
    setSocket(socketInstance);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const context = {
    account,
    setAccount,
    user,
    setUser,
    person,
    setPerson,
    messages,
    setMessages,
    trigger,
    setTrigger,
    newMessage,
    setNewMessage,
    search,
    setSearch,
    socket,
  };

  return <AccountContext.Provider value={context}>{children}</AccountContext.Provider>;
};

// Custom hook to access the AccountContext
export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }

  return context;
};

export default AccountProvider;
