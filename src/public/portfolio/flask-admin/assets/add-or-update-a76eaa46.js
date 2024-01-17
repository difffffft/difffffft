import{_ as W,f as d,r as s,o as i,A as m,n as o,b as a,l as p,k as n,q as X,U as Y,m as y,a as V,c as Z,M as j,N as G,V as J,W as Q,X as ee,Y as le,Z as te,E as oe}from"./index-bf47055b.js";import{u as ae}from"./useRefFormData-84c825c7.js";import"./lodash-3ffe41b4.js";const ne={class:"mod__menu-icon-inner"},re={class:"mod__menu-icon-list"},se={__name:"add-or-update",emits:["refreshDataList"],setup(ue,{expose:A,emit:F}){const _=d(!1),b=d([]),k=d([]),C=d(),L=d(),U=d(),x=d(),{dataForm:e,assign:N,reset:D}=ae({id:"",type:0,name:"",pid:"0",parent_name:"",url:"",authority:"",sort:0,icon:"",open_style:0,children:[]}),I=r=>{_.value=!0,D(),r?R(r):v(),h(),k.value=Q()},P=()=>{h(),v()},h=()=>ee(e.value.type).then(r=>{b.value=r.data}),R=r=>{le(r).then(l=>{if(N(l.data),e.value.pid=="0")return v();C.value.setCurrentKey(e.value.pid)})},v=()=>{e.value.pid="0",e.value.parent_name="一级菜单"},S=r=>{e.value.pid=r.id,e.value.parent_name=r.name,U.value.hide()},T=r=>{e.value.icon=r,x.value.hide()},q=d({name:[{required:!0,message:"必填项不能为空",trigger:"blur"}],parent_name:[{required:!0,message:"必填项不能为空",trigger:"blur"}]}),M=()=>{L.value.validate(r=>{if(!r)return!1;te(e.value).then(()=>{oe.success({message:"操作成功",duration:500,onClose:()=>{_.value=!1,F("refreshDataList")}})})})};return A({init:I}),(r,l)=>{const c=s("el-radio"),w=s("el-radio-group"),u=s("el-form-item"),f=s("el-input"),B=s("BaseSvgIcon"),E=s("el-tree"),$=s("el-popover"),H=s("el-input-number"),g=s("el-button"),K=s("el-form"),z=s("el-dialog");return i(),m(z,{modelValue:_.value,"onUpdate:modelValue":l[13]||(l[13]=t=>_.value=t),title:n(e).id?"修改":"新增","close-on-click-modal":!1,draggable:""},{footer:o(()=>[a(g,{onClick:l[11]||(l[11]=t=>_.value=!1)},{default:o(()=>[p("取消")]),_:1}),a(g,{type:"primary",onClick:l[12]||(l[12]=t=>M())},{default:o(()=>[p("确定")]),_:1})]),default:o(()=>[a(K,{ref_key:"dataFormRef",ref:L,model:n(e),rules:q.value,"label-width":"120px",onKeyup:l[10]||(l[10]=X(t=>M(),["enter"]))},{default:o(()=>[a(u,{prop:"type",label:"类型"},{default:o(()=>[a(w,{modelValue:n(e).type,"onUpdate:modelValue":l[0]||(l[0]=t=>n(e).type=t),disabled:!!n(e).id,onChange:l[1]||(l[1]=t=>P())},{default:o(()=>[a(c,{label:0},{default:o(()=>[p("菜单")]),_:1}),a(c,{label:1},{default:o(()=>[p("按钮")]),_:1}),a(c,{label:2},{default:o(()=>[p("接口")]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1}),a(u,{prop:"name",label:"名称"},{default:o(()=>[a(f,{modelValue:n(e).name,"onUpdate:modelValue":l[2]||(l[2]=t=>n(e).name=t),placeholder:"名称"},null,8,["modelValue"])]),_:1}),a(u,{prop:"parent_name",label:"上级菜单",class:"popover-list"},{default:o(()=>[a($,{ref_key:"menuListPopover",ref:U,placement:"bottom-start",trigger:"click",width:400},{reference:o(()=>[a(f,{modelValue:n(e).parent_name,"onUpdate:modelValue":l[4]||(l[4]=t=>n(e).parent_name=t),readonly:!0,placeholder:"上级菜单"},{suffix:o(()=>[n(e).pid!=="0"?(i(),m(B,{key:0,icon:"icon-close-circle",onClick:l[3]||(l[3]=Y(t=>v(),["stop"]))})):y("",!0)]),_:1},8,["modelValue"])]),default:o(()=>[V("div",null,[a(E,{ref_key:"menuListTree",ref:C,data:b.value,props:{label:"name",children:"children"},"node-key":"id","highlight-current":!0,"expand-on-click-node":!1,accordion:"",onCurrentChange:S},null,8,["data"])])]),_:1},512)]),_:1}),n(e).type===0?(i(),m(u,{key:0,prop:"url",label:"路由"},{default:o(()=>[a(f,{modelValue:n(e).url,"onUpdate:modelValue":l[5]||(l[5]=t=>n(e).url=t),placeholder:"路由"},null,8,["modelValue"])]),_:1})):y("",!0),a(u,{prop:"sort",label:"排序"},{default:o(()=>[a(H,{modelValue:n(e).sort,"onUpdate:modelValue":l[6]||(l[6]=t=>n(e).sort=t),"controls-position":"right",min:0,label:"排序"},null,8,["modelValue"])]),_:1}),n(e).type===0?(i(),m(u,{key:1,prop:"open_style",label:"打开方式"},{default:o(()=>[a(w,{modelValue:n(e).open_style,"onUpdate:modelValue":l[7]||(l[7]=t=>n(e).open_style=t)},{default:o(()=>[a(c,{label:0},{default:o(()=>[p("内部打开")]),_:1}),a(c,{label:1},{default:o(()=>[p("外部打开")]),_:1})]),_:1},8,["modelValue"])]),_:1})):y("",!0),a(u,{prop:"authority",label:"授权标识"},{default:o(()=>[a(f,{modelValue:n(e).authority,"onUpdate:modelValue":l[8]||(l[8]=t=>n(e).authority=t),placeholder:"多个用逗号分隔，如：sys:menu:save,sys:menu:update"},null,8,["modelValue"])]),_:1}),n(e).type===0?(i(),m(u,{key:2,prop:"icon",label:"图标",class:"popover-list"},{default:o(()=>[a($,{ref_key:"iconListPopover",ref:x,placement:"top-start",trigger:"click",width:"40%","popper-class":"mod__menu-icon-popover"},{reference:o(()=>[a(f,{modelValue:n(e).icon,"onUpdate:modelValue":l[9]||(l[9]=t=>n(e).icon=t),readonly:!0,placeholder:"图标"},null,8,["modelValue"])]),default:o(()=>[V("div",ne,[V("div",re,[(i(!0),Z(j,null,G(k.value,(t,O)=>(i(),m(g,{key:O,class:J({"is-active":n(e).icon===t}),onClick:de=>T(t)},{default:o(()=>[a(B,{size:"45px",icon:t},null,8,["icon"])]),_:2},1032,["class","onClick"]))),128))])])]),_:1},512)]),_:1})):y("",!0)]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])}}},_e=W(se,[["__scopeId","data-v-582c286f"]]);export{_e as default};