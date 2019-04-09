<template>
	<section>
		

  <div class="list">
  	<h2 @click="$router.push({path:'/'})">回到首页</h2>
  	<div>
  		
  	  <el-form>
  	  	<!-- 题干 -->
        <el-form-item label="题干">
            <div class="question-stem pointer">
                <div v-html="Body" v-show="!bodyEditor" class="question-html" @click="showCurEditor(0)"></div>
                <Ueditor :config="editorConfig"  ref="body"  
                  :height="200" :params="{'ref': 'body'}"
                  @contentChange="contentChange" :writeMsg="Body" v-if="bodyEditor">                
                </Ueditor>
            </div>
        </el-form-item>
        <!-- 选项列表 -->
        <el-form-item v-for="(item, index) in Options" :key="index">
            <div class="question-stem pointer" :class="{'no-padding': item.showEditor}">
                <div v-html="item.value" v-show="!item.showEditor" @click="showCurEditor(1,index)" class="question-html"></div>
                <Ueditor
                	:config="editorConfig"  
                	:ref="'ue'+index" 
                    :writeMsg="item.value"
                	:height="200"  
                    :params="{'ref': 'ue'+index, 'index': index}"
                    @contentChange="contentChange"  
                 	v-if="item.showEditor">
                 
                </Ueditor>
            </div>
        </el-form-item>
        <el-form-item >
            <div class="question-stem pointer">
                <div v-html="Remark" v-show="!remarkEditor" class="question-html" @click="showCurEditor(2)"></div>
                <Ueditor :writeMsg="Remark" :height="200" :params="{'ref': 'remark'}" :config="editorConfig"
                  @contentChange="contentChange" v-if="remarkEditor" ref="remark">
                </Ueditor>
            </div>
        </el-form-item>
        <!-- <el-form-item> 
	       <el-tabs  v-model="activeName" type="card">
		        <el-tab-pane label="题干" name="first" > 
		        	<div v-show="activeName=='first'">
		        	<Ueditor :writeMsg="defaultMsg1"  :id="ueditor1" :config="config1"  ref="ue1" ></Ueditor> 
		        	</div>
                    
		        </el-tab-pane>
		        <el-tab-pane label="分析" name="second" > 
		        	<div v-show="activeName=='second'">
		        	<Ueditor :writeMsg="defaultMsg2" :id="ueditor2"  :config="config2"  ref="ue2" ></Ueditor>
		        	</div>
		        
		        </el-tab-pane>
		        <el-tab-pane label="解答" name="third" > 
		        	<div v-show="activeName=='third'">
		        	   <Ueditor :writeMsg="defaultMsg3"  :id="ueditor3" :config="config3"  ref="ue3" ></Ueditor>
		        	</div>
		        </el-tab-pane>
	        </el-tabs>	
	    </el-form-item> -->
	
        
         
      </el-form>	
       
  	</div>
  	
  	
  	
  </div><!--//list-->
  
	</section>	
</template>

<script>

	import Ueditor from '@/components/ueditor/Ueditor-item.vue';
	

	export default {
		data() {
			return {
					activeIndex:0,//步骤
          activeName:'first',
//				富文本
	        
	        bodyEditor: !1,
            // 题干
            Body: "sdgasggasg",
            // 正确选项
            answerIndex: 0,
            // 选项列表
            Options: [
                {
                    "value": "ssss",
                    "showEditor": !1
                },
                {
                    "value": "xxxxxxx",
                    "showEditor": !1
                }
            ],
            
            editorConfig: {
            	toolbars: [
                    ['undo','redo','|','bold','italic','underline','|','justifyright', 'justifycenter','justifyjustify', '|', 'link','insertcode', 'insertimage' ]
                ],
                autoHeightEnabled: false,
                autoFloatEnabled: false,//不允许滚动时固定在顶部
                //initialContent:'请输入题干内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent:false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null,
                initialFrameHeight: 200,
                BaseUrl: '',
				UEDITOR_HOME_URL: 'static/ueditor/',
				theme: 'gray',
				themePath: 'static/ueditor/themes/'
            },
            remarkEditor: !1,
            // 答案解析 editor
            Remark: "eeeeeeee",
	       
		  }
		},
		methods: {
			//点击提交按钮
			submitForm(){
				alert("题干是："+this.$refs.ue1.getUEContent());
				alert("分析是："+this.$refs.ue2.getUEContent());
				alert("解答是："+this.$refs.ue3.getUEContent())
			},
            // 增减 填空题答案；
            blankAnswerChange(type, index, answerIndex) {
                if (!type) {
                    this.Blanks[index].Answers.push({
                        text: ""
                    })
                } else {
                    this.Blanks[index].Answers.splice(answerIndex, 1)
                }
            },
            
            // 编辑器监听执行频繁，做一次去抖
            debounce(method, context) {
                clearTimeout(method.tId)
                method.tId = setTimeout(function() {
                    method.call(context)
                }, 50)
            },
            // editor blur 事件处理
            editorBlur(data) {
            	//console.log('12333',data,);
                let type = data.type || 0
                let index = data.index || 0
                setTimeout(()=>{
                    switch(type){
                        case 0:
                            console.log(this.Body);
                            let body = this.$refs.body.getUEContent();
                            let reg = /\[\u586b\u7a7a\d+\]/
                            let bodyArr = body.split(reg)
                            let str = ""
                            let len = bodyArr.length
                            bodyArr.map((e, i) => {
                                if (i === len - 1) {
                                    str += e
                                } else {
                                    str += e + `[填空${i + 1}]`
                                }
                            })
                            if ( len >= 1 ) {
                            	//this.$refs.Body.setUEContent(str)
                                this.Body = str

                            }
                            //return;
                            this.bodyEditor = false
                            break
                        case 1:
                            this.Options[index].showEditor = false
                            break
                        case 2:
                            this.remarkEditor = false
                            break
                    }
                }, 2e2)
            },
            contentChange(params){
                if("index" in params){
                    this.Options[params.index].value = this.$refs[params.ref][0].getUEContent();
                }
                if(params.ref === 'body'){
                    this.Body = this.$refs[params.ref].getUEContent();
                }
                if(params.ref === 'remark'){
                    this.Remark = this.$refs[params.ref].getUEContent();
                }
            },
            editorBlurAll(){
                if(this.bodyEditor){
                    this.bodyEditor = false
                }
                if(this.remarkEditor){
                    this.remarkEditor = false
                }
                if(this.Options.length > 0){
                    for(let n=0; n<this.Options.length;n++){
                        let opt = this.Options[n];
                        if(opt.showEditor) opt.showEditor = false;
                    }
                }
            },
            showCurEditor(type, index) {
                this.editorBlurAll();
                switch(type){
                    case 0:
                        this.bodyEditor = true           
                        break
                    case 1:
                        this.Options[index].showEditor = true
                        break
                    case 2:
                        this.remarkEditor = true
                        break
                }
            },
		},
		mounted() {
//          获取到三个的内容
				    //this.$refs.body.setUEContent("我是题干");
					// this.$refs.ue2.setUEContent("我是分析");
					// this.$refs.ue3.setUEContent("我是解答");

		},
		components: {
          Ueditor
      },
      watch:{

      },
     
	}

</script>

<style scoped>
	.input-common{
        width: 200px;
        height: 40px;
    }
    .question-stem{
        width: 80%;           
        position: relative;
    }
	.question-stem .question-html{
        border: 1px solid #c8c8c8;
        padding: 10px 10px 20px;
        min-height: 100px;
        overflow: hidden;
        word-break: break-all;
    }
    .question-stem .after{
        position: absolute;
        height: 100%;
        right: -30px;
        top: 0;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .vote-tips{
        margin-left: 60px;
    }
    .half-score{
        margin-left: 30px;
    }
</style>