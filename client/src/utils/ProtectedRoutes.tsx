import { useAccount } from "@/context/AccountProvider"
import { getUser } from "@/services/userService"
import { memo, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = memo(({ children }: { children: any }) => {
  const { setAccount } = useAccount()
  const navigate = useNavigate()

  const getUserData = useCallback(async () => {
    try {
      const response = await getUser()
      if (response.status === 200) {
        setAccount(response.data)
        console.log(response.data, "this is protected routes")
      }
      console.log(response)
    } catch (error) {
      console.log("Error fetching user:", error)
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    getUserData()
  }, [])
  console.log("dashboard re-rendered")

  return <>{children}</>
})

export default ProtectedRoutes
