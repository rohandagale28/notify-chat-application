import { useContext, useEffect } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { ConversationHeader } from './ConversationHeader/ConversationHeader'
import { ConversationList } from './ConversationList/ConversationList'
import ConversationBottomBar from './ConversationBottomBar/ConversationBottomBar'

export const ConversationView = () => {
  const { account } = useContext(AccountContext)

  useEffect(() => {}, [account])

  return (
    <div className="flex flex-col h-full  gap-8 bg-primary text-foreground w-[clamp(18rem,22rem,24rem)]  p-4 pt-8 box-border relative">
      <ConversationHeader account={account} />
      <ConversationList account={account} />
      <ConversationBottomBar />
    </div>
  )
}
