import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JR Web3 Boilerplate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 10,
        display: "inline-grid", // "flex"
        alignItems: "right",
        justifyContent: "right"
      }}
      >
        <ConnectButton />
      </div>
      <footer className={styles.footer}>
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>

      </footer>
    </div>

  )
}
