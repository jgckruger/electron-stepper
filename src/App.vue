<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/command">Command</router-link> |
      <router-link to="/config">Config</router-link>
    </div>
    <router-view/>
    <div style="position: fixed; bottom: 50px; width:100%;" flex>
      <div style="display:flex;justify-content:center;align-items:flex-end;">Alunos: João Gabriel Corrêa Krüger e Luiz Otávio Oyama</div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
