<template>
  <v-form ref="form" lazy-validation>
    <LoginForm>
      <template #pageTitle>新規登録</template>
      <template #btn="slotProps">
        <v-btn color="grey darken-2" @click="signIn(slotProps.user)" style="margin-top: 10px;">新規登録</v-btn>
      </template>
    </LoginForm>
    <p style="color: #dd2c00; font-weight: bold; margin-top: 5px;">{{ msg }}</p>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginForm from '~/components/LoginForm.vue'

export default Vue.extend({
  components: {
    LoginForm
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    signIn (this: any, user: any) {
      this.$refs.form.validate()
      this.$axios.post('/api/auth/register', user)
        .then((res: any) => {
          if (res.data.error) {
            this.msg = res.data.error
            return
          }
          this.$auth.loginWith('local', {
            data: user
          })
        }
      )
    }
  }
})
</script>
