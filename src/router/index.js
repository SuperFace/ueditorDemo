import Vue from 'vue'
import Router from 'vue-router'

import hello from '@/views/hello'
import add from '@/views/Test'
import edit from '@/views/Testedit'
Vue.use(Router)

export default new Router({
  routes: [
   {
    	name:'首页',
      path: '/',
      name: 'hello',
      component: hello
    },
    {
    	name:'新增页面',
      path: '/test',
      name: 'test',
      component: add
    },
    {
    	name:'编辑页面',
      path: '/edit',
      name: 'testedit',
      component: edit
    }
  ]
})
