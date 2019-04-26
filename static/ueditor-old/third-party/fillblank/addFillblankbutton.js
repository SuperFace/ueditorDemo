UE.registerUI('fillblank', function(editor, uiname){
    var iconUrl = editor.options.UEDITOR_HOME_URL + 'plugins/fillblank-plugin/fillblank-icon.png';

    var kfBtn = new UE.ui.Button({
        name: uiname,
        title:'插入填空题',
        //需要添加的额外样式，指定icon图标
        cssRules :'background: url("' + iconUrl + '") !important',
        onclick:function () {
            var count = 0;
            var blankArr = editor.body.getElementsByTagName('span');
            if(blankArr.length > 0){
                for (var i = 0, l = blankArr.length; i < l; i++) {
                    var item = blankArr[i];
                    var _className = item.getAttribute('class');
                    if(_className && _className.indexOf("blank-item") != -1){
                        count++;
                    } 
                }
            }
            editor.execCommand("inserthtml", '<span class="blank-item">【填空'+(++count)+'】</span>');
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiname);
        if (state == -1) {
            kfBtn.setDisabled(true);
            kfBtn.setChecked(false);
        } else {
            kfBtn.setDisabled(false);
            kfBtn.setChecked(state);
        }
    });

    return kfBtn;
});

