import{r as e,c as s,h as t}from"./p-d36a7c4b.js";const a=class{constructor(t){e(this,t),this.addMessageFailure=s(this,"addMessageFailure",7),this.addMessageSuccess=s(this,"addMessageSuccess",7),this.errorMessages=[],this.showAddForm=!1}componentWillLoad(){this.showAddFormAnalyticsHook=this.analyticsHint+" - add",this.saveAddMessageAnalyticsHook=this.analyticsHint+" - add - add.save",this.cancelAddMessageAnalyticsHook=this.analyticsHint+" - add - add.cancel"}setShowAddForm(e){this.showAddForm=e,this.clearMessages()}handleErrors(e){if(!e.ok)throw Error(e);return e.json()}checkResponse(e){if(e.errorMessage)throw Error(e.errorMessage);return e}async constructRequestData(){var e=await this.getSelectedMessageCode(),s=await this.getSelectedEntitlement();return{irn:this.irn,entityType:"CLI",messageCode:e,subjectIdDisplay:s,subjectIdType:"ENT"}}async callAddMessage(e){var s=await this.constructRequestData();fetch(`clientexchanges/api/client-exchanges/${e}/message`,{method:"PUT",headers:{"Content-Type":"application/json","sso-token":this.ssoToken},body:JSON.stringify(s)}).then(this.handleErrors).then(this.checkResponse).then((()=>{this.displaySuccessMessage().then((()=>{this.addMessageSuccess.emit(),this.setShowAddForm(!1)}))})).catch((e=>{var s="Failed to add message";e.message&&(s=e.message),this.errorMessages=[...this.errorMessages,s],this.addMessageFailure.emit()}))}async displaySuccessMessage(){var e=document.querySelector('ed-feedback-block[name="succssFeedbackBlock"]');return await e.displayTimedMessage("Successfully created message",3e3)}clearMessages(){this.errorMessages=[]}async getSelectedMessageCode(){let e=document.querySelector('ed-message-code-list[name="messageCodeList"]');return await e.getSelectedValue()}async getSelectedEntitlement(){let e=document.querySelector('ed-entitlement-list[name="entitlementList"]');return await e.getSelectedValue()}async validateMessageCode(){let e=document.querySelector('ed-message-code-list[name="messageCodeList"]');var s=!0;return await e.getSelectedValue()||(this.errorMessages=[...this.errorMessages,"Invalid message code"],s=!1),e.markValidity(s),s}async validateEntitlement(){let e=document.querySelector('ed-entitlement-list[name="entitlementList"]');var s=!0;return await e.getSelectedValue()||(this.errorMessages=[...this.errorMessages,"Invalid entitelement"],s=!1),e.markValidity(s),s}async validateAddForm(){this.clearMessages();var e=await this.validateMessageCode(),s=await this.validateEntitlement();return e&&s}async saveAddMessage(){await this.validateAddForm()&&this.callAddMessage(this.irn)}renderDefaultView(){return t("div",{class:"add-item"},t("button",{class:"btn btn-link",type:"button",title:"Add message","aria-pressed":"false","data-analytics-click-event":this.showAddFormAnalyticsHook,onClick:()=>this.setShowAddForm(!0)},t("i",{class:"otpp-icon icons8-add","aria-hidden":"true",title:"Add message"}),t("span",null,"Message"),t("span",{class:"sr-only"},"Add message")))}renderAddMessageForm(){return t("div",{class:"add-form layout vertical"},t("form",{name:"addMessageForm",id:"addMessageForm"},t("fieldset",null,t("h2",{class:"pbs-primary"},"Add message"),t("ed-feedback-block",{name:"succssFeedbackBlock",messageType:"success"}),t("ed-feedback-block",{messageType:"error",messages:this.errorMessages}),t("ed-message-code-list",{name:"messageCodeList",caption:"Message code",ssoToken:this.ssoToken}),t("ed-entitlement-list",{name:"entitlementList",caption:"Entitlement",irn:this.irn,ssoToken:this.ssoToken}))),t("div",{class:"layout horizontal end-justified center-center"},t("ed-button",{buttonId:"saveAddMessageButtonId",buttonCaption:"Save",buttonType:"primary",analyticsHook:this.saveAddMessageAnalyticsHook,onClick:()=>this.saveAddMessage()}),t("ed-button",{buttonId:"cancelAddMessageButtonId",buttonCaption:"Cancel",buttonType:"link",analyticsHook:this.cancelAddMessageAnalyticsHook,onClick:()=>this.setShowAddForm(!1)})))}render(){return this.showAddForm?this.renderAddMessageForm():this.renderDefaultView()}};export{a as ed_add_message}