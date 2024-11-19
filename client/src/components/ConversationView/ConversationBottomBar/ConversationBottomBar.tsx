import { toast } from '@/hooks/use-toast'
import { logoutUser } from '@/services/authService'
import ThemeToggle from '@/utils/Themetoggler'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RequestDialog from './RequestDialog'

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
        <RequestDialog />
      </div>
      <div>
        <button onClick={Logout} className="p-2  rounded-lg hover:bg-muted">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default ConversationBottomBar
