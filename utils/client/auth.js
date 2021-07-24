export const auth = {
  setAuthToken: function (data, next) {
    if (window !== undefined) {
      localStorage.setItem('jwt', JSON.stringify(data))
    }
    next()
  },
  checkAuthToken: function () {
    return typeof window == undefined
      ? false
      : localStorage.getItem('jwt')
      ? JSON.parse(localStorage.getItem('jwt'))
      : false
  },
}
