<template>
  <v-form ref="form" lazy-validation>
    <LoginForm>
      <template #pageTitle>ログイン</template>
      <template #btn="slotProps">
        <v-btn color="grey darken-2" @click="login(slotProps.user)" style="margin-top: 10px;">ログイン</v-btn>
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
    login (this: any, user: any) {
      this.$refs.form.validate()
      this.$auth.loginWith('local', {
        data: user
      }).then( (res: any) =>{
        console.log(res.data)
        this.msg = res.data.error
      })
    }
  }
})
</script>
