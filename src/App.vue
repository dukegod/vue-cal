<template>
  <div id="app">
    <CalView/>
    <HelloWorld :msg="date"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import CalView from './components/cal/index';

console.log(CalView)

export default {
  name: 'App',
  data() {
    return {
      date: ''
    }
  },
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
