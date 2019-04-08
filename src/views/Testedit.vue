<template>
	<section>
		

  <div class="list">
		<div class="latex-box" style="position:relative;text-align:left;" v-html="latexData"></div>
  	<h2 @click="$router.push({path:'/'})">回到首页</h2>
  	<div class="" v-if="activeIndex==0">

  			      第一页:

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
				  latexData: '',//转换公式代码后富文本
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
							maximumWords:10000,//允许的最大字符数
              BaseUrl: '',
							UEDITOR_HOME_URL: 'static/ueditor/',
							theme: 'gray',
							themePath: 'static/ueditor/themes/'
	        },
	        config2: {
	          	autoHeightEnabled: false,
              autoFloatEnabled: false,//不允许滚动时固定在顶部
              initialContent:'请输入分析内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
              autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
              initialFrameWidth: null,
							initialFrameHeight: 250,
							maximumWords:10000,//允许的最大字符数
              BaseUrl: '',
							UEDITOR_HOME_URL: 'static/ueditor/',
							theme: 'gray',
							themePath: 'static/ueditor/themes/'
	        },
	        config3: {
	          	autoHeightEnabled: false,
              autoFloatEnabled: false,//不允许滚动时固定在顶部
              initialContent:'请输入解答内容...',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
              autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
              initialFrameWidth: null,
							initialFrameHeight: 250,
							maximumWords:10000,//允许的最大字符数
              BaseUrl: '',
							UEDITOR_HOME_URL: 'static/ueditor/',
							theme: 'gray',
							themePath: 'static/ueditor/themes/'
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
			//公式渲染：加载包含图片公式的富文本数据
			getData: function(){
        var html = '<p>'
                +'egageaegawe<img class="kfformula" style="vertical-align: middle;" src="data:image/png;base64,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" data-display="inline-block" data-slatex="x=\\frac {-b\\pm \\sqrt {{b}^{2}-4ac}} {2a}" data-latex="x=\frac {-b\pm \sqrt {{b}^{2}-4ac}} {2a}"/>egaeggawegag</p><p>'
                +'<img class="kfformula" style="vertical-align: middle; display: block; margin: 0px auto; float: left;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAABTCAYAAACrpHOpAAASAklEQVR4Xu3dBbDsynUF0O0wp8Kc2GEGhzmOw8zM6DAzxw4zMzMzM6PDzMxMDie1fqlTikoa6Y6kgXvPqXr13/sjtbq3uncfbN0rJYVAIVAI7IjAvXZsu5ouBAqBQiBFMjUJCoFCYFcEimR2hbcaLwQKgSKZmgOFQCGwKwJFMrvCW40XAoVAkUzNgUKgENgVgSKZXeGtxguBQqBIpuZAIVAI7IpAkcyu8FbjhUAhUCRTc6AQKAR2RaBIZld4q/FCoBAokqk5UAgUArsiUCSzK7zVeCFQCBTJ1BwoBAqBXREoktkV3mq8ECgEimRqDvQReJQk90nyi0nuneR5kvxpkh9K8t8FVSFwDAJFMsegdnvvebEk35Xk3ZO8Z5LfS3LfJD+c5EWT/MftHXqNbC8EimT2QvY6220k8/VJXifJQ5I8d5IfT/KGSb7wOodVvT4nAkUy50T/8p7dSOb5k/xor3u/0Gk473J5Xa4eXToCRTKX/oZO279GMsN58WVJ/jnJm522O/W024BAkcxteIvbjaFIZjssq6UOgSKZmgp9BIpkaj5sjkCRzOaQXnWDRTJX/fous/NFMpf5Xs7VqyKZcyF/i59bJHOLX+6FD+3Zkjxykj9J8jtH9lXy4LN29/5s55w+sqm6bS8EimT2QrbaPYQAgvnpJA+V5IWT/OCRcD1skl9J8pRJPibJux7ZTt22IwJFMjuCW02PImDOKVOQi/PNSV5+JU6vlUSIXTbyMyb5jZXt1e0bI1AkszGg1dwsAq+X5Iu6WqhnSfJLs3ccvsAcfnAS2tG3JnnZle3V7RsjUCSzMaALmnusJC/RFSD+dpJvTPKvC+67DZc8dBJjfrIkX5Pk1TYa1Ksm+equrRfsaq02arqaWYvAuUjmfkk+J8n7JvnStYO4oPvV+zwoyZsk+f6Rfj1ft7h+P8kfJnnxJH/TFR8qRtxbFDm+0A4P+fskH7eg3VdMoi6KvEySb1twz5JL+Gb+KMnjJvnKJK+55KaF1zxFkjdK8n4Lr7+0y87e/3ORDEcf+/lJk/zTpb2VFf0R7fiDzgQYLuaHT/LLSb43yVt0z3i4JD+S5M828E0s6fardCTn2n9J8urdf5fc26555iTP0NPG2v93LMRPzDT0Hd19f9xpM/81cv0zddEmeMHw3zvN5B9m2v6ozvH7n13bolZbyFRYf4u2T9HG2ft/DpKxm35Pkg9N8j6nQPnEz/iQJO+d5P4dobTHWzA/kIQ282O9Pr1NkgcmecwT9fOzk7xp96wvT/LaK577HEneK8krJ/mqGQ3iqZL8ehJz7sM6jIaPfpjOgftBSd4+ya8lec4kf57kRZL81oG+Pm2SX+1+/+AkH7BiXP1bz75IV47j7P0/B8nQYp6r221Mntsmj5eEOfSTA9OEr+CNuyLD/gFQ79GZV09zIiAeIYmqaoueMAW+YOWzaR98LDYQZsuYvHMXZvbbkGjb9Y1kaIOOmKDhPU6Sn+oImxl6SH6zC2f/fC9/ZuXQMrZIrRvaHO1KX9cIc+YfkzA54cJnRyNkTm8he/d/to+nJpmmxXxWz2SY7eQVXvCZSd58RJsZDoUPwYL/1CR231OJBSJPBeEwm/x7rU+IM9eZM1PjEK4W+WEeP0YSZs1QGsnQcGm6TT6xC3k/+wxA5pVK8f/pyOmvNwB0uEg5r2mD/Ioc+GtD5g4Eo4HZhJAN8mcq8u993RX0f7aLpyYZ6jmn3NRONtvhK7nA+PhaDpkjbfe3Y73UGU6de8skn97h+XOd5sD/sUZeYCKyY2FycD9akm9P8tITD2kkwzRiWjbR13frtJRD/XvdJF/cXSDi9LVrBtPd2ycZi/8rktA+XrLLVl77CCRjvsDOGT6IXzBEJvOTr208+X+a2B79n+3iqUmG+iuVfGonm+3wlVwg2vG33c70BCN9puV8fBI7r6Mu1y7uY2GxCPlTyCckecdjG5q5r52u5zLm4UfuRDJP1DPXPqnz66wdUiMZBPkNSTjrJRB6v1sIkqFN0oqaNAe9Z9Ju1sje/Z/t2ylJhkou8WpsJxPOdIA1WxroQ7Fz2O29jM/v1OGpwUlVByzfgJTztcLHwgwQDfN3RMmBKaHskN3cIilP33NI2qkRi0kkKe2b1nZu5f2P2mH0xF07zBkJbVsL5/Ynd40yM8bC+35eq8low3tHNo4Mfd4NBtIWKfOSo/v9O0f9Bk3f04T57lxlzu4m/HOc3k/SI00mGoKbEv6qMRN07/7P4nBKknmDzsEokuJF9YVqKOJiR5e52S+Yo+JxhMkOFRX53JlRPWJHRp+R5AGzCBy+gF2M1GgmhEOXI/KRuh3mrXvq+bAl+TJ8C6/fu8ZCkysiP8YkugThhGfaWeB/l+TpOiLdsm8WUHvn2p8a+xYkgwz4bswhm1OTYzeytkiZMP7wk9D+vuUAQNaVd0zjQeDGxXeD+ETh+rKUZN62a2fqsTS3sZSAY/q/5bu/J5x4KlG8JpcBWJ8y8tDmIxCVYZ+2k/Gp8cKZNAdENSdbkYzaGpEwTkTmjUn1F10Ill/p87rUeLvOWETl7ZJwWDoX92OTyC/h+4DD2ASlHZ1L+DuaCWPSC7cb91bCsf1WXWOPnWTKIbsFydDE+Hw4mGlqTY7dyNoipSHDRMieyccEHHtnj95pg/wshLkjCvWE3dyRviE/qZlbS0nm2Hdx0/4f+5zJ+05JMh/R+R8sUFmZY2KnkLfhWp/koL6LSvC+y5dwzuycbEUyrS9TORdyPfTRH/0dinFy/LaxIFe7zZRwjlJ5x3w4U/dIpW+5IXO4zP3+3V00zHUyseX7bCV2byUEdlpa4ZYENuwjzZN5S8yFfsnGMRvZMLpkzfBl0cgQjdBzX7gDOIXhiZAcQWHcSIbJgwD7/qJTkUxb63P93+qd/187pyQZ2gvz4pDdb+eh7grjmSjK9zmKqfSyZZfIViTDJLLryk4dU0NfrvOpKI8YO2Cbek5jsYvzSSyRpuovudY1rzGifi+9d3idsfqo2+N3Ghp/Bq1yC5HlzBfzV525uUWbU218dKc9+r3v02jX33QjG8sz4ZCVuyMv5xV6H75rvpS/TCJ6OMwDk3Apr8a6kx2ObE9NMnCY6v8u7+WUJMMXY4fs+yjGBsWs4IMRyiOHksXs/kNnGHIwmS1+JktfvNRjihEtQF9UZF+bHNR6GabUZhGHVxoZiHH6TtGYD2rqZVrgh5x7w/uMkzN8K2GmMhHNCyYgp/Xa6Ia+IVukq682jT3l03q+uDHTbIuNbKr/TCpEAj9EMyZtIxkjwD1xOVvbpyQZfhX+leajODToL+mSkTjvaDVTn0ht2sRSAEWbRLmWiuRB5pDdbAqrKZIxTrsqomuRlaXPPed1zWGtD1tpSn0TBslsSYxDrGQei96JtCDsMdPsJhvZse+CWWhjQiaikv7tj3nB1BLg4KO79XJKkmGTs81V60oxnxL5AqpzEQuNQQ3KVBYplXRoirhHFIqvYnjimqK5pZm1Igh8R3Zyu6OQtN2dE88E5iP6zgOajDyYd+gm/BaZm6eajKJ5dmHhdcltWwinMucykaqwNrv4UJ8ciEUjk2pwyL+1dCO76fhpSjRcwQIZ3VNSJHNTZBdczxTw8Xa2LB/LmJgU2J3NSItQUyMMqdhwKrdi2M5WPhkLTdKgvv7MSGdFCJDQlCbT1GLjXlqjZZez8y0VGsLWu6HFhwgci7nVt6/70St4mgN7iYjPU3flGtIexuQmG9lN+slU5/hVIvB9SZSXCNcjPOkZNidHXfBPFcncBNkbXMtcMQEUgQ298vwrPPJSypuJIflJqjXfgxCkEPKcbEEy+miyHiq0k17OnBgjGWFMafQm2E3Ms3M6fuGqetwOfN8NM1q12z9i4pBPjk+DpikKc4y2w48n14c2JgKktGAoW2xkU3OwRRA9m+Y+ZqoJYPB1FcnMreQjfz9kQphcDgYanvtK9fzwLitS1u+Uf6Z1aQuSoU2IAvAd2NX75MbEFJrku/D3MZJhaploN03Vp8Eh26UiF2QrbcOC5CxnBoqabCk2FZohvKaicZ43lSeztC82KBoE4QMcpgxstZFN9adFrrz/djhX/9qW9e7/Fcksfas3vM6ClfnIV8IEasKxyufBrKDi9j3zdjdp18wnJGRxH5ItSEb7zbaXpSlKpFpaiNJObydS5yP7eIxkJFxJaKMR/e4NMTrH5TRGi5MjvV+YuGVf5IvQRoeZuP1nrCWZD+ydI8NfNzw/eKuNbAoXBCrXaezLCarUzQtFj8i2SGbL2TVoqx2aJPWbr4PPgl+Bk0wSE0IZiloUi5wZgpwOLQQqs3wPJ9gPyxduMixqNRKhPTWRpYkgkZ2/q10akoxxMXsO7dg36cfe1wrLIwBO6j2PQpX1/E7dYCy4sXNYpkjGwvRe52rRzAvkbpMS0embK1tuZFPvRCmBzVKahLIWAQwRLo5oLgD+Gr8pVymS2XFmN21GqNHnLC5dTHBhdM475DVnrsnyZXpcgxYjnMwJS7Xnj1krFtJUVrNM11Z8OVWDNkYyjipFUCJdCH1KjEW5An/M8IiNrTeyQzgZm2haO+kQ0dkgRVZliXMGu6ZIZu1sm7mfNiPJzuK9BnNiKRwIlD9D1GcsC3hpO6e4jhlqZxWSFylbm+pPg5DNzYc2Jvwh3jV/l0ihCMtQhiQjR0l7smqZr4eEmUJ7JMOjT0+BZ/8ZCI//RXRS1vRWx0KcehybPO+UeTL9DlOXhWvlYoyZR5sM7gyNtMpbNrmK7UsWTul2WNK/reyoXVnpgFKEQ9XltCU1UQjNVx+Hn6dtJIOAEBbthblKE5gTUUjPF71xLEfJhSBwLpK5kOHf2W44a5gTFDlIDzhGaEIq1dWYaY9/TWTqkDgmgx+LSYNslJn0pZFMO7vFBrQkotiP2qj2bif+HTOuumdjBIpkNgb0CpqjbfGNCPHetIIbOUiOpCmoRaKRNpk6wmMISTv2QSRRW/3K+kYyNBd+C+kMEjKnTLDWdjvbVzErX9ieZQtX8Iovq4tFMpf1PvbujaJOWsLWRYpydUQHJcLNiZwZfiv+imFKQt9c4rfh55GgSVsSLRwTpMJEcu9c8e1c3+r3HRAoktkB1AtuUriaL2RrkRSIvJZKy4zldKbNNJNtLLokH8mXC5hmQu1DaZnX8pn4mNY6sJeOoa5biECRzEKg6rJNERBpYjbJcJab0846nsqTocUgEEmD/URN2pAKd/4hFe8P3rSX1dgmCBTJbALjxTciS9nXF1vK/R4ddnaLtH7akoOYLPjSKvZA+sraLJK5shd2ZHfHTl87sqnR25yPIttWwqKwtDwVOSt7fWJly75XWzsjUCSzM8AX0vyeJMNU4ciVQs/XQvhZ+E+c9eMA+JI7jECRzN14+WMko7ZHREjB6ppkPGezKEsQNXpID06fQaHRqNspucMIFMncjZc/JBkHR8mVUUeztmZJPY5T+1XJ90X4WRhaYeO5vpB5N97uhY+ySObCX9BG3euTjGpkZ93IUVFaQBwZ6aCqKRFqHgsfu759/G54VKdQOTNqquJ6o6FVM5eOQJHMpb+hbfrXSMb5KkjB94f6xzpIy28fqh97ourzqQ/rISzVzyJYfXFUhjOVx8512WZU1cpVIFAkcxWvaXUnkYzzZy14eSZqlpaeOzz3cHVCjjVwFGlfRJyc/8L3s+TY1Lnn1O9XikCRzJW+uBt2G8k4zc+xkL7+4NMcfCj9ozvn5sJUzovvfTs/Z2hu+ea3c12UMMydwXPD4dTl14TA3MS6prFUX6cRQDJqgBxPKaIkUc4H1x7Q3aJ6+tDXIqXsO0ZhTGgszDBnA/WPbnBkKTLz2eGSO4xAkczdePnD6JJokGNEVWI7JlKavxT/KfEpj0NfkhTCZhY56dBnbxQqSvf3WZWtPnV7N97ULRxlkcwtfKkjQxrLk+H8dVQms8nva8Th7QoVHbHJBFON7dhMRzWU3HEEimTu+ATYePi+E+48XXVSJYXAPQgUydREKAQKgV0RKJLZFd5qvBAoBIpkag4UAoXArggUyewKbzVeCBQCRTI1BwqBQmBXBIpkdoW3Gi8ECoEimZoDhUAhsCsCRTK7wluNFwKFQJFMzYFCoBDYFYEimV3hrcYLgUKgSKbmQCFQCOyKQJHMrvBW44VAIfC/hWqdgeNCt6IAAAAASUVORK5CYII=" data-display="block" data-slatex="\\left ( {x+a} \\right )^{2}=\\sum ^{n}_{k=0} {\\left ( {^{n}_{k}} \\right ){x}^{k}{a}^{n-k}}" data-latex="\left ( {x+a} \right )^{2}=\sum ^{n}_{k=0} {\left ( {^{n}_{k}} \right ){x}^{k}{a}^{n-k}}"/>'
                +'</p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p>'
                    +'<img class="kfformula" style="vertical-align: middle;display:block;margin:0 auto;" src="data:image/png;base64,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" data-display="block" data-slatex="x=\\frac {-b\\pm \\sqrt {{b}^{2}-4ac}} {2a}" data-latex="x=\frac {-b\pm \sqrt {{b}^{2}-4ac}} {2a}"/>'
								+'</p><p>awegawegaewg?<br/></p>';

				this.editBase64Formula(html, (dom)=>{
          this.defaultMsg1 = dom;
        });
        this.changeBase64ToLatex(html, $(".latex-box")[0], (dom)=>{
          this.latexData = dom;
        });
			},
			//公式渲染：图片公式二次编辑
			editBase64Formula: function(html, fn){
					var $html = $('<div>'+html+'</div>');
					var imgs = $html.find("img.kfformula");
					if(imgs.length > 0){
						for(var i=0; i<imgs.length; i++){
							var $item = $(imgs[i]);
							var display = $item.attr("data-display");
							var slatex = $item.attr("data-slatex");
							$item.attr("data-latex", slatex);
							$item.attr("data-slatex", slatex.replace(/\\/g, "\\\\"))
						}
					}
					var outerhtml = $html.html();
					if(fn && typeof fn == "function"){
						fn(outerhtml);
					}
			},
			//公式渲染：图片公式转化为公式代码渲染
      changeBase64ToLatex: function(html, doc, fn){
        var $html = $('<div>'+html+'</div>');
        var imgs = $html.find("img.kfformula");
        if(imgs.length > 0){
          for(var i=0; i<imgs.length; i++){
             var $item = $(imgs[i]);
             var display = $item.attr("data-display");
						 var latex = $item.attr("data-slatex");
						 latex = display === 'block' ? '$$' + latex + '$$' : '$' + latex + '$';
             var _style = $item.attr("style");
             $item.replaceWith('<span class="kfformula-latex" style="position:relative;display:'+display+';padding:0 10px;' + _style + '">'+latex+'</span>');
          }
        }
        var outerhtml = $html.html();
        if(fn && typeof fn == "function"){
          fn(outerhtml);
          this.$nextTick(()=>{
            if("MathJax" in window) window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, doc]);
          });
        }
      }
		},
		mounted() {
				  //this.$refs.ue1.setUEContent("我是题干");
					this.$refs.ue2.setUEContent("我是分析");
					this.$refs.ue3.setUEContent("我是解答");
		},
		components: {
        Ueditor
    },
    watch:{

    },
    created(){
      this.getData();
    }
	}

</script>

<style scoped>

</style>