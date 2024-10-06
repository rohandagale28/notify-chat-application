import { AccountContext } from '@/context/AccountProvider';
import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { Message } from './Message';

interface Messages {
  _id: string;
  senderId: string;
  text: string;
  createdAt: Date | number;
  conversationId: string;
  receiverId: string;
  type: string;
}


export const ChatboxField: React.FC<Messages> = ({ messages }:Messages) => {
  const { person } = useContext(AccountContext);
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [person._id, messages]);

  return (
    <div className="flex  gap-4 h-full w-full overflow-y-scroll p-4 box-border flex-col" ref={chatboxRef}>
      {true ? (
        messages.map((item) => {
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
