import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ContractContextProvider } from 'context/ContractContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContractContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </ContractContextProvider>

    </>
  )
}

export default MyApp
