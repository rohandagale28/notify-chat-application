import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { EmptyChatbox } from './EmptyChatbox';
import { ChatboxHeader } from './ChatboxHeader/ChatboxHeader';
import { createConversation } from '@/services/userApi';
import { ChatboxInput } from './ChatboxInput/ChatboxInput';
import { ChatboxField } from './ChatboxField/ChatboxField';

export const ChatboxView: React.FC = () => {
  const { person, account, socket } = useContext(AccountContext);

  const [conversationId, setConversationId] = useState<any | null>();
  const [messages, setMessages] = useState<object[]>([]);
  const [incomingMessage, setIncomingMessage] = useState<any | null>(null);
  console.log(person.account);
  const getConversationMessages = async () => {
    try {
      await createConversation({ senderId: account._id, receiverId: person._id }).then((data) => {
        setConversationId(data);
        setMessages(data.data[0].messages);
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(messages, 'this is message state');
  useEffect(() => {
    if (socket) {
      const handleMessage = (data: any) => {
        setIncomingMessage({ ...data, createdAt: Date.now() });
      };
      socket.on('getMessage', handleMessage);
    }
  }, []);
  console.log(messages);
  useEffect(() => {
    incomingMessage &&
      incomingMessage.senderId === person._id &&
      setMessages((prev: object[]) => [...prev, incomingMessage]);
  }, [incomingMessage, person.sub]);

  useEffect(() => {
    getConversationMessages();
    console.log(conversationId?.data, 'conversation Id adn messages');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  return (
    <>
      <div className="h-full w-[calc(100%-20%)] box-border p-5 bg-secondary flex flex-col gap-3">
        {Object.keys(person).length ? (
          <>
            <ChatboxHeader person={person} />
            <ChatboxField messages={messages} />
            <ChatboxInput
              conversationId={conversationId?.data[0]?._id}
              senderId={''}
              receiverId={''}
              type={''}
              text={''}
            />
          </>
        ) : (
          <>
            {' '}
            <EmptyChatbox text="select a chat to start conversation" />{' '}
          </>
        )}
      </div>
    </>
  );
};
