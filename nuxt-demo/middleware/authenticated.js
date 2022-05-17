export default function ({ store, redirect }) {
	if (!store.getters['User/isLoggedIn'] && (process.browser && !(localStorage.getItem('user')))) {
		return redirect('/Login')
	}
}