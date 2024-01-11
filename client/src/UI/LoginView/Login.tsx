import { useContext } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { AccountContext } from '../../context/AccountProvider'
import { addUser } from '../../services/Api'
import { GoogleUserInfo } from './GoogleUserInfo'
import "../../sass/login.scss"
import logo from '../../assets/logo-transparent-png.png'

export const Login = () => {
    const { setAccount } = useContext(AccountContext)

    const onLoginSuccess = async (res: CredentialResponse) => {
        const decoded: GoogleUserInfo = jwtDecode(res.credential as string)
        await addUser(decoded).then(res => setAccount(res))
        window.localStorage.setItem("user", JSON.stringify(decoded))
    }

    const onLoginError = () => {
        console.error("error while login")
    }

    return (
        <>
            <div className='login-screen-main'>
                <div className='login-screen-main-title'>
                    <img src={logo} alt="notify-img" />
                </div>
                <div className='login-screen-main-description'>
                    Welcome to Notify, the dynamic platform where your conversations transcend the ordinary.
                    Experience the magic of real-time communication as your words come alive in vibrant
                    discussions with friends, family, and colleagues. Notify is your gateway to interactive and
                    engaging conversations.
                </div>
                <div className='login-screen-main-google'>
                    <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} shape='pill' size='large' theme='filled_black' logo_alignment='left' text='continue_with' width="28" type='standard' cancel_on_tap_outside={true} />
                </div>
            </div>
        </>
    )
}
