import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import React from 'react'

function MyApp({ Component, pageProps }) {
  console.log(process.env.MORALIS_APP_ID)
  return (
    <React.StrictMode>
      <MoralisProvider
        serverUrl={process.env.MORALIS_SERVER_URL}
        appId={process.env.MORALIS_APP_ID}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </React.StrictMode>
  )
}

export default MyApp
