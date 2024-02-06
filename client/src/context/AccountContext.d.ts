import { Socket } from "socket.io-client";
import { Account } from "./Account";
import { Person } from "./Person";

export interface TypeAccountContext {
  account: Account;
  setAccount: React.Dispatch<React.SetStateAction<object | null>>;
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
  person: Person | null;
  setPerson: React.Dispatch<React.SetStateAction<object>>;
  messages: object[];
  setMessages: React.Dispatch<React.SetStateAction<object[]>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  newMessage: object;
  setNewMessage: React.Dispatch<React.SetStateAction<object>>;
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket | null;
}
