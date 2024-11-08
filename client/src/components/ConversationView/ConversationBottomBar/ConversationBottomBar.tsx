import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { toast } from '@/hooks/use-toast'
import { logoutUser } from '@/services/authService'
import ThemeToggle from '@/utils/Themetoggler'
import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

const DialogDemo = lazy(
  () => import('@/components/ConversationView/ConversationBottomBar/RequestDialog')
)

const ConversationBottomBar = () => {
  const navigate = useNavigate()

  const Logout = async () => {
    const res = await logoutUser()
    if (res.status == 200) {
      navigate('/login')
      toast({
        title: 'You have been logged out',
        description: 'Please sign up.',
      })
    }
  }

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
      <div>
        <Button variant="secondary" onClick={Logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default ConversationBottomBar
