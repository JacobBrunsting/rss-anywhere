<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  color: #444444;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.error {
  border: solid 1px #E74C3C;
  background: #E74C3C66;
  margin: 0;
  margin-bottom: 8px;
  padding: 4px;
  border-radius: 4px;
}
</style>
