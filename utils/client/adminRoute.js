/* eslint-disable react/display-name */
import { useRouter } from 'next/router'

const adminRoute = WrappedComponent => props => {
	if (window !== 'undefined') {
		const Router = useRouter()

		const token = localStorage.getItem('jwt')

		if (!token) {
			Router.replace('/')
			return null
		} else {
			const parsedToken = JSON.parse(token)
			if (parsedToken.user.role !== 'admin') {
				Router.replace('/')
				return null
			}
			return <WrappedComponent {...props} />
		}
	}

	return null
}

export default adminRoute
