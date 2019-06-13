/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Views
import MathimaView from '@/views/MathimaView'
import GrammateiaView from '@/views/GrammateiaView'
import TeacherView from '@/views/TeacherView'
import SubjectListView from '@/views/SubjectListView'
import LoginView from '@/views/LoginView'
import InfoView from '@/views/InfoView'
import SignUpView from '@/views/SignUpView'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'Αρχική'
    },
    {
      path: '/login',
      name: 'Είσοδος',
      component: LoginView,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/info',
      name: 'Πληροφορίες',
      component: InfoView
    },
    {
      path: '/grammateia',
      name: 'Γραμματεία',
      component: GrammateiaView,
      meta: {
        requiresUnAuth: true,
        userType: 'γραμματέας'
      }
    },
    {
      path: '/mathima',
      name: 'Μάθημα',
      component: MathimaView,
      meta: { requiresAuth: true, userType: 'καθηγητής' }
    },
    {
      path: '/teacherView',
      name: 'Οθόνη Καθηγητή',
      component: TeacherView,
      meta: {
        requiresAuth: true,
        userType: 'καθηγητής'
      }
    },
    {
      path: '/subjectList',
      name: 'Λίστα μαθημάτων',
      component: SubjectListView,
      meta: {
        requiresAuth: true,
        userType: 'καθηγητής'
      }
    },
    {
      path: '/register',
      name: 'Εγγραφή',
      component: SignUpView,
      meta: {
        requiresAuth: true,
        userType: 'γραμματέας'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && to.matched.some(record => record.meta.userType === store.getters.user.userType)) {
      next()
    } else {
      next('/')
    }
  } else if (to.matched.some(record => record.meta.requiresUnAuth)) {
    if (store.getters.isLoggedIn) {
      next(from.path)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
