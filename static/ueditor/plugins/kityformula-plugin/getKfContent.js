/**
 * Created by zhangbo21 on 14-9-2.
 */
/*
 * getKfContent : 将image的src从base64替换为文件名
 * param : callback -- 回调函数 其参数为替换之后的内容
 * return : void
 * */

UE.Editor.prototype.getKfContent = function(callback){

    var me = this;

    // 找到所有的base64
    var imgs =me.body.getElementsByTagName('img');
    var base64Imgs = [];
    UE.utils.each(imgs, function(item){
        var imgType = item.getAttribute('src').match(/^[^;]+/)[0];
        if ( imgType === 'data:image/png' && item.getAttribute('class').indexOf("kfformula") !=-1) {
            base64Imgs.push(item);
        }    
    });
    if (base64Imgs.length == 0){
        execCallback(base64Imgs);
    } else {
        UE.utils.each(base64Imgs, function(item){
            var latex = '$' + item.getAttribute("data-latex") + '$';
            var latexBox = me.document.createElement('div');
            latexBox.style.display = "inline";
            var latexNode =  me.document.createTextNode(latex);
            latexBox.appendChild(latexNode);
            var pNode = item.parentNode;
            var nextSiNode = item.nextSibling;
            pNode.removeChild(item);
            if(nextSiNode) pNode.insertBefore(latexBox, nextSiNode);
            else pNode.appendChild(latexNode);
        });
        execCallback();
    }
//     var filterObj = $(me.getContent()).find(".kfformula");
//     if(filterObj.length > 0){
//         for(var i=0;i<filterObj.length;i++){
//             var latex = '$' + $(filterObj[i]).attr('data-latex') + '$';
//             $(filterObj[i]).replaceWith(latex);
//         } 
//     }
    
    function execCallback(){
        me.sync();
        callback(me.getContent());
    }

};