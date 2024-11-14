import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'

function App() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center pt-12 gap-10 relative ">
        <div className="font-bold text-4xl tracking-tight drop-shadow-md">
          Notify Chat Application
        </div>
        <div className="text-muted-foreground w-[60%] text-center tracking-tight leading-6">
          Notify is a real-time chat application that seamlessly connects you with others. Built
          with Node.js and React.js, Notify offers instant messaging, secure interactions, and a
          user-friendly interface designed to make communication easy and enjoyable.
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/login">
            <Button className="w-20 bg-black hover:bg-muted-foreground">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="w-20 bg-black hover:bg-muted-foreground">Register</Button>
          </Link>
        </div>
        <a href="">
          <div className="text-[12px] m-2  py-1 px-4 rounded-full  text-muted-foreground hover:text-primary hover:bg-muted cursor-pointer transition-all">
            Explore our GitHub repository and contribute...!
          </div>
        </a>
        <div></div>
      </div>
    </main>
  )
}

export default App
