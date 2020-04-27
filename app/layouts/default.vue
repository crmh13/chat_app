<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none" />
        
      <v-spacer />
      <v-btn color="grey darken-2" to="/login" style="margin-right: 5px;">ログイン</v-btn>
      <v-btn color="grey darken-2" to="/sign_in">新規登録</v-btn>

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script lang="ts">
export default {
  data () {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'チャットアプリ'
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.drawer = window.innerWidth < 1264 ? false: true
    })
  }
}
</script>