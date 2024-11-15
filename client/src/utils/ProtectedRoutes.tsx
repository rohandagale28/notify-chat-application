import { useAccount } from '@/context/AccountProvider'
import { getUser } from '@/services/authService'
import { memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = memo(({ children }: { children: any }) => {
  const { setAccount } = useAccount()
  const navigate = useNavigate()

  // Memoized getUserData function with dependencies
  const getUserData = useCallback(async () => {
    try {
      const response = await getUser()
      if (response.status === 200) {
        setAccount(response.data)
      }
    } catch (error) {
      console.log('Error fetching user:', error)
      navigate('/login')
    }
  }, [setAccount, navigate])

  useEffect(() => {
    getUserData()
  }, [])

  console.log('ProtectedRoutes component re-rendered')

  return children
})
export default ProtectedRoutes
