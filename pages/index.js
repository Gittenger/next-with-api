import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Testing App</title>
				<meta name="description" content="My Next App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>Main Content</main>
		</div>
	)
}
