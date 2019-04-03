<template>
	<section>
		

  <div class="list">
  	<h2 @click="$router.push({path:'/'})">回到首页</h2>
  	<div class="" v-if="activeIndex==0">
           <p>在这里故意写了两个页面，这样是为了演示在你在切回前一个没有编辑器的页面再回来的时候，你刚才编辑的内容是否还在</p>
                    <p> 第一页:</p>
         	    <el-button @click="activeIndex=1">下一步</el-button>

  		
  		
  		
  	</div>
  	<div  v-show="activeIndex==1">
  		<div>
  	  <el-form>
        <el-form-item> 
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
	     </el-form-item>
	
         <el-form-item class="text-center">
         	  <el-button  @click="activeIndex=0">上一步</el-button>
              <el-button  @click="submitForm()">提交</el-button>
         </el-form-item>
         
      </el-form>	
       </div>
  	</div>
  	<div  v-if="activeIndex==2">
  		<div class="text-center">
	  	  	<div class="success"><i class="el-icon-success" ></i><p>上传成功</p></div> 
	  	  	<el-button type="primary" class="finishbtn" @click="finishbtn">完成</el-button>
  		</div>
  	</div>
  	
  	
  </div><!--//list-->
  
	</section>	
</template>

<script>

	import Ueditor from '@/components/ueditor/Ueditor.vue';
	

	export default {
		data() {
			return {
				activeIndex:0,//步骤
                activeName:'first',
//				富文本
	        defaultMsg1:'',
	        defaultMsg2:'',
	        defaultMsg3:'',
	        ueditor1:'ueditor1',
	        ueditor2:'ueditor2',
	        ueditor3:'ueditor3',
	        config1: {
	          autoHeightEnabled: false,
              autoFloatEnabled: false,//不允许滚动时固定在顶部
              initialContent:'请输入题干内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
              autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
              initialFrameWidth: null,
              initialFrameHeight: 250,
              BaseUrl: '',
              UEDITOR_HOME_URL: 'static/ueditor/'
	        },
	         config2: {
	          autoHeightEnabled: false,
              autoFloatEnabled: false,//不允许滚动时固定在顶部
              initialContent:'请输入分析内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
              autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
              initialFrameWidth: null,
              initialFrameHeight: 250,
              BaseUrl: '',
              UEDITOR_HOME_URL: 'static/ueditor/'
	        },
	         config3: {
	          autoHeightEnabled: false,
              autoFloatEnabled: false,//不允许滚动时固定在顶部
              initialContent:'请输入解答内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
              autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
              initialFrameWidth: null,
              initialFrameHeight: 250,
              BaseUrl: '',
              UEDITOR_HOME_URL: 'static/ueditor/'
	        },
	       
			}
		},
		methods: {
			//点击提交按钮
			submitForm(){
				alert("题干是："+this.$refs.ue1.getUEContent());
				alert("分析是："+this.$refs.ue2.getUEContent());
				alert("解答是："+this.$refs.ue3.getUEContent())
			},

		},
		mounted() {

		},
		components: {
          Ueditor
      },
      watch:{

      },
     
	}

</script>

<style scoped>

</style>