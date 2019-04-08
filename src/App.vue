<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
		data() {
			return {
			}
		},
		methods: {
			
    },
		mounted() {

		},
		components: {

    },
    watch:{

    },
    created(){

    }
     
	}
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
.el-form-item__content {
    line-height:1;
}
.MathJax {
  outline: 0;
}
.latex-box:after{
  display:block;
  content:'';
  zoom:-1;
  clear:both;
}
</style>
