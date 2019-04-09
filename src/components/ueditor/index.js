import UEditor from './UEditor';

/* UEditor plugin install */
UEditor.install = function(Vue) {
  Vue.component(UEditor.name, UEditor);
};

export default UEditor;
