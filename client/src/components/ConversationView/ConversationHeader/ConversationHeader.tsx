import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import profileIcon from '../../../assets/person.svg';
import ThemeToggle from '@/utils/Themetoggler';
import { DialogDemo } from './RequestDialog';

export const ConversationHeader = ({ account }: any) => {
  const { setSearch } = useContext(AccountContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 px-0">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <img src={profileIcon} className="h-6 w-6 object-cover rounded-full" alt="User" />
        </div>
        <div className="more cursor-pointer text-sm">{account?.username}</div>
        {/* <div>
          <img src={moreIcon} className="h-6 w-6 object-cover rounded-full" alt="User" />
        </div> */}
        {/* <ThemeToggle />p */}
        <DialogDemo />
      </div>
      <div className="w-full h-auto box-border">
        <input
          type="text"
          placeholder="Search friends"
          onChange={handleSearchChange}
          className="border-none outline-none text-xs h-9 w-full rounded-lg bg-secondary text-textColorLightPrimary  pl-4 box-border"
        />
      </div>
    </div>
  );
};
