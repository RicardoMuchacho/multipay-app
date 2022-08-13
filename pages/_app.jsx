import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import React from 'react'

function MyApp({ Component, pageProps }) {
  //console.log(process.env.MORALIS_APP_ID)
  return (
    <React.StrictMode>
      <MoralisProvider
        //serverUrl={process.env.MORALIS_SERVER_URL}
        //appId={process.env.MORALIS_APP_ID}
        serverUrl="https://o8dgn6gkxljv.usemoralis.com:2053/server"
        appId="6X2kngnLUAuVwymmTWJDb5lq7GeCOFz5K7fRDKcz"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </React.StrictMode>
  )
}

export default MyApp
