<template>
  <form @submit.prevent="signUp">
    <p class="error" v-if="usernameErr || emailErr || passwordErr || generalErr">
      {{ usernameErr || emailErr || passwordErr || generalErr }}
    </p>
    <label for="username">Username</label>
    <input type="text" name="username" v-model="username" @blur="validateUsername">
    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" @blur="validateEmail">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" @blur="validatePassword">
    <button>Sign Up</button>
  </form>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      generalErr: '',
      usernameErr: '',
      emailErr: '',
      passwordErr: ''
    }
  },
  methods: {
    validateUsername: function () {
      if (this.username === '') {
        this.usernameErr = 'Username required'
        return
      }
      this.usernameErr = ''
      axios({
        method: 'GET',
        url: process.env.API_PATH + '/v1/users/exists?username=' + this.username
      }).then(result => {
        if (result.data.data.exists) {
          this.usernameErr = 'Username taken'
        }
      }).catch(() => {
        this.usernameErr = 'Connection error'
      })
    },
    validateEmail: function () {
      if (this.email.length < 3) {
        this.emailErr = 'Email required'
      } else {
        this.emailErr = ''
      }
    },
    validatePassword: function () {
      if (this.password.length < 8) {
        this.passwordErr = 'Minimum password length is 8'
      } else {
        this.passwordErr = ''
      }
    },
    signUp: function () {
      this.generalErr = ''
      this.validateUsername()
      this.validateEmail()
      this.validatePassword()
      if (this.usernameErr || this.emailErr || this.passwordErr) {
        return
      }

      axios({
        method: 'POST',
        url: process.env.API_PATH + '/v1/users',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      }).then(() => {
        this.signIn()
      }).catch(err => {
        console.log(err)
        this.generalErr = 'Error creating user'
      })
    },
    signIn: function () {
      this.generalErr = ''
      axios({
        method: 'GET',
        url: process.env.API_PATH + '/v1/users/' + this.username + '/authorize',
        headers: {
          Password: this.password
        }
      }).then(response => {
        Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 365 })
        Cookies.set('accessToken', response.data.data.accessToken)
        Cookies.set('username', this.username)
        this.$router.push('/')
      }).catch(() => {
        this.$router.push('/sign-in')
      })
    }
  }
}
</script>

<style scoped>
</style>
