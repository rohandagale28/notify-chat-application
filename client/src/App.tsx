import React from 'react'
import "./sass/main.scss"
import { Messanger } from './UI/Authchecker/Auth'
import AccountProvider from './context/AccountProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const App = () => {
  const clientId = import.meta.env.VITE_OAUTH_URL

  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId={clientId}>
        <AccountProvider>
          <Messanger />
        </AccountProvider>
      </GoogleOAuthProvider>
    </React.Fragment>
  )
}
