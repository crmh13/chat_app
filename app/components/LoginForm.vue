<template>
  <main>
    <h1><slot name="pageTitle"></slot></h1>
      <v-text-field
        v-model="user.name"
        :rules="[rules.required]"
        type="text"
        label="UserName"
        name="name"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        label="Password"
        :type="show ? 'text' : 'password'"
        name="password"
        @click:append="show = !show"
      ></v-text-field>
      <slot name="btn" :user="user"></slot>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

type Rule = {
  required: (value: string) => string | Boolean
  min: (v: string) => string | Boolean
}

type User = {
  name: string,
  password: string
}

type Data = {
  user: User
  show: boolean
  rules: Rule
}

export default Vue.extend({
  data(): Data {
    return {
      user: {
        name: '',
        password: ''
      },
      show: false,
      rules: {
        required: (value: string) => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  created: function(this: any) {
    if (this.$auth.loggedIn) this.$router.push('/')
  }
})
</script>
