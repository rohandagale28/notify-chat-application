import { useContext } from "react";
import { AccountContext } from "@/context/AccountProvider";
import { FormatDate } from "@/utils/utils";
import { Messages } from "./ChatboxField";

// Define the correct type for the props of the Message component
interface MessageProps {
  message: Messages;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { account } = useContext(AccountContext);

  const isSender = account?._id == message?.senderId; // Determine if the current user is the sender
  console.log(message);
  return (
    <div className={`flex   ${isSender ? "items-start " : "items-end"}`}>
      <div
        className={`flex relative items-center w-auto p-4 rounded-xl bg-primary-foreground ${isSender ? "items-start " : "items-end"}`}
      >
        <div className="flex">{message.text}</div>
        <div className="absolute right-2 bottom-1 text-[12px] text-muted-foreground">
          {FormatDate(message.createdAt as Date)}
        </div>
      </div>
    </div>
  );
};
