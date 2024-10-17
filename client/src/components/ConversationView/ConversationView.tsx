import { useContext, useEffect } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { ConversationHeader } from './ConversationHeader/ConversationHeader';
import { ConversationList } from './ConversationList/ConversationList';

export const ConversationView = () => {
  const { account } = useContext(AccountContext);

  useEffect(() => { }, [account]);

  return (
    <div className="flex flex-col h-full w-[clamp(16rem,18rem,20rem)] bg-primary-foreground p-4 pt-8 box-border relative gap-8">
      <ConversationHeader account={account} />
      <ConversationList account={account} />
    </div>
  );
};
