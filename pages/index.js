import HeadEl from '../components/HeadEl'
import Link from 'next/link'
import styles from '../styles/index.module.scss'

export default function Home() {
	return (
		<div className={styles.container}>
			<HeadEl
				title="My App"
				meta={{
					description: 'My page description',
					content: 'content of page',
				}}
			/>

			<main className={styles.main}>
				<ul className={styles.links}>
					<Link href="/login">
						<a>Login</a>
					</Link>
					<Link href="/gallery">
						<a>Gallery</a>
					</Link>
				</ul>
			</main>
		</div>
	)
}
