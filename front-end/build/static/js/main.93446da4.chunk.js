(this.webpackJsonpimagerepo=this.webpackJsonpimagerepo||[]).push([[0],{157:function(e,t,a){e.exports=a(303)},162:function(e,t,a){},294:function(e,t,a){},303:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),l=a.n(c),i=(a(162),a(41)),o=a(37),u=Object(n.createContext)({user:{},login:function(){},loggedIn:!1,getUserInfo:function(){},logout:function(){}}),m=function(e){var t=Object(n.useState)({}),a=Object(o.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(!1),m=Object(o.a)(i,2),s=m[0],f=m[1];return Object(n.useEffect)((function(){fetch("".concat("/api","/userinfo"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){l({username:e.username,money:e.money}),f(!0)})).catch((function(e){return console.log("not logged in")}))}),[]),r.a.createElement(u.Provider,{value:{userInfo:c,loggedIn:s,updateUserInfo:function(){fetch("".concat("/api","/userinfo"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return l(e)}))},login:function(e,t,a,n){if(a)return f(!0),void l({username:e,money:n});fetch("".concat("/api","/login"),{method:"POST",credentials:"include",body:JSON.stringify({username:e,password:t})}).then((function(e){if(200===e.status)return e.json()})).then((function(e){l({username:e.username,money:e.money}),f(!0)})).catch((function(e){return alert("issue logging in")}))},logout:function(){f(!1),l({})}}},e.children)},s=a(55),f=a(139),g=a.n(f),p=a(68),h=a.n(p);var E=function(){var e=Object(n.useContext)(u),t=e.userInfo,a=e.logout;return r.a.createElement(s.a,{mode:"horizontal"},r.a.createElement(s.a.Item,{key:"home",icon:r.a.createElement(g.a,null)},r.a.createElement(i.b,{to:"/"},"Home")),!t.username&&r.a.createElement(s.a.Item,{key:"login",icon:r.a.createElement(h.a,null)},r.a.createElement(i.b,{to:"/login"},"Login")),!t.username&&r.a.createElement(s.a.Item,{key:"register",icon:r.a.createElement(h.a,null)},r.a.createElement(i.b,{to:"/register"},"Register")),t.username&&r.a.createElement(s.a.Item,{key:"upload",icon:r.a.createElement(h.a,null)},r.a.createElement(i.b,{to:"/upload"},"Upload")),t.username&&r.a.createElement(s.a.Item,{key:"myImages",icon:r.a.createElement(h.a,null)},r.a.createElement(i.b,{to:"/myimages"},"My Images")),t.username&&r.a.createElement(s.a.Item,{style:{float:"right"},key:"user",icon:r.a.createElement(h.a,null)},t.username),t.username&&r.a.createElement(s.a.Item,{style:{float:"right"},key:"money",icon:r.a.createElement(h.a,null)},"$",t.money),t.username&&r.a.createElement(s.a.Item,{onClick:function(){document.cookie="auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",a()},style:{float:"right"},key:"logout",icon:r.a.createElement(h.a,null)},"Log out"))},d=a(31),b=a(67),y=a(107),O=a(34),j=a(62),v=a(63);var I=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useContext)(u),i=l.updateUserInfo,m=l.loggedIn;return Object(n.useEffect)((function(){fetch("".concat("/api","/imagelist"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.error("issue fetching imagedata")}))}),[]),m?r.a.createElement(j.a,null,r.a.createElement(v.a,{span:22,offset:1},r.a.createElement("h1",{style:{textAlign:"center"}},"Marketplace"),r.a.createElement(b.b,{itemLayout:"vertical",size:"large",pagination:{onChange:function(e){console.log(e)},pageSize:5},dataSource:a,renderItem:function(e){return r.a.createElement(b.b.Item,{key:e.title,actions:[],extra:r.a.createElement("img",{width:272,alt:"logo",src:"".concat("/api","/images/").concat(e.path)})},r.a.createElement(b.b.Item.Meta,{avatar:r.a.createElement(y.a,{src:e.avatar}),title:r.a.createElement("a",{href:e.href},e.ownerUsername),description:"$"+e.price}),e.isOwner?r.a.createElement(O.a,{type:"danger"},"You own this"):r.a.createElement(O.a,{onClick:function(t){return a=e.pictureID,void fetch("".concat("/api","/purchasereq"),{method:"POST",credentials:"include",body:JSON.stringify({pictureID:a})}).then((function(e){200===e.status&&fetch("".concat("/api","/imagelist"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){i(),c(e)})).catch((function(e){return console.error("issue fetching imagedata")}))})).catch((function(e){return console.error("issue purchasing")}));var a},type:"primary"},"Purchase"))}}))):r.a.createElement(d.a,{to:"/login"})},S=a(69),w=a(36),C=a(39);var k=function(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useContext)(u).loggedIn,i=Object(n.useState)(!1),m=Object(o.a)(i,2),s=m[0],f=m[1],g=Object(n.useRef)(null);function p(e){Array.from(e.target.files).forEach((function(e){!function(e,t){t.readAsDataURL(e),t.addEventListener("load",(function(t){c((function(a){return Object(w.a)(Object(w.a)({},a),{},Object(S.a)({},e.name,{price:0,public:!0,data:t.target.result,tags:""}))}))}))}(e,new FileReader)}))}if(!l)return r.a.createElement(d.a,{to:"/login"});var h={labelCol:{span:6},wrapperCol:{span:14}};return s?r.a.createElement(d.a,{to:"/myimages"}):r.a.createElement(C.a,Object.assign({name:"validate_other"},h,{onFinish:function(e){for(var t=g.current.files,n=new FormData,r=0;r<t.length;r++){var c=Math.floor(124999*Math.random()+1);n.append(c,t[r]),n.append(c,JSON.stringify([a[t[r].name].public,a[t[r].name].price,a[t[r].name].tags]))}fetch("".concat("/api","/uploadimg"),{body:n,method:"POST",credentials:"include"}).then((function(e){200===e.status&&f(!0)})).catch((function(e){return alert("issue uploading the image")}))}}),r.a.createElement("h1",{style:{textAlign:"center",marginTop:"50px"}},"Upload a image"),r.a.createElement(C.a.Item,Object.assign({},h,{name:"Images",label:"Choose your images"}),r.a.createElement("input",{type:"file",ref:g,multiple:!0,onChange:function(e){return p(e)}})),r.a.createElement(C.a.Item,{wrapperCol:{span:12,offset:6}},r.a.createElement(O.a,{type:"primary",htmlType:"submit"},"Submit")),a&&Object.keys(a).map((function(e){return r.a.createElement("div",null,r.a.createElement("img",{key:e,style:{width:"150px",height:"100%"},src:a[e].data}),r.a.createElement("label",null,"Price"),r.a.createElement("input",{onChange:function(t){t.persist(),c((function(n){return Object(w.a)(Object(w.a)({},n),{},Object(S.a)({},e,Object(w.a)(Object(w.a)({},a[e]),{},{price:t.target.value})))}))}}),r.a.createElement("label",null,"Public"),r.a.createElement("select",{onChange:function(t){t.persist(),c((function(n){return Object(w.a)(Object(w.a)({},n),{},Object(S.a)({},e,Object(w.a)(Object(w.a)({},a[e]),{},{public:t.target.value})))}))}},r.a.createElement("option",{value:"true"},"True"),r.a.createElement("option",{value:"false"},"False")),r.a.createElement("label",null,"Tags(comma seperated)"),r.a.createElement("input",{onChange:function(t){t.persist(),c((function(n){return Object(w.a)(Object(w.a)({},n),{},Object(S.a)({},e,Object(w.a)(Object(w.a)({},a[e]),{},{tags:t.target.value})))}))}}))})))},x=a(66),P=a(108),T=a(104),N=a.n(T),U=a(105),D=a.n(U);var L=function(){var e=Object(n.useState)(),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(),i=Object(o.a)(l,2),m=i[0],s=i[1],f=Object(n.useContext)(u),g=f.login;return f.loggedIn?r.a.createElement(d.a,{to:"/"}):r.a.createElement(j.a,{type:"flex",justify:"center",align:"middle",style:{minHeight:"100vh"}},r.a.createElement(v.a,{span:5},r.a.createElement("h1",null,"Login"),r.a.createElement(C.a,{name:"normal_login",className:"login-form",initialValues:{remember:!0},onFinish:function(e){return g(a,m)}},r.a.createElement(C.a.Item,{name:"username",rules:[{required:!0,message:"Please input your Username!"}]},r.a.createElement(x.a,{onChange:function(e){return c(e.target.value)},prefix:r.a.createElement(N.a,{className:"site-form-item-icon"}),placeholder:"Username"})),r.a.createElement(C.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}]},r.a.createElement(x.a,{onChange:function(e){return s(e.target.value)},prefix:r.a.createElement(D.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0},r.a.createElement(P.a,null,"Remember me")),r.a.createElement("a",{className:"login-form-forgot",href:""},"Forgot password")),r.a.createElement(C.a.Item,null,r.a.createElement(O.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"Log in")))))};var F=function(){var e=Object(n.useState)(),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(),i=Object(o.a)(l,2),m=i[0],s=i[1],f=Object(n.useState)(),g=Object(o.a)(f,2),p=g[0],h=g[1],E=Object(n.useContext)(u),b=E.login,y=E.loggedIn;return p||y?r.a.createElement(d.a,{to:"/"}):r.a.createElement(j.a,{type:"flex",justify:"center",align:"middle",style:{minHeight:"100vh"}},r.a.createElement(v.a,{span:5},r.a.createElement("h1",null,"Register"),r.a.createElement(C.a,{name:"normal_login",className:"login-form",initialValues:{remember:!0},onFinish:function(e){fetch("".concat("/api","/register"),{method:"POST",credentials:"include",body:JSON.stringify({username:a,password:m})}).then((function(e){if(console.log(e),200===e.status)return e.json()})).then((function(e){b(e.username,null,!0,e.money),h(!0)})).catch((function(e){return alert("issue registering")}))}},r.a.createElement(C.a.Item,{name:"username",rules:[{required:!0,message:"Please input your Username!"}]},r.a.createElement(x.a,{onChange:function(e){return c(e.target.value)},prefix:r.a.createElement(N.a,{className:"site-form-item-icon"}),placeholder:"Username"})),r.a.createElement(C.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}]},r.a.createElement(x.a,{onChange:function(e){return s(e.target.value)},prefix:r.a.createElement(D.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0},r.a.createElement(P.a,null,"Remember me")),r.a.createElement("a",{className:"login-form-forgot",href:""},"Forgot password")),r.a.createElement(C.a.Item,null,r.a.createElement(O.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"Log in")))))},J=(a(294),a(155)),M=a(154),R=a(65),q=R.a.Option;var z=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useContext)(u).loggedIn,i=Object(n.useState)(!1),m=Object(o.a)(i,2),s=m[0],f=m[1],g=Object(n.useState)({}),p=Object(o.a)(g,2),h=p[0],E=p[1];return Object(n.useEffect)((function(){fetch("".concat("/api","/userimages"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return alert("unable to fetch user specific images")}))}),[]),l?r.a.createElement(j.a,null,r.a.createElement(v.a,{span:22,offset:1},r.a.createElement("h1",{style:{textAlign:"center"}},"Your Images"),r.a.createElement(b.b,{itemLayout:"vertical",size:"large",pagination:{onChange:function(e){console.log(e)},pageSize:5},dataSource:a,renderItem:function(e){return r.a.createElement(b.b.Item,{key:e.title,actions:[],extra:r.a.createElement("img",{width:272,alt:"logo",src:"".concat("/api","/images/").concat(e.path)})},r.a.createElement(b.b.Item.Meta,{avatar:r.a.createElement(y.a,{src:e.avatar}),title:r.a.createElement("a",{href:e.href},e.ownerUsername),description:"$"+e.price}),e.public?r.a.createElement("p",null,"This item is listed on the marketplace"):r.a.createElement("p",null,"This item is not listed on the marketplace"),r.a.createElement(O.a,{onClick:function(t){return a={id:e.pictureID,price:e.price,public:e.public},E(a),void f(!0);var a},type:"primary"},"EDIT"),r.a.createElement(O.a,{onClick:function(t){return n=e.pictureID,void fetch("".concat("/api","/deleteimg"),{method:"POST",credentials:"include",body:JSON.stringify({pictureID:n})}).then((function(e){200===e.status&&c((function(e){console.log(e);for(var t=Object(J.a)(a),r=0;r<t.length;r++)t[r].pictureID===n&&t.splice(r,1);return t}))}));var n},type:"danger"},"DELETE"))}}),r.a.createElement(M.a,{title:"Edit image details..",visible:s,onOk:function(){f(!1),fetch("".concat("/api","/editimg"),{method:"POST",credentials:"include",body:JSON.stringify(h)}).then((function(e){200===e.status&&fetch("".concat("/api","/userimages"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return alert("unable to fetch user specific images")}))})).catch((function(e){return alert("unable to edit image")})),E({})},onCancel:function(){f(!1),E({})}},r.a.createElement("label",null,"Price"),r.a.createElement(x.a,{onChange:function(e){return E(Object(w.a)(Object(w.a)({},h),{},{price:e.target.value}))},value:h.price,placeholder:"Basic usage"}),r.a.createElement("label",null,"Public"),r.a.createElement(R.a,{key:h.public,defaultValue:1==h.public?"true":"false",style:{width:120},onChange:function(e){return E(Object(w.a)(Object(w.a)({},h),{},{public:"true"==e?1:0}))}},r.a.createElement(q,{value:"true"},"True"),r.a.createElement(q,{value:"false"},"False"))))):r.a.createElement(d.a,{to:"/login"})};var A=function(){return console.log(m),r.a.createElement(m,null,r.a.createElement(i.a,null,r.a.createElement(E,null),r.a.createElement(d.d,null,r.a.createElement(d.b,{path:"/",exact:!0},r.a.createElement(I,null)),r.a.createElement(d.b,{path:"/upload"},r.a.createElement(k,null)),r.a.createElement(d.b,{path:"/login"},r.a.createElement(L,null)),r.a.createElement(d.b,{path:"/register"},r.a.createElement(F,null)),r.a.createElement(d.b,{path:"/myimages"},r.a.createElement(z,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[157,1,2]]]);
//# sourceMappingURL=main.93446da4.chunk.js.map