<template>
  <form @submit.prevent="signIn">
    <p class="error" v-if="err">{{ err }}</p>
    <label for="username">Username</label>
    <input type="text" name="username" v-model="username">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <div>
      <input type="checkbox" name="remember me" v-model="rememberMe">
      <label for="remember me">Remember me</label>
    </div>
    <button>Sign In</button>
  </form>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      username: '',
      password: '',
      rememberMe: false,
      err: ''
    }
  },
  methods: {
    signIn: function () {
      this.err = ''
      axios({
        method: 'GET',
        url: process.env.API_PATH + '/v1/users/' + this.username + '/authorize',
        headers: {
          Password: this.password
        }
      }).then(response => {
        if (this.rememberMe) {
          Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 365 })
        } else {
          Cookies.set('refreshToken', response.data.data.refreshToken)
        }
        Cookies.set('accessToken', response.data.data.accessToken)
        Cookies.set('username', this.username)
        this.$router.push('/')
      }).catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 404)) {
          this.err = 'Incorrect username or password'
        } else {
          this.err = 'Connection error'
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
