import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import profileIcon from '../../../assets/person-add.svg';
import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@/context/AccountProvider';
import axios from 'axios';
import { Messanger } from '../Messanger/Messanger';

export function DialogDemo() {
  const { account } = useContext(AccountContext);

  const [data, setData] = useState<any>(null);
  console.log(account);
  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:5000/friend/request/${account?._id}`, {
          withCredentials: true,
        })
        .then((data) => {
          setData(data);
          console.log(data, 'this is the response data');
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [account]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <img src={profileIcon} className="h-6 w-6 object-cover rounded-full" alt="User" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pending Requests</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        {data?.data?.contactList?.map((item: any) => (
          <React.Fragment key={item._id as string}>
            <Messanger contact={item} />
          </React.Fragment>
        ))}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
