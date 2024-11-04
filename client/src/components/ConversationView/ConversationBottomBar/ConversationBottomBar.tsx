import ThemeToggle from '@/utils/Themetoggler'
import { lazy, Suspense } from 'react'

const DialogDemo = lazy(
  () => import('@/components/ConversationView/ConversationBottomBar/RequestDialog')
)

const ConversationBottomBar = () => {
  // const navigate = useNavigate()


  return (
    <div className="flex flex-row items-center gap-2">
      <div>
        <ThemeToggle />
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <DialogDemo />
        </Suspense>
      </div>
    </div>
  )
}

export default ConversationBottomBar
