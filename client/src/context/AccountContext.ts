import { Socket } from "socket.io-client";

export interface TypeAccountContext {
  account: { sub: string } | null;
  setAccount: React.Dispatch<React.SetStateAction<object | null>>;
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
  person: { sub: string; name: string; picture: string } | null;
  setPerson: React.Dispatch<React.SetStateAction<object>>;
  messages: object[];
  setMessages: React.Dispatch<React.SetStateAction<object[]>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  newMessage: object;
  setNewMessage: React.Dispatch<React.SetStateAction<object>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket | null;
}
