import { useState, useContext } from 'react';
import { DocIcon } from '../../components/svg/DocIcon';
import { SendIcon } from '../../components/svg/SendIcon';
import { AccountContext } from '@/context/AccountProvider';
import axios from 'axios';

interface Message {
  senderId: string;
  receiverId: string;
  conversationId: string;
  type: string;
  text: string;
}

export const ChatboxInput: React.FC<Message> = ({ conversationId }) => {
  const { account, person, setTrigger, trigger, setMessages, socket } = useContext(AccountContext);
  const [text, setText] = useState('');

  const sendText = async (e: React.FormEvent) => {
    e.preventDefault();

    const message: Message = {
      senderId: account._id,
      receiverId: person._id,
      conversationId: conversationId,
      type: 'text',
      text: text,
    };
    console.log(message, 'this is message to send');
    if (text.trim() === '') {
      console.log('message should be something');
    } else if (window.navigator.onLine === false) {
      window.alert('offline');
    } else {
      try {
        socket.emit('sendMessage', message);
        await axios.post('http://localhost:5000/dashboard/message/add', message, { withCredentials: true });
        setMessages((prev: any) => [message, ...prev]);
      } catch (err) {
        console.log('Error while getting user', err);
        return err;
      }
    }
    setText('');
    setTrigger(!trigger);
  };

  return (
    <div className="flex w-full h-[4.6rem] items-center justify-between rounded-xl bg-[#1c1c1c]">
      <div className="pl-8">{/* <DocIcon /> */}</div>
      <div className="w-[80%]">
        <form onSubmit={sendText}>
          <input
            autoFocus
            type="text"
            placeholder="Write a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-8 w-full outline-none border-none bg-transparent text-[#d3d3d3] text-base"
          />
        </form>
      </div>
      <div className="cursor-pointer pr-8" onClick={sendText}>
        {/* <SendIcon /> */}
        send
      </div>
    </div>
  );
};
