export const auth = {
  setAuthToken: function (data, next) {
    if (window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data))
    }
    next()
  },
  checkAuthToken: function () {
    return typeof window == 'undefined'
      ? false
      : localStorage.getItem('jwt')
      ? JSON.parse(localStorage.getItem('jwt'))
      : false
  },
}

export const isAdmin = () => {
  if (typeof window !== 'undefined') {
    return auth.checkAuthToken()
      ? auth.checkAuthToken().user.role === 'admin'
        ? true
        : false
      : false
  }
}

export default auth
