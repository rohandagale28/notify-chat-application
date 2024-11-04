import { logoutUser } from '@/services/authService'
import ThemeToggle from '@/utils/Themetoggler'
import { useNavigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const DialogDemo = lazy(
  () => import('@/components/ConversationView/ConversationBottomBar/RequestDialog')
)

const ConversationBottomBar = () => {
  const navigate = useNavigate()

  const logOut = async () => {
    try {
      const res = await logoutUser()
      if (res?.status === 200) {
        navigate('/login')
      } else {
        console.log('Logout failed:', res)
      }
    } catch (error) {
      console.error('Error logging out:', error)
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
    </div>
  )
}

export default ConversationBottomBar
