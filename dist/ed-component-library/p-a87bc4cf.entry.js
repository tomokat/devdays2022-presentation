import{r as t,c as o,h as i,g as s}from"./p-d36a7c4b.js";const n=class{constructor(i){t(this,i),this.confirmAction=o(this,"confirmAction",7),this.confirmMessage="Are you sure?",this.confirmButtonCaption="OK",this.cancelButtonCaption="Cancel"}componentWillLoad(){this.dataString&&(this.data=JSON.parse(this.dataString))}emitConfirmAction(){console.log("about to emit - "+JSON.stringify(this.data)),this.confirmAction.emit({data:this.data})}async open(){let t=this.el.querySelector("ed-modal-dialog");await t.showDialog()}async close(){let t=this.el.querySelector("ed-modal-dialog");await t.hideDialog()}render(){return i("ed-modal-dialog",null,i("h1",{slot:"modal-header",class:"modal-title pbs-primary"},this.confirmMessage),i("div",{slot:"modal-footer",class:"modal-footer"},i("ed-button",{buttonId:"confirmActionButtonId",buttonCaption:this.confirmButtonCaption,buttonType:"primary",onClick:()=>this.emitConfirmAction()}),i("ed-button",{buttonId:"cancelActionButtonId",buttonCaption:this.cancelButtonCaption,buttonType:"link",onClick:()=>this.close()})))}get el(){return s(this)}};export{n as ed_confirmation_dialog}