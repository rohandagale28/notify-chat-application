import { createContext, useState, useEffect } from "react"
import { io, Socket } from 'socket.io-client'
import { TypeAccountContext } from './AccountContext'
import { Account } from "./Account"
export const AccountContext = createContext<TypeAccountContext | null>(null)

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<Account | null>(null)
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
        <AccountContext.Provider value={context as TypeAccountContext}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider