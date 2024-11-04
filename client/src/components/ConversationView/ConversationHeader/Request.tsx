import { MouseEvent } from 'react'
import { useAccount } from '@/context/AccountProvider'
import { sendRequest } from '@/services/requestService'
import { useToast } from '@/hooks/use-toast'
import { AddPersonIcon } from '@/components/svg/Index'

export const Request = ({ contact }: any) => {
  const { person, account } = useAccount()
  const { toast } = useToast()

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await sendRequest(account._id, contact._id)
      if (response.status == 201) {
        console.log('request send successfully')
        toast({
          title: 'Request send',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        })
      }
      console.log('Request sent successfully')
    } catch (error) {
      console.error('Error sending request:', error)
    }
  }

  return (
    <div
      className={`flex justify-between items-center gap-4 p-3 px-6 rounded-xl relative cursor-pointer ${contact?.sub === person.sub ? 'bg-secondary' : 'bg-[#282828]'}`}
    >
      <div className="flex-shrink-0 ">
        <img src={contact?.image} className="h-8 w-8 object-cover rounded-full" alt="User" />
      </div>
      <div>
        <div className="text-secondary-foreground text-sm">{contact?.username}</div>
      </div>
      <button>
        <div className="h-4 w-4">
          <AddPersonIcon />
        </div>
      </button>
    </div>
  )
}
