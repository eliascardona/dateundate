import Head from "next/head"
import { Router } from "next/router"
import Script from "next/script"
import { useEffect, useState } from "react"
import { Loader } from "../components/Loader"
import { AuthProvider } from "../contexts/AuthContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const finish = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
        
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", finish)
    Router.events.on("routeChangeError", finish)

    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", finish)
      Router.events.off("routeChangeError", finish)
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>DATE UN DATE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />        
      </Head>
      <Script type="module" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js" />
      <AuthProvider>
        <>
        {
          loading ? (
            <Loader />
          ) : (
            <Component {...pageProps} />
          )
        }
        </>  
      </AuthProvider>
    </>
  )
}

export default MyApp