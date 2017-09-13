import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Tables from '../components/curriculums/Tables.vue'
import CreateTable from '../components/curriculums/CreateTable.vue'
import InsertTable from '../components/curriculums/InsertTable.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/tables/:id',
      component: Tables
    },
    {
      path: '/createtable',
      component: CreateTable
    },
    {
      path: '/insert',
      component: InsertTable
    },
    {
      path: '/*',
      redirect: '/'
    }
  ],
  mode: 'history'
})
