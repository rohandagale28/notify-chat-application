import { useContext, useEffect } from 'react';
import { AccountContext } from '@/context/AccountProvider';
import { FormatDate } from '@/utils/utils';

interface MessageProps {
  message: {
    senderId: string;
    text: string;
    createdAt: Date;
    _id: string;
    conversationId: string;
    receiverId: string;
    type: string;
  };
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { account } = useContext(AccountContext);

  const isSender = account._id === message.receiverId;

  useEffect(() => {}, []);

  return (
    <>
      <div className={`h-auto flex justify-start items-center ${isSender ? 'flex-start' : 'flex-row-reverse'}`}>
        <div
          className={`h-auto flex relative flex-row justify-start items-center w-auto box-border pl-4 pr-10 py-4 rounded-xl bg-primary-foreground ${isSender ? 'flex-start' : 'flex-end'}`}
        >
          <div className="flex self-start">{message.text}</div>
          <div className="absolute right-2 bottom-1 text-[12px] text-muted-foreground">
            {FormatDate(message.createdAt)}
          </div>
        </div>
      </div>
    </>
  );
};
