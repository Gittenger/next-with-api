import HeadEl from '../components/HeadEl'
import styles from '../styles/index.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			<HeadEl
				title="My App"
				meta={{ description: 'My page description', content: 'content of page' }}
			/>

			<main className={styles.main}>Main Content</main>
		</div>
	)
}
