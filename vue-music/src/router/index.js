import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Searchs from 'components/searchs/searchs'
import Singer from 'components/singer/singer'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/rank',
      component:Rank
    },
    {
      path:'/recommend',
      component:Recommend
    },
    {
      path:'/searchs',
      component:Searchs
    },
    {
      path:'/singer',
      component:Singer
    }
  ]
})
