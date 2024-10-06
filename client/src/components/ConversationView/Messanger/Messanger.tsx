// import { MouseEvent } from 'react';
// import axios from 'axios';
import profileIcon from '../../../assets/person.svg';
// import { Button } from '@/components/ui/button';
import { useAccount } from '@/context/AccountProvider';

export const Messanger = ({ contact }: any) => {
  const { setPerson, person   } = useAccount();

  // const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       'http://localhost:5000/request/new',
  //       { sender: account?._id, receiver: contact._id },
  //       { withCredentials: true }
  //     );
  //     console.log('Request sent successfully');
  //   } catch (error) {
  //     console.error('Error sending request:', error);
  //   }
  // };

  return (
    <div
      className={`flex justify-start items-center gap-4 p-3 rounded-xl relative cursor-pointer ${contact?.sub === person.sub ? 'bg-secondary' : 'bg-[#282828]'}`}
      onClick={() => setPerson(contact)}
    >
      <div className="flex-shrink-0">
        <img src={profileIcon} alt="Profile" className="h-6 w-6 object-cover rounded-full" />
      </div>
      <div>
        <div className="text-secondary-foreground pl-4 text-sm">{contact?.username}</div>
      </div>
    </div>
  );
};
