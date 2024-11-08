import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAccount } from '@/context/AccountProvider'
import { Accept } from '../ConversationHeader/Accept'
import { AcceptPersonIcon } from '@/components/svg/Index'
import { getConverstionList } from '@/services/appService'

export default function DialogDemo() {
  const { account } = useAccount()

  const [data, setData] = useState<any>(null)

  const getUser = async () => {
    try {
      await getConverstionList(account?._id).then((data) => {
        setData(data)
        console.log(data, 'this is the response data from dialog')
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [account])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2  rounded-lg hover:bg-muted">
          <div className="h-4 w-4">
            <AcceptPersonIcon />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-popover border-popover">
        <DialogHeader>
          <DialogTitle>Requests</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {data?.data?.pendingList?.length < 0 ? (
          <div className="text-center w-full font-semibold">No Pending Request</div>
        ) : (
          <>
            {data?.data?.pendingList?.map((item: any) => (
              <React.Fragment key={item._id as string}>
                <Accept contact={item} />
              </React.Fragment>
            ))}
          </>
        )}
        <DialogFooter>
          {/* <Button variant="outline" className="" type="submit">
            Save changes
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
