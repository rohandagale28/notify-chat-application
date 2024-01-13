import { useContext, useEffect } from "react"
import { AccountContext } from "../../../context/AccountProvider"

interface contactProps {
    contact: {
        name: string,
        sub: string,
        picture: string
    }
}

export const Messanger: React.FC<contactProps> = ({ contact }) => {
    console.log(contact)
    const { setPerson, person } = useContext(AccountContext)
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
                <div className="messanger-time">11:00</div>
            </div>
        </>
    )
}
