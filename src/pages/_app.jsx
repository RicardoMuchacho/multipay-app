import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { MoralisProvider } from 'react-moralis'
import { AppProvider } from '../AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </MoralisProvider>
  )
}

export default MyApp
