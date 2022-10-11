import{r as e,c as t,h as s}from"./p-d36a7c4b.js";const i=class{constructor(s){e(this,s),this.eSignatureRequestCancelled=t(this,"eSignatureRequestCancelled",7),this.eSignatureRequestCompleted=t(this,"eSignatureRequestCompleted",7),this.errorMessages=[],this.successMessages=[],this.allSigners=[],this.showForm=!0,this.showSpinner=!0,this.disabledButtons=!1,this.additionalSigners=[],this.emptyFieldError="Please ensure all input fields are filled out",this.emailFormatError="Email format invalid"}async componentDidLoad(){await this.fetchRoles()}fetchRoles(){return fetch(`/docusign/api/templates/${this.templateId}/signer-roles`,{method:"GET",headers:{"Content-Type":"application/json","sso-token":this.ssoToken}}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.formatSigners(e.roles),this.showSpinner=!1})).catch((e=>{this.showForm=!1,this.clearErrorMessages(),this.addErrorMessage("Error "+e.status+": There was an error retrieving the form for "+this.templateName+" template."),this.showSpinner=!1}))}sendData(){return fetch(`/docusign/api/${this.irn}/send-documents/`,{method:"POST",headers:{"Content-Type":"application/json","sso-token":this.ssoToken},body:JSON.stringify(this.templateAndSigners)}).then((e=>e.ok?(this.clearErrorMessages(),this.successMessages=["Request successfully sent"],setTimeout(this.emitSuccess.bind(this),2e3),Promise.resolve()):Promise.reject(e))).catch((e=>{this.disabledButtons=!1,this.clearErrorMessages(),this.showForm=!1,this.addErrorMessage("Error "+e.status+", "+e.statusText+": There was an error sending the signature request.")}))}formatSigners(e){e.forEach((e=>this.allSigners.push({role:e.type,name:null,validName:!0,email:null,validEmail:!0}))),this.allSigners[0].name=this.memberName}nameInputHandler(e,t){this.allSigners[t]=Object.assign(Object.assign({},this.allSigners[t]),{name:e.target.value,validName:!0}),this.allSigners=[...this.allSigners]}emailInputHandler(e,t){this.allSigners[t]=Object.assign(Object.assign({},this.allSigners[t]),{email:e.target.value,validEmail:!0}),this.allSigners=[...this.allSigners]}emitSuccess(){this.eSignatureRequestCompleted.emit("Request eSignature - Complete")}requestCancelled(){this.eSignatureRequestCancelled.emit("Request eSignature - Cancel")}async sendRequest(){this.clearErrorMessages(),this.allSigners.forEach((e=>this.validateSigner(e))),0===this.errorMessages.length&&(this.disabledButtons=!0,this.allSigners.map(this.mapToObjects.bind(this)),this.templateAndSigners={templateId:this.templateId,templateName:this.templateName,clientSigner:this.clientSigner,additionalSigners:this.additionalSigners},this.sendData())}validateSigner(e){var t=this.allSigners.indexOf(e);e.name||(this.allSigners[t]=Object.assign(Object.assign({},this.allSigners[t]),{validName:!1}),this.addErrorMessage(this.emptyFieldError)),this.validateEmail(e.email)||(this.allSigners[t]=Object.assign(Object.assign({},this.allSigners[t]),{validEmail:!1}))}validateEmail(e){return e?!!/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(e)||(this.addErrorMessage(this.emailFormatError),!1):(this.addErrorMessage(this.emptyFieldError),!1)}mapToObjects(e){0===this.allSigners.indexOf(e)?(this.clientSigner=Object.assign(Object.assign({},this.clientSigner),{role:e.role}),this.clientSigner=Object.assign(Object.assign({},this.clientSigner),{name:e.name}),this.clientSigner=Object.assign(Object.assign({},this.clientSigner),{email:e.email})):(this.newSigner=Object.assign(Object.assign({},this.newSigner),{role:e.role}),this.newSigner=Object.assign(Object.assign({},this.newSigner),{name:e.name}),this.newSigner=Object.assign(Object.assign({},this.newSigner),{email:e.email}),this.additionalSigners.push(this.newSigner))}addErrorMessage(e){var t=this.errorMessages.slice();t.indexOf(e)<0&&(t.push(e),this.errorMessages=t)}clearErrorMessages(){this.errorMessages=[]}roleMapping(e){var t=this.allSigners.indexOf(e);return s("div",{class:"layout vertical"},s("h2",{class:"h3 pbs-primary h3-eSignature"},e.role),0===t?s("p",{class:"p-eSignature"},this.memberName):s("div",{class:"form-group"},s("input",{type:"text",class:this.allSigners[t].validName?this.validUserInputClass:this.invalidUserInputClass,"aria-labelledby":"role-name-label",onInput:e=>this.nameInputHandler(e,t),value:this.allSigners[t].name}),s("label",{class:"control-label",id:"role-name-label"},"Name"),s("i",{class:"bar"})),s("div",{class:"form-group"},s("input",{type:"text",class:this.allSigners[t].validEmail?this.validUserInputClass:this.invalidUserInputClass,"aria-labelledby":"role-email-label",onInput:e=>this.emailInputHandler(e,t),value:this.allSigners[t].email,maxlength:"150"}),s("label",{class:"control-label",id:"role-email-label"},"Email"),s("i",{class:"bar"})))}render(){return s("div",null,s("ed-feedback-block",{messageType:"success",messages:this.successMessages}),s("ed-feedback-block",{messageType:"error",messages:this.errorMessages}),s("div",{class:"modal-body"},s("ed-spinner",{inProgress:this.showSpinner}),s("div",{class:"flex-3 field-separator"},s("div",null,this.showForm?this.allSigners.map(this.roleMapping.bind(this)):null))),s("div",{class:"modal-footer"},s("div",{class:"layout horizontal"},s("div",{class:"flex"},this.showForm&&!this.showSpinner?s("button",{class:"btn btn-primary",disabled:this.disabledButtons,ref:e=>this.sendRequestButton=e,"data-analytics-click-event":"request.eSignature - send",onClick:this.sendRequest.bind(this)},"Send"):null,s("button",{class:"btn btn-link",disabled:this.disabledButtons,"data-analytics-click-event":"request.eSignature - cancel",onClick:this.requestCancelled.bind(this)},"Cancel")))))}},a=class{constructor(s){e(this,s),this.templateSelected=t(this,"templateSelected",7),this.eSignatureRequestCancelled=t(this,"eSignatureRequestCancelled",7),this.ssoToken="",this.errorMessages=[],this.isTemplateSelected=!1,this.isDropdownSelectionValid=!0,this.invalidFormError="Please select a template",this.languageOptions={english:"English",french:"French"}}async componentWillLoad(){await this.fetchData()}async componentWillRender(){this.allTemplates||0!==this.errorMessages.length||await this.fetchData()}watchPropHandler(e){e||this.fetchData()}fetchData(){if(this.ssoToken)return fetch("/docusign/api/templates",{method:"GET",headers:{"Content-Type":"application/json","sso-token":this.ssoToken}}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.clearErrorMessages(),this.allTemplates=e,this.templateOptions=this.allTemplates.englishTemplates})).catch((e=>{this.clearErrorMessages(),this.addErrorMessage("Error "+e.status+": There was an error retrieving templates")}))}languageSelectionHandler(e){this.languageSelection=e.target.value,this.allTemplates&&(this.templateOptions=this.languageSelection===this.languageOptions.english?this.allTemplates.englishTemplates:this.allTemplates.frenchTemplates,this.resetTemplateSelection())}templateSelectionHandler(e){this.removeErrorMessage(this.invalidFormError),this.templateSelection=e.target.value,this.isTemplateSelected=!0}formValidationHandler(e){if(e.preventDefault(),this.isTemplateSelected){var t=this.templateOptions.find((e=>e.template.templateId===this.templateSelection));this.templateSelected.emit({templateId:t.template.templateId,templateName:t.template.templateName})}else this.isDropdownSelectionValid=!1,this.addErrorMessage(this.invalidFormError)}cancelRequestHandler(){this.engishRadioInput.checked=!0,this.templateSelectionDropdown.selectedIndex=void 0,this.templateSelectionDropdown.value=void 0,this.isTemplateSelected=!1,this.isDropdownSelectionValid=!0,this.clearErrorMessages(),this.eSignatureRequestCancelled.emit("Request eSignature - Cancel")}resetTemplateSelection(){this.isTemplateSelected=!1,this.templateSelectionDropdown.selectedIndex=null,this.templateSelectionDropdown.value=null,this.removeErrorMessage(this.invalidFormError)}addErrorMessage(e){var t=this.errorMessages.slice();t.indexOf(e)<0&&(t.push(e),this.errorMessages=t)}removeErrorMessage(e){this.isDropdownSelectionValid=!0,this.errorMessages=this.errorMessages.filter((t=>t!=e)).slice()}clearErrorMessages(){this.errorMessages=[]}render(){const e=s("div",{class:"form-group"},s("select",{name:"templateSelectionDropdown",id:"templateSelectionDropdown","aria-labelledby":"template-select-label",class:this.isDropdownSelectionValid?this.validUserInputClass:this.invalidUserInputClass,onInput:e=>this.templateSelectionHandler(e),ref:e=>this.templateSelectionDropdown=e,required:!0},s("option",{value:"",selected:!0,disabled:!0,hidden:!0}),this.allTemplates?this.templateOptions.map(((e={})=>s("option",{value:e.template.templateId},e.template.templateName))):null),s("label",{class:"control-label",id:"template-select-label"},"Select template"),s("i",{class:"bar"}));return s("div",null,s("ed-feedback-block",{messageType:"error",messages:this.errorMessages}),s("div",{id:"templateSelection",class:"modal-body"},s("h2",{id:"templateSelectionTitle",class:"h3 pbs-primary"},"Template Language"),s("form",{id:"templateSelectionForm"},s("div",{class:"flex"},s("div",{class:"form-radio layout vertical",role:"radiogroup"},s("fieldset",null,s("div",{class:"radio flex"},s("label",{role:"radio",id:"language-selection-english-label"},s("input",{type:"radio",name:"languageSelection",value:"English",checked:!0,"aria-labelledby":"language-selection-english-label",onChange:this.languageSelectionHandler.bind(this),ref:e=>this.engishRadioInput=e}),s("i",{class:"helper"}),this.languageOptions.english)),s("div",{class:"radio flex"},s("label",{role:"radio",id:"language-selection-french-label"},s("input",{type:"radio",name:"languageSelection",value:"French",checked:!1,"aria-labelledby":"language-selection-french-label",onChange:this.languageSelectionHandler.bind(this)}),s("i",{class:"helper"}),this.languageOptions.french))))),e)),s("div",{class:"modal-footer"},s("div",{class:"layout horizontal"},s("div",{class:"flex"},s("button",{class:"btn btn-primary",ref:e=>this.templateSelectionSubmitButton=e,"data-analytics-click-event":"request.eSignature - "+this.submitButtonLabel.toLowerCase(),onClick:this.formValidationHandler.bind(this)},this.submitButtonLabel),s("button",{class:"btn btn-link","data-analytics-click-event":"request.eSignature - cancel",onClick:this.cancelRequestHandler.bind(this)},"Cancel")))))}static get watchers(){return{ssoToken:["watchPropHandler"]}}};export{i as ed_request_e_signature_template,a as ed_request_e_signature_template_selection}