import { MouseEvent, useContext, useEffect } from "react"
import { AccountContext } from "../../../context/AccountProvider"
import axios from "axios"

interface contactProps {
    contact: {
        name: string,
        sub: string,
        picture: string,
        _id: string
    }
}

export const Messanger: React.FC<contactProps> = ({ contact }) => {
    const { setPerson, person, account } = useContext(AccountContext)

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/friend/request", { user1: contact._id, user2: account._id }).then(() => {
            console.log("request send successfully")
        })
    }

    useEffect(() => {
    }, [])

    return (
        <>
            <div className="messanger" onClick={() => setPerson(contact)} style={{ backgroundColor: `${contact?.sub == person.sub ? "#000" : "#282828"}` }}>
                <div className="messanger-profile">
                    <img src={contact?.picture} />
                </div>
                <div>
                    <div className="messanger-name">
                        {contact?.name}
                    </div>
                </div>
                <div className="messanger-time">
                    <button onClick={(e) => handleSubmit(e)}>Add friend</button>
                </div>
            </div >
        </>
    )
}
