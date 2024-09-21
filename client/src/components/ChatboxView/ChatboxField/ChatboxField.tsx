import { AccountContext } from '@/context/AccountProvider';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Message } from './Message';

interface ChatboxFieldProps {
  messages: Array<{
    _id: string;
    senderId: string;
    text: string;
    createdAt: Date;
    conversationId: string;
    receiverId: string;
    type: string;
  }>;
}

export const ChatboxField: React.FC<ChatboxFieldProps> = ({ messages }) => {
  const { person } = useContext(AccountContext);

  useEffect(() => {}, [person._id]);
  console.log(messages, 'this is chatbox fiel area');

  const btn = document.querySelector('.chatbox-field');
  const el = document.querySelector('.message-container');
  btn?.addEventListener('focus', function () {
    el?.scrollIntoView(true);
  });

  return (
    <div className="flex  gap-4 h-full w-full overflow-y-scroll p-4 box-border flex-col">
      {true ? (
        messages.map((item: string) => {
          return (
            <React.Fragment key={item?._id}>
              <Message message={item} />
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full w-full box-border">
          <div className="bg-gray-700 px-3 py-2.5 rounded-full text-sm">No Messages</div>
        </div>
      )}
    </div>
  );
};
