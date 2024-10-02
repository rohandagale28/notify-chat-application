import { useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountProvider';
import axios from 'axios';

interface Message {
  senderId: string;
  receiverId: string;
  conversationId: string;
  type: string;
  text: string;
}

export const ChatboxInput: React.FC<{ conversationId: string }> = ({ conversationId }) => {
  const { account, person, setTrigger, trigger, setMessages, socket } = useContext(AccountContext);

  const [text, setText] = useState('');

  const sendText = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    const message: Message = {
      senderId: account._id,
      receiverId: person._id,
      conversationId,
      type: 'text',
      text: text.trim(),
    };

    if (message.text === '') {
      console.log('Message cannot be empty');
      return;
    }

    if (!navigator.onLine) {
      window.alert('You are offline');
      return;
    }

    try {
      socket.emit('sendMessage', message);
      await axios.post('http://localhost:5000/dashboard/message/add', message, { withCredentials: true }).then(() => {
        setMessages((prev: any) => [...prev, message]);
      });
    } catch (err) {
      console.log('Error while sending message', err);
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
      <button type="button" className="cursor-pointer pr-8" onClick={sendText} disabled={text.trim() === ''}>
        Send
      </button>
    </div>
  );
};
