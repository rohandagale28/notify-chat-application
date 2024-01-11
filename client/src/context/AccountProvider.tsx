import { createContext, useState, useEffect } from "react"
import { io, Socket } from 'socket.io-client'


export const AccountContext = createContext<unknown | undefined>(undefined)

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<object | null>(null)
    const [person, setPerson] = useState<object>({})
    const [user, setUser] = useState<object>({})
    const [messages, setMessages] = useState<object[]>([])
    const [trigger, setTrigger] = useState(false)
    const [newMessage, setNewMessage] = useState({})
    const [search, setSearch] = useState<string>("")
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const socketInstance = io("ws://localhost:9000")
        setSocket(socketInstance)

        //Clean up the socket connection when the component unmounts
        return () => {
            if (socketInstance) {
                socketInstance.disconnect()
            }
        }
    }, [])

    const context = { account, setAccount, user, setUser, person, setPerson, messages, setMessages, trigger, setTrigger, newMessage, setNewMessage, search, setSearch, socket }

    return (
        <AccountContext.Provider value={context}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider