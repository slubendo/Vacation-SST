import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {KindeProvider} from "@kinde-oss/kinde-auth-react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <KindeProvider
        audience={import.meta.env.VITE_APP_KINDE_AUDIENCE}
        clientId="a24ead3affb24dbebce56b30d9a33e78"
        domain="https://cloudrecipe.kinde.com"
        logoutUri={window.location.origin}
        redirectUri={window.location.origin}
    >
     <App />
    </KindeProvider>
  </React.StrictMode>,
)
