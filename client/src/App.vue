<template>
  <div id="app">
    <nav><router-link to="/">Home</router-link></nav>
    <router-view />
  </div>
</template>

<script></script>

<style>
body {
  background-color: rgb(237, 241, 243);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px 7vw;
}

nav {
  padding: px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
