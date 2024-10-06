import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { EmptyChatbox } from './EmptyChatbox';
import { ChatboxHeader } from './ChatboxHeader/ChatboxHeader';
import { createConversation } from '@/services/userApi';
import { ChatboxInput } from './ChatboxInput/ChatboxInput';
import { ChatboxField } from './ChatboxField/ChatboxField';

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: Date | number;
  conversationId: string;
  receiverId: string;
  type: string;
}

export const ChatboxView: React.FC = () => {
  const { person, account, socket, trigger } = useContext(AccountContext);

  //==========|| useStates ||==========\\
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [incomingMessage, setIncomingMessage] = useState<Message | null>(null);

  const getConversationMessages = async () => {
    try {
      const { data } = await createConversation({ senderId: account._id, receiverId: person._id });
      setConversationId(data._id);
      setMessages(data.messages);
    } catch (err) {
      console.error('Error fetching conversation:', err);
    }
  };

  //==========|| useEffects ||==========\\
  useEffect(() => {
    if (socket) {
      const handleMessage = (data: Message) => {
        setIncomingMessage({ ...data, createdAt: Date.now() });
      };
      socket.on('getMessage', handleMessage);
    }
  }, []);

  useEffect(() => {
    if (incomingMessage && incomingMessage.senderId === person._id) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage, person._id, trigger]);

  useEffect(() => {
    if (person._id) {
      getConversationMessages();
    }
  }, [person]);

  useEffect(() => { }, [trigger])

  console.warn(messages)

  return (
    <div className="h-full w-full box-border p-5 bg-secondary flex flex-col gap-3">
      {Object.keys(person).length ? (
        <>
          <ChatboxHeader person={person} />
          <ChatboxField messages={messages} />
          <ChatboxInput conversationId={conversationId} />
        </>
      ) : (
        <EmptyChatbox text="Select a chat to start conversation" />
      )}
    </div>
  );
};
