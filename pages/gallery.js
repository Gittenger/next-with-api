import { useEffect, useState } from 'react'
import Carousel from 'react-gallery-carousel'
import HeadEl from '../components/HeadEl'
import Link from 'next/link'
import styles from '../styles/gallery.module.scss'
import 'react-gallery-carousel/dist/index.css'
import adminRoute from '../utils/client/adminRoute'

function Gallery() {
	const [images, setImages] = useState([])

	useEffect(() => {
		fetch(`http://localhost:3000/api/images`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(({ images }) => {
				setImages(
					images.map(el => ({ src: `http://localhost:3000/img/${el.name}` }))
				)
			})
			.catch(err => console.log(err))

		console.log(images)
	}, [])

	return (
		<div>
			<HeadEl
				title="Gallery page"
				meta={{
					description: 'Gallery description',
					content: 'Gallery content',
				}}
			/>
			<Carousel images={images} style={{ height: 800, width: 500 }} />
			<h1 className={styles.heading}>Gallery page</h1>
		</div>
	)
}

export default adminRoute(Gallery)
