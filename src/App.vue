<template>
  <div id="app">
    <div class="latex-box" v-html="latexData"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
		data() {
			return {
        latexData: ''
			}
		},
		methods: {
			
      getData: function(){
        var html = '<p>EGEgawegWEEGEgawegWEEGEgawegWEEGEgawegWEEGEgawegWEEGEgawegWE<img class="kfformula" style="vertical-align: middle;" src="data:image/png;base64,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" data-display="block" data-latex="x=\\frac {-b\\pm \\sqrt {{b}^{2}-4ac}} {2a}"/><img class="kfformula" style="vertical-align: middle;" src="data:image/png;base64,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" data-display="inline-block" data-latex="x=\\frac {-b\\pm \\sqrt {{b}^{2}-4ac}} {2a}"/>'
                +'EGEgawegWEEGEgawegWEEGEgawegWEEGEgawegWE<img class="kfformula" style="vertical-align: middle;" src="data:image/png;base64,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" data-display="inline-block" data-latex="x=\\frac {-b\\pm \\sqrt {{b}^{2}-4ac}} {2a}"/></p>';
        
        this.changeBase64ToLatex(html, $(".latex-box")[0], (dom)=>{
          this.latexData = dom;
        });
      },
      changeBase64ToLatex: function(html, doc, fn){
        var $html = $(html);
        var imgs = $html.find("img.kfformula");
        $.each(imgs, function(i, item){
            var $item = $html.find("img.kfformula").eq(i);
            var display = $item.attr("data-display");
            var latex = $item.attr("data-latex");
            latex = display == "block" ? '$$' + latex + '$$' : '$' + latex + '$';
            $('<span class="kfformula-latex" style="position:relative;display:'+display+';padding:10px;">'+latex+'</span>').insertAfter($item);
        });
        $html.find("img.kfformula").remove();
        var outerhtml = $html[0].outerHTML;
        if(fn && typeof fn == "function"){
          fn(outerhtml);
          this.$nextTick(()=>{
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, doc || window.document.body]);
          });
        }
      }
    },
		mounted() {

		},
		components: {

    },
    watch:{

    },
    created(){
      this.getData();
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
</style>
