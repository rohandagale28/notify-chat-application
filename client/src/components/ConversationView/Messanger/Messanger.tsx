// import { MouseEvent } from 'react';
// import axios from 'axios';
// import { ReactComponent as ProfileIcon } from '../../../assets/person.svg';
// import { Button } from '@/components/ui/button';
import { useAccount } from '@/context/AccountProvider';
import MyIcon from '../../../assets/person.svg'
export const Messanger = ({ contact }: any) => {
  const { setPerson, person } = useAccount();

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
      className={`flex justify-start items-center gap-4 p-3 rounded-xl relative cursor-pointer ${contact?.sub === person.sub ? 'bg-secondary' : 'bg-[#282828]'} `}
      onClick={() => setPerson(contact)}
    >
      <div className="flex-shrink-0 h-4 w-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z" />
        </svg>
        </div>
      <div>
        <div className="text-secondary-foreground pl-4 text-sm">{contact?.username}</div>
      </div>
    </div>
  );
};
