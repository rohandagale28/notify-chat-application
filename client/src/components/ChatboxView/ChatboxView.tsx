import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { EmptyChatbox } from './EmptyChatbox';
import { ChatboxHeader } from './ChatboxHeader/ChatboxHeader';
import { createConversation } from '@/services/userApi';
import { ChatboxInput } from './ChatboxInput/ChatboxInput';
import { ChatboxField } from './ChatboxField/ChatboxField';

export const ChatboxView: React.FC = () => {
  const { person, account, socket, trigger } = useContext(AccountContext);

  //==========|| useStates ||==========\\
  const [conversationId, setConversationId] = useState<any | null>();
  const [messages, setMessages] = useState<object[]>([]);
  const [incomingMessage, setIncomingMessage] = useState<any | null>(null);

  const getConversationMessages = async () => {
    try {
      await createConversation({ senderId: account._id, receiverId: person._id }).then((data) => {
        setConversationId(data.data._id);
        setMessages(data.data.messages);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //==========|| useEffects ||==========\\
  useEffect(() => {
    if (socket) {
      const handleMessage = (data: any) => {
        console.log(data,"this is message coming from other pary")
        setIncomingMessage({ ...data, createdAt: Date.now() });
      };
      socket.on('getMessage', handleMessage);
    }
  }, []);

  useEffect(() => {
    incomingMessage &&
      incomingMessage.senderId === person._id &&
      setMessages((prev: object[]) => [...prev, incomingMessage]);
  }, [incomingMessage, person._id, trigger]);

  useEffect(() => {
    getConversationMessages();
  }, [person]);

  return (
    <>
      <div className="h-full w-[calc(100%-20%)] box-border p-5 bg-secondary flex flex-col gap-3">
        {Object.keys(person).length ? (
          <>
            <ChatboxHeader person={person} />
            <ChatboxField messages={messages} />
            <ChatboxInput conversationId={conversationId} />
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
