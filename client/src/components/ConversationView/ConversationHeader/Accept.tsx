import { MouseEvent } from 'react'
import profileIcon from '../../../assets/person.svg'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/context/AccountProvider'
import { acceptRequest } from '@/services/requestService'
import { useToast } from '@/hooks/use-toast'

export const Accept = ({ contact }: any) => {
  const { person, account } = useAccount()
  const { toast } = useToast()

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await acceptRequest(account._id, contact._id)
      if (response.status == 200) {
        console.log('you are now friends with xyz')
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
      className={`flex  items-center gap-4 p-3 rounded-xl relative cursor-pointer ${contact?.sub === person.sub ? 'bg-secondary' : 'bg-[#282828]'}`}
    >
      <div className="flex-shrink-0">
        <img src={contact.image} alt="Profile" className="h-6 w-6 object-cover rounded-full" />
      </div>
      <div>
        <div className="text-secondary-foreground text-sm">{contact?.username}</div>
      </div>
      <div className="m-auto flex justify-self-end w-auto">
        <Button variant="outline" onClick={handleSubmit}>
          accept
        </Button>
      </div>
    </div>
  )
}
