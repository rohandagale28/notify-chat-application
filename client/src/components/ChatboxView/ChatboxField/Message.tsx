import { useContext, useEffect } from 'react';
import { AccountContext } from '@/context/AccountProvider';
import { FormatDate } from '@/utils/utils';
import { Messages } from './ChatboxField';

// Define the correct type for the props of the Message component
interface MessageProps {
  message: Messages;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { account } = useContext(AccountContext);

  // Determine if the current user is the sender
  const isSender = account._id === message.senderId;

  useEffect(() => {}, []);

  return (
    <div className={`h-auto flex justify-start items-center ${isSender ? 'flex-start' : 'flex-row-reverse'}`}>
      <div
        className={`h-auto flex relative flex-row justify-start items-center w-auto box-border pl-4 pr-10 py-4 rounded-xl bg-primary-foreground ${isSender ? 'flex-start' : 'flex-end'}`}
      >
        <div className="flex self-start">{message.text}</div>
        <div className="absolute right-2 bottom-1 text-[12px] text-muted-foreground">
          {FormatDate(message.createdAt as Date )}
        </div>
      </div>
    </div>
  );
};
