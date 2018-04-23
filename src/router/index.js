import Vue from 'vue'
import Router from 'vue-router'
import FeedCreator from '@/components/FeedCreator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Feed Creator',
      component: FeedCreator
    }
  ]
})
