import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import profileIcon from '../../../assets/person-add.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccount } from '@/context/AccountProvider';
import { Accept } from './Accept';

export function DialogDemo() {
  const { account } = useAccount();

  const [data, setData] = useState<any>(null);

  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:5000/request/contact/${account?._id}`, {
          withCredentials: true,
        })
        .then((data) => {
          setData(data);
          console.log(data, 'this is the response data from dialog');
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
        {data?.data?.pendingList?.map((item: any) => (
          <React.Fragment key={item._id as string}>
            <Accept contact={item} />
          </React.Fragment>
        ))}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
