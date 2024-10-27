import { AccountContext } from "@/context/AccountProvider";
import React, { useContext, useRef, useEffect } from "react";
import { Message } from "./Message";

export interface Messages {
  _id: string;
  senderId: string;
  text: string;
  createdAt: Date | number;
  conversationId: string;
  receiverId: string;
  type: string;
}

interface ChatboxFieldProps {
  messages: Messages[];
}

export const ChatboxField: React.FC<ChatboxFieldProps> = ({ messages }) => {
  const { person } = useContext(AccountContext);
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [person._id, messages]);

  return (
    <div
      className="flex gap-4 h-full w-full overflow-y-scroll p-4 box-border flex-col"
      ref={chatboxRef}
    >
      {messages.length > 0 ? (
        messages.map((item: Messages) => {
          return (
            <React.Fragment key={item._id}>
              <Message message={item} />
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex  h-full w-full box-border">
          <div className="bg-gray-700 px-3 py-2.5 rounded-full text-sm">No Messages</div>
        </div>
      )}
    </div>
  );
};
