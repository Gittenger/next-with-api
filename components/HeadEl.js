import Head from 'next/head'

export default function HeadEl(props) {
	const { title, meta } = props
	return (
		<Head>
			<title>{title}</title>
			<meta description={meta.description} content={meta.content} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}
