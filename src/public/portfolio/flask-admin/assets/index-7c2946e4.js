import{_ as le,u as oe,e as te,f as _,g as se,h,L as A,i as R,j as ne,r as m,o as v,c as F,a as e,t as i,k as n,l as y,m as D,w as q,v as G,b as a,n as t,q as K,s as ce,x as l,y as re,z as ie,S as ue,A as k,p as de,d as pe,E as P,B as me}from"./index-bf47055b.js";import{v as _e}from"./validate-0888cf31.js";const E=C=>(de("data-v-d0cd7a5d"),C=C(),pe(),C),fe={class:"page-login"},ge={class:"login-info app-v-scrollbar"},be={class:"login-info-logo-text"},he=E(()=>e("br",null,null,-1)),ve=E(()=>e("p",null,"Welcome to use the bidding document making system",-1)),ye=E(()=>e("div",{class:"login-info-desc"},"基于Vue3、TypeScript、Element Plus、Vue Router、Pinia、Axios、Vite等开发的后台管理",-1)),Ce={class:"login-form-wrapper app-v-scrollbar"},Le={class:"login-form-header"},Oe={class:"login-form-curr-login-model-active"},we={class:"login-form-label"},Ie={class:"login-form-label"},Se={class:"login-form-label"},Ae={class:"captcha-form"},ke=["src"],Ee={class:"login-form-label"},Be={class:"login-form-label"},Ve={class:"captcha-form"},Ne=ce({name:"Login"}),xe=Object.assign(Ne,{setup(C){const B=oe(),j="后台管理系统",V=te(),N=_(),x=_(),c=_(l.ACCOUNT),f=_(!1),H=se(()=>f.value?"登录中":"立即登录"),W=async()=>{switch(c.value){case l.ACCOUNT:try{return await N.value.validate(),!0}catch{return!1}case l.MOBILE:try{return await x.value.validate(),!0}catch{return!1}}},O=async()=>{if(await W())switch(f.value=!0,c.value){case l.ACCOUNT:B.accountLoginAction(s).then(()=>{X(),V.push({path:"/home"})}).catch(()=>{L()}).finally(()=>{f.value=!1});break;case l.MOBILE:B.mobileLoginAction(r).then(()=>{V.push({path:"/home"})}).finally(()=>{f.value=!1})}},s=h({username:localStorage.getItem(A)||"",password:localStorage.getItem(R)||"",key:"",captcha:"",reset:()=>{s.username=localStorage.getItem(A)||"",s.password="",s.key="",s.captcha="",L()}}),J=h({username:[{required:!0,message:"账号必填",trigger:"blur"}],password:[{required:!0,message:"密码必填",trigger:"blur"}],captcha:[{required:!0,message:"验证码必填",trigger:"blur"}]}),w=_(!1),T=_(""),Q=async()=>{const{data:p}=await re();w.value=p,await L()},L=async()=>{if(w.value){const{data:p}=await ne();s.key=p.key,T.value=p.image}};Q();const X=()=>{localStorage.setItem(A,s.username),localStorage.setItem(R,s.password)},r=h({mobile:"",code:"",reset:()=>{r.mobile="",r.code=""}}),Y=h({mobile:[{required:!0,message:"手机号必填",trigger:"blur"}],code:[{required:!0,message:"验证码必填",trigger:"blur"}]}),u=h({disabled:!1,total:60,count:0}),Z=()=>{u.count=u.total,u.disabled=!0;let p=setInterval(()=>{u.count>1&&u.count<=u.total?u.count--:(u.disabled=!1,clearInterval(p))},1e3)},$=async()=>{if(!_e(r.mobile)){P.error("请输入正确的手机号");return}await me(r.mobile),P.success("短信发送成功"),Z()},ee=()=>{c.value=c.value===l.ACCOUNT?l.MOBILE:c.value===l.MOBILE?l.ACCOUNT:"未知登录",c.value===l.ACCOUNT?s.reset():r.reset()};return(p,d)=>{const U=m("Avatar"),I=m("el-icon"),g=m("el-input"),b=m("el-form-item"),ae=m("Briefcase"),M=m("BaseSvgIcon"),z=m("el-form"),S=m("el-button");return v(),F("div",fe,[e("main",null,[e("section",ge,[e("h1",be,i(n(ie)),1),e("div",null,[e("h3",null,[y("欢迎使用"),he,y(i(n(j)),1)]),ve]),ye]),e("section",Ce,[e("div",Le,[e("span",Oe,i(c.value===n(l).ACCOUNT?n(l).ACCOUNT:c.value===n(l).MOBILE?n(l).MOBILE:"未知登录"),1),n(ue)?(v(),F("span",{key:0,onClick:ee},i(c.value===n(l).ACCOUNT?n(l).MOBILE:c.value===n(l).MOBILE?n(l).ACCOUNT:"未知登录"),1)):D("",!0)]),q(a(z,{ref_key:"accountLoginFormRef",ref:N,onKeyup:K(O,["enter"]),model:s,rules:J,"label-width":"120px","label-position":"top",class:"login-form"},{default:t(()=>[a(b,{label:"账号",prop:"username"},{label:t(o=>[e("div",we,[a(I,{color:"#727D8B"},{default:t(()=>[a(U)]),_:1}),e("span",null,i(o.label),1)])]),default:t(()=>[a(g,{modelValue:s.username,"onUpdate:modelValue":d[0]||(d[0]=o=>s.username=o),size:"large",placeholder:"请输入账号",type:"text",autocomplete:"off",clearable:""},null,8,["modelValue"])]),_:1}),a(b,{label:"密码",prop:"password"},{label:t(o=>[e("div",Ie,[a(I,{color:"#727D8B"},{default:t(()=>[a(ae)]),_:1}),e("span",null,i(o.label),1)])]),default:t(()=>[a(g,{modelValue:s.password,"onUpdate:modelValue":d[1]||(d[1]=o=>s.password=o),size:"large","show-password":"",placeholder:"请输入密码",type:"password",autocomplete:"off",clearable:""},null,8,["modelValue"])]),_:1}),w.value?(v(),k(b,{key:0,label:"验证码",prop:"captcha"},{label:t(o=>[e("div",Se,[a(M,{icon:"icon-security-fill",style:{"font-size":"16px",color:"#727d8b"}}),e("span",null,i(o.label),1)])]),default:t(()=>[e("div",Ae,[a(g,{class:"captcha-form-input",modelValue:s.captcha,"onUpdate:modelValue":d[2]||(d[2]=o=>s.captcha=o),size:"large",placeholder:"请输入验证码",type:"captcha",autocomplete:"off",clearable:""},null,8,["modelValue"]),e("img",{src:T.value,alt:"验证码",onClick:L},null,8,ke)])]),_:1})):D("",!0)]),_:1},8,["onKeyup","model","rules"]),[[G,c.value===n(l).ACCOUNT]]),q(a(z,{ref_key:"mobileLoginFormRef",ref:x,model:r,rules:Y,"label-width":"120px","label-position":"top",class:"login-form",onKeyup:K(O,["enter"])},{default:t(()=>[a(b,{label:"手机号",prop:"mobile"},{label:t(o=>[e("div",Ee,[a(I,{color:"#727D8B"},{default:t(()=>[a(U)]),_:1}),e("span",null,i(o.label),1)])]),default:t(()=>[a(g,{modelValue:r.mobile,"onUpdate:modelValue":d[3]||(d[3]=o=>r.mobile=o),size:"large",placeholder:"请输入手机号",type:"text",autocomplete:"off",clearable:""},null,8,["modelValue"])]),_:1}),a(b,{label:"验证码",prop:"code"},{label:t(o=>[e("div",Be,[a(M,{icon:"icon-security-fill",style:{"font-size":"16px",color:"#727d8b"}}),e("span",null,i(o.label),1)])]),default:t(()=>[e("div",Ve,[a(g,{class:"captcha-form-input",modelValue:r.code,"onUpdate:modelValue":d[4]||(d[4]=o=>r.code=o),size:"large",placeholder:"请输入验证码",type:"captcha",autocomplete:"off",clearable:""},null,8,["modelValue"]),u.disabled?(v(),k(S,{key:1,type:"default",size:"large",disabled:""},{default:t(()=>[y(i(u.count)+" 秒后重新发送",1)]),_:1})):(v(),k(S,{key:0,type:"primary",size:"large",onClick:$},{default:t(()=>[y("发送验证码 ")]),_:1}))])]),_:1})]),_:1},8,["model","rules","onKeyup"]),[[G,c.value===n(l).MOBILE]]),a(S,{type:"primary",size:"large",class:"login-btn",loading:f.value,onClick:O},{default:t(()=>[y(i(H.value),1)]),_:1},8,["loading"])])])])}}}),Me=le(xe,[["__scopeId","data-v-d0cd7a5d"]]);export{Me as default};
