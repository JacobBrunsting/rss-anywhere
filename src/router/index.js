import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import FeedCreatorPage from '@/components/FeedCreatorPage'
import SignUpPage from '@/components/SignUpPage'
import SignInPage from '@/components/SignInPage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Feed Creator',
      component: FeedCreatorPage
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUpPage
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: SignInPage
    }
  ]
})

function isAuthenticated () {
  return Cookies.get('refreshToken') && Cookies.get('accessToken') && Cookies.get('username')
}

let authProtected = ['']
let redirectHome = ['sign-up', 'sign-in']

router.beforeEach((to, from, next) => {
  let path = to.path.split('/')[1]
  if (isAuthenticated()) {
    if (redirectHome.includes(path)) {
      next({ path: '' })
    } else {
      next()
    }
  } else if (authProtected.includes(path)) {
    next({ path: '/sign-in' })
  } else {
    next()
  }
})

export default router
