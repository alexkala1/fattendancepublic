<template>
  <v-navigation-drawer
   :clipped="clipped" v-model="drawerVisible" temporary disable-resize-watcher app>
    <v-list v-if="!isLoggedIn">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in unAuthorizedItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-if="isLoggedIn && userType === 'καθηγητής'">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in teacherItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-if="isLoggedIn && userType === 'γραμματέας'">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in secretaryItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-if="isLoggedIn && userType === 'σπουδαστής'">
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in studentItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider/>

    <v-list>
      <v-list-tile :to="item.route" value="true" v-for="(item, i) in additionalItems" :key="i">
        <v-list-tile-action >
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    userType: function () {
      return this.$store.getters.user.userType
    },
    drawerVisible: {
      get: function () {
        return this.$store.getters.navigationDrawerVisible
      },
      set: function (value) {
        if (value !== this.$store.getters.navigationDrawerVisible) this.$store.dispatch('toggleNavigationDrawer')
      }
    }
  },
  data () {
    return {
      clipped: true,
      fixed: false,
      teacherItems: [
        {
          icon: 'mdi-pencil-box',
          title: 'Εγγραφή σε μάθημα',
          route: '/addCourse'
        },
        {
          icon: 'mdi-library-books',
          title: 'Παρουσία',
          route: '/mathima'
        }
      ],
      secretaryItems: [
        {
          icon: 'mdi-account-plus',
          title: 'Εγγραφή',
          route: '/register'
        },
        {
          icon: 'mdi-account-key',
          title: 'Μοντελοποίηση χρήστη',
          route: '/model'
        },
        {
          icon: 'mdi-account-network',
          title: 'Καθηγητές Τμήματος',
          route: '/grammateiaTeachers'
        }],
      unAuthorizedItems: [
        {
          icon: 'mdi-home',
          title: 'Αρχική',
          route: '/home'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Επόμενο Μάθημα',
        //   route: '/'
        // },
        {
          icon: 'mdi-login',
          title: 'Είσοδος',
          route: '/login'
        }
      ],
      studentItems: [
        {
          icon: 'mdi-library-books',
          title: 'Εγγραφή σε μάθημα καθηγητή',
          route: '/addCourse'
        }
      ],
      additionalItems: [
        {
          icon: 'mdi-home',
          title: 'Αρχική',
          route: '/'
        },
        {
          icon: 'mdi-newspaper',
          title: 'Πληροφορίες',
          route: '/info'
        },

        {
          icon: 'mdi-chat-alert',
          title: 'Ανακοινώσεις',
          route: '/announcements'
        }

      ]
    }
  },
  methods: {
    toggleNavigationDrawer () {
      this.$store.dispatch('toggleNavigationDrawer')
    }
  }
}
</script>
