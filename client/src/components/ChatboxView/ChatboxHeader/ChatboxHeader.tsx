import { useState } from 'react';
import VideoIcon from '../../../assets/videocam.svg';

interface Person {
  sub?: string,
  username?: string,
  picture?: string
}

export const ChatboxHeader = ({ person }: { person: Person }) => {
  // const { socket } = useContext(AccountContext);
  const [activestatus] = useState(false);

  //   useEffect(() => {
  //     if (socket) {
  //       socket.on('getUsers', (res) => {
  //         console.log(res);
  //         const userFound = res.some((item: { sub: string }) => item.sub === person.sub);
  //         setActiveStatus(userFound);
  //       });
  //     }
  //   }, [socket, person.sub]);

  return (
    <div className="w-full h-[4.6rem] flex text-secondary-foreground justify-between items-center rounded-xl">
      <div className="pl-4">
        <img src={person?.picture} alt="Profile" className="h-10 w-10 object-cover rounded-full cursor-pointer" />
      </div>
      <div className=" text-sm font-medium flex flex-row items-center justify-center gap-2">
        {person?.username}
        {activestatus === true ? (
          <div className="flex items-center gap-2 text-xs">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs">
            <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
        )}
      </div>
      <div className="flex gap-8 pr-8">
        <div className='text-white'>
          <img src={VideoIcon} className="h-6 w-6 object-cover rounded-full text-primary-foreground" alt="User" />
        </div>
      </div>
    </div>
  );
};
