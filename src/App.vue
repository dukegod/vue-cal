<template>
  <div id="app">
    <CalView/>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import CalView from './components/cal/index';

console.log(CalView)

export default {
  name: 'App',
  components: {
    HelloWorld,
    CalView
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
