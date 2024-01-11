import { useContext, useEffect, useState } from 'react'
import { CallIcon } from '../../components/svg/CallIcon'
import { SearchIcon } from '../../components/svg/SearchIcon'
import { VideoIcon } from '../../components/svg/VideoIcon'
import { AccountContext } from '../../context/AccountProvider'


export const ChatboxHeader = ({ person }) => {
    const { socket } = useContext(AccountContext)
    const [activestatus, setActiveStatus] = useState(false)

    console.log(activestatus)


    useEffect(() => {
        if (socket) {
            socket.on("getUsers", (res) => {
                console.log(res)
                res.map((item) => {
                    if (item.sub === person.sub) {
                        setActiveStatus(true)
                    } else {
                        setActiveStatus(false)
                    }
                })
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
                    {person?.name}
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
