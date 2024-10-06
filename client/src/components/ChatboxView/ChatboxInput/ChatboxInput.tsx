import { useState, useContext } from 'react';
import { AccountContext } from '@/context/AccountProvider';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface Message {
  senderId: string;
  receiverId: string;
  conversationId: string | null;
  type: string;
  text: string;
};

interface ChatboxInputProps {
  conversationId: string | null;
}

export const ChatboxInput: React.FC<ChatboxInputProps> = ({ conversationId }) => {
  const { account, person, setTrigger, trigger, setMessages, socket } = useContext(AccountContext);
  const [text, setText] = useState('');

  const sendText = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (trimmedText === '') {
      console.log('Message cannot be empty');
      return;
    }

    const message: Message = {
      senderId: account._id,
      receiverId: person._id,
      conversationId,
      type: 'text',
      text: trimmedText,
    };

    if (!navigator.onLine) {
      window.alert('You are offline');
      return;
    }

    try {
      socket.emit('sendMessage', message);
      setTrigger(!trigger); // Toggle trigger to refresh messages

      if (conversationId) {
        await axios.post('http://localhost:5000/dashboard/message/add', message, { withCredentials: true });
        setMessages((prev: any) => [...prev, message]); // Append new message to messages
      }
    } catch (err) {
      console.log('Error sending message:', err);
    }

    setText(''); // Clear the input after sending
    setTrigger(!trigger);
  };

  return (
    <div className="flex w-full h-[4.6rem] items-center justify-between rounded-xl bg-[#1c1c1c]">
      <div className="pl-8">{/* Optional Icon can go here */}</div>
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
      <Button
        type="button"
        variant="secondary"
        className="cursor-pointer pr-8"
        onClick={sendText}
        disabled={text.trim() === ''}
      >
        Send
      </Button>
    </div>
  );
};
