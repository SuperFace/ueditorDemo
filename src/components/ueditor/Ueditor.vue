<template>
  <div>
    <script :id="id" :defaultMsg="writeMsg" type="text/plain" ></script>
  </div>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

// //引入填空题插件
// import '../../../static/ueditor/third-party/fillblank/addFillblankbutton.js'

//引入公式插件
import '../../../static/ueditor/third-party/kityformula/addKityFormulaDialog.js'
import '../../../static/ueditor/third-party/kityformula/defaultFilterFix.js'

export default {
    name: "UEditor",
    props: {
        id: {
            default: `ueditor-${new Date().getMilliseconds()}`,
            type: String
        },
        config: {
            type: Object
        },
        writeMsg:{
        	type: String
        },
        params: {
            type: Object
        }
    },
//  components:{util},
    data() {
        return {
            editor: null,
            isinit:false,
        }
    },    
    mounted() {
        //初始化UE
        const _this = this;
        this.editor = UE.delEditor(this.id);
        this.editor = UE.getEditor(this.id,this.config);
        this.editor.addListener("ready",function(){
            setTimeout(function(){//过段时间在加载
                if(_this.writeMsg!=''){_this.editor.setContent(_this.editBase64Formula(_this.writeMsg));}
            },200)
           _this.isinit=true;
        });
        this.editor.addListener('blur', () => {
            this.$emit('blur', this.params)
        });
        this.editor.addListener("focus", () => {
            this.$emit('focus', this.params);
        });
        var contentChangeHandler = null;
        this.editor.addListener("contentChange", () => {
            if(contentChangeHandler) clearTimeout(contentChangeHandler);
            contentChangeHandler = setTimeout(()=>{
                this.$emit('contentChange', this.params);
            }, 200);
        });
    },
    destoryed() {
        this.editor.destory();
    },
    methods:{
        //公式渲染：图片公式二次编辑
		editBase64Formula: function(html){
            //依赖jQuery:
            // var $html = $('<div>'+html+'</div>');
            // var imgs = $html.find("img.kfformula");
            // if(imgs.length > 0){
            //     for(var i=0; i<imgs.length; i++){
            //         var $item = $(imgs[i]);
            //         var display = $item.attr("data-display");
            //         var slatex = $item.attr("data-slatex");
            //         $item.attr("data-latex", slatex);
            //         $item.attr("data-slatex", slatex.replace(/\\/g, "\\\\"))
            //     }
            // }
            // return $html.html();

            //js-DOM原生方式：
            var htmlBox = document.createElement("div");
            htmlBox.innerHTML = html;
            var kffImags = Array.prototype.slice.call(htmlBox.getElementsByClassName("kfformula"),0);
            if(kffImags.length > 0){
                kffImags.filter(function(item, index){
                    var slatex = item.getAttribute("data-slatex");
                    item.setAttribute("data-latex", slatex);
                    item.setAttribute("data-slatex", slatex.replace(/\\/g, "\\\\"));
                });
            }
            return htmlBox.innerHTML;

        },
        getUEContent: function(){
            return this.editor.getContent();
        },
        getContentTxt: function(){
            return this.editor.getContentTxt();
        },
        isFocus: function(){
            return this.editor.isFocus();
        },
        setHide: function(){
            this.editor.setHide();
        },
        setShow: function(){
            this.editor.setShow();
        },
        setUEContent: function(val){
            //console.log(this.isinit);
         	if(this.isinit){
             val = this.editBase64Formula(val);
             return this.editor.setContent(val);
         	}else{
                  const _this = this;
                  val = this.editBase64Formula(val);
                 setTimeout(function(){//过段时间在加载
        		  _this.setUEContent(val);
        	    },500)
         	}
        }
    }
}
</script>
<style scoped>

</style>