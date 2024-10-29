import { Button } from "@/components/ui/button"
import { logoutUser } from "@/services/authService"
import ThemeToggle from "@/utils/Themetoggler"
import { useNavigate } from "react-router-dom"

const ConversationBottomBar = () => {
  const navigate = useNavigate()

  const logOut = async () => {
    const res = await logoutUser()
    // if (res.status == 200) navigate("/login");
    console.log(res)
  }

  return (
    <div className="flex flex-row">
      <div>
        <ThemeToggle />
      </div>
      {/* <div>
        <Button onClick={logOut}>Logout</Button>
      </div> */}
    </div>
  )
}

export default ConversationBottomBar
