import { Socket, io } from 'socket.io-client'
import { createContext, useState, useEffect, useContext, useMemo, useRef } from 'react'

export const AccountContext = createContext<any | null>(null)

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Object | null>(null)
  const [person, setPerson] = useState<object | null>({})
  const [user, setUser] = useState<object>({})
  const [messages, setMessages] = useState<object[]>([])
  const [trigger, setTrigger] = useState(false)
  const [newMessage, setNewMessage] = useState({})
  const [search, setSearch] = useState<string>('')
  const [incomingMessage, setIncomingMessage] = useState<Object | null>(null)

  const socketURI = import.meta.env.VITE_SOCKET_API
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    const socketInstance = io(`${socketURI}`)
    socket.current = socketInstance

    // Clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect()
    }
  }, [socketURI])

  // Memoize the context value to prevent re-renders when unrelated state updates
  const contextValue = useMemo(
    () => ({
      account,
      setAccount,
      user,
      setUser,
      person,
      setPerson,
      messages,
      setMessages,
      trigger,
      setTrigger,
      incomingMessage,
      setIncomingMessage,
      search,
      setSearch,
      socket: socket.current,
    }),
    [account, user, person, messages, trigger, incomingMessage, search]
  )

  return <AccountContext.Provider value={contextValue}>{children}</AccountContext.Provider>
}

// Custom hook to access the AccountContext
export const useAccount = () => {
  const context = useContext(AccountContext)

  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider')
  }

  return context
}

export default AccountProvider
