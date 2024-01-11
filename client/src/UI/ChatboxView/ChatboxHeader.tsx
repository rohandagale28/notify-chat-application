import React, { useContext, useEffect, useState } from 'react'
import { CallIcon } from '../../components/svg/CallIcon'
import { SearchIcon } from '../../components/svg/SearchIcon'
import { VideoIcon } from '../../components/svg/VideoIcon'
import { AccountContext } from '../../context/AccountProvider'
import { TypeAccountContext } from '../../context/AccountContext'

interface ChatboxHeaderProps {
    person: {
        picture: string;
        name: string;
        sub: string
    }

}


export const ChatboxHeader: React.FC<ChatboxHeaderProps> = ({ person }) => {
    const { socket } = useContext(AccountContext) as TypeAccountContext
    const [activestatus, setActiveStatus] = useState(false)

    console.log(person)


    useEffect(() => {
        if (socket) {
            socket.on("getUsers", (res) => {
                console.log(res)
                const userFound = res.some((item: { sub: string }) => item.sub === person.sub);
                setActiveStatus(userFound);
            })
        }
    }, [socket, person.sub])

    return (
        <>
            <div className="chatbox-header">
                <div className="user-profile">
                    <img src={person?.picture} />
                </div>
                <div className="user-name">
                    {person?.name as string}
                    {activestatus === true ? <>
                        <div className="user-status">
                            <div className="user-status-dot"></div>
                            Online
                        </div>
                    </> : <>
                        <div className="user-status">
                            <div className="user-status-dot-offline"></div>
                            Offline
                        </div>
                    </>}
                </div>
                <div className="chatbox-icons">
                    <div className="video-icon">
                        <VideoIcon />
                    </div>
                    <div className="call-icon">
                        <CallIcon />
                    </div>
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                </div>
            </div>
        </>
    )
}
