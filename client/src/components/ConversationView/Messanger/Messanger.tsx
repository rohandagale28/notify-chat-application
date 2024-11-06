import { useAccount } from '@/context/AccountProvider'

export const Messanger = ({ contact }: any) => {
  const { setPerson, person } = useAccount()

  return (
    <div
      className={`flex justify-start items-center gap-1  py-3  px-4 rounded-lg relative cursor-pointer hover:bg-muted ${contact?._id !== person?._id ? 'bg-transparent' : 'bg-secondary'} `}
      onClick={() => setPerson(contact)}
    >
      <div className="flex-shrink-0 ">
        <img src={contact?.image} className="h-8 w-8 object-cover rounded-full" alt="User" />
      </div>
      <div className="flex flex-col">
        <div className="text-secondary-foreground pl-4 text-sm">{contact?.username}</div>
        <div className="text-muted-foreground pl-4 text-xs ">{`hey i hope you are doing ..`}</div>
      </div>
    </div>
  )
}
