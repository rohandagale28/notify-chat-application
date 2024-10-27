import { useContext, useCallback } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { DialogDemo } from "./RequestDialog";

interface Account {
  _id: string;
  image?: string;
  username: string;
}

interface ConversationHeaderProps {
  account: Account;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ account }) => {
  const { setSearch } = useContext(AccountContext);

  // Memoize handleSearchChange to avoid unnecessary re-renders
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <div className="flex flex-col gap-6 px-0">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <img src={account?.image} className="h-8 w-8 object-cover rounded-full" alt="User" />
        </div>
        <div className="more cursor-pointer text-sm">{account?.username}</div>
        <DialogDemo />
      </div>
      <div className="w-full h-auto box-border">
        <input
          type="text"
          placeholder="Search friends"
          onChange={handleSearchChange}
          className="border-none outline-none text-xs h-9 w-full rounded-lg bg-secondary text-textColorLightPrimary pl-4 box-border"
        />
      </div>
    </div>
  );
};
