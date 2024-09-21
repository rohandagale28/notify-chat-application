import { MouseEvent, useContext, useEffect } from 'react';
import axios from 'axios';
import profileIcon from '../../../assets/person.svg';
import addUserIcon from '../../../assets/person-add.svg';
import { AccountContext } from '@/context/AccountProvider';

export const Messanger = ({ contact }: any) => {
  const { setPerson, person, account } = useContext(AccountContext);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:5000/friend/request',
        { user1: contact._id, user2: account.data._id },
        { withCredentials: true }
      )
      .then(() => {
        console.log('request send successfully');
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div
        className={`flex justify-between items-center gap-4 p-3 rounded-xl relative cursor-pointer ${contact?.sub === person.sub ? 'bg-secondary' : 'bg-[#282828]'}`}
        onClick={() => setPerson(contact)}
      >
        <div className="flex-shrink-0">
          <img
            src={profileIcon}
            alt="Profile"
            className="h-6 w-6 object-cover rounded-full cursor-pointer text-white"
          />
        </div>
        <div>
          <div className=" text-secondary-foreground">{contact?.username}</div>
        </div>
        <div className="">
          <button className="" onClick={(e) => handleSubmit(e)}>
            <img
              src={addUserIcon}
              alt="Profile"
              className="h-4 w-4 object-cover rounded-full cursor-pointer text-white"
            />
          </button>
        </div>
      </div>
    </>
  );
};
