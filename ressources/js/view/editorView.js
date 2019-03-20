audioEditor.editorView = function() {

"use strict";
var that = {};

function init() {
  drawSidebar();

}

  function drawSidebar(){
    var rightSidebarjs = new SidebarJS.SidebarElement({
      component: document.querySelector('[sidebarjs="rightsidebar"]'),
      position: 'right'
    });
  }

that.init = init;
return that;

};
