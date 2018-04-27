<template>
  <div id="feed-creator">
    <h1>Feed Creator</h1>
    <form @submit.prevent="generate">
      <p class="error" v-if="err">{{ err }}</p>
      <input type="url" name="url" v-model="url">
      <button>Generate</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FeedCreator',
  data () {
    return {
      url: '',
      err: ''
    }
  },
  methods: {
    generate: function () {
      console.log(this.url)
      axios({
        method: 'GET',
        url: this.url
      }).then(response => {
        console.log(JSON.stringify(response))
      })
    }
  }
}
</script>

<style scoped>
#feed-creator {
  margin: 50px;
  font-size: 24px;
}
</style>
