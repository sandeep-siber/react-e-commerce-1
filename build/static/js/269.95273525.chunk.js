"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[269],{4123:function(e,r,t){t.d(r,{Z:function(){return s}});t(2791);var n="Card_card__AxeL7",a=t(184);var s=function(e){return(0,a.jsx)("div",{className:"".concat(n," ").concat(e.className),children:e.children})}},1790:function(e,r,t){var n=t(184);r.Z=function(e){var r=e.children,t={font:"inherit",fontSize:"24px",fontWeight:"normal",textAlign:e.left?"left":"center",color:"#444"};return(0,n.jsx)("h1",{style:t,children:r})}},269:function(e,r,t){t.r(r),t.d(r,{default:function(){return P}});var n=t(2791),a=t(1790),s=t(9439),i=t(7689),l=t(1405),o=t(4123),c=t(2939),d="PasswordChange_container__v3rYl",u="PasswordChange_auth__button__-MDbE",h=t(184);var m=function(){var e=(0,n.useState)(!1),r=(0,s.Z)(e,2),t=r[0],a=r[1],m=(0,n.useRef)(),f=(0,l.v9)((function(e){return e.auth.token})),p=(0,i.s0)();return(0,h.jsxs)(o.Z,{className:d,children:[(0,h.jsx)("button",{type:"button",className:u,onClick:function(){a((function(e){return!e}))},children:"Click to Change Password"}),t&&(0,h.jsxs)("form",{className:c.Z.auth,onSubmit:function(e){e.preventDefault();var r=m.current.value;fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDU9_Ti8XV_nwJzzt6H7-0lIFBWdMDlVhQ",{method:"post",body:JSON.stringify({idToken:f,password:r,returnSecureToken:!1}),headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e),p("/account",{replace:!0})})).catch((function(e){console.log(e.message)}))},children:[(0,h.jsxs)("div",{className:c.Z["form-control"],children:[(0,h.jsx)("label",{htmlFor:"new-password",children:"New Password"}),(0,h.jsx)("input",{type:"password",id:"new-password",ref:m,autoFocus:!0})]}),(0,h.jsx)("div",{className:c.Z.actions,children:(0,h.jsx)("button",{children:"Change Password"})})]})]})},f=t(7762),p={container:"Orders_container__WS-R7",order:"Orders_order__qvbI1","order-header":"Orders_order-header__opDgS",item:"Orders_item__RlbzU",item__image:"Orders_item__image__ANhpU",quantity:"Orders_quantity__Tofvd","order-footer":"Orders_order-footer__qAcMO"};var x=function(e){var r,t=e.orders,n=e.status,a=e.error,s=[];for(var i in t){var l,o=t[i],c=new Date(o.date).toLocaleDateString("en-In"),d=(0,h.jsxs)("header",{className:p["order-header"],children:[(0,h.jsxs)("h4",{children:["Order #",i]}),(0,h.jsx)("h4",{children:c})]}),u=[],m=0,x=o.orderedItems,j=(0,f.Z)(x);try{for(j.s();!(l=j.n()).done;){var _=l.value,v=(0,h.jsxs)("li",{className:p.item,children:[(0,h.jsx)("div",{className:p.item__image,children:(0,h.jsx)("img",{src:_.imageUrl,alt:_.title})}),(0,h.jsxs)("div",{children:[(0,h.jsx)("p",{children:_.title}),(0,h.jsx)("p",{children:_.description}),(0,h.jsxs)("p",{children:[(0,h.jsx)("span",{children:"\u20b9. "}),(0,h.jsx)("span",{children:_.price.toFixed(2)})]})]}),(0,h.jsxs)("div",{className:p.quantity,children:[(0,h.jsx)("span",{children:"X "}),(0,h.jsx)("span",{children:_.quantity})]}),(0,h.jsx)("div",{className:p.amount,children:(0,h.jsx)("p",{children:_.totalPrice.toFixed(2)})})]},_.id);u.push(v),m+=_.totalPrice}}catch(N){j.e(N)}finally{j.f()}var g=(0,h.jsx)("ul",{children:u}),b=(0,h.jsx)("footer",{className:p["order-footer"],children:(0,h.jsxs)("p",{children:[(0,h.jsx)("span",{children:"\u20b9. "}),(0,h.jsx)("span",{children:m.toFixed(2)})]})});s.push({orderHeader:d,orderItems:g,orderFooter:b})}return"pending"===n&&(r=(0,h.jsx)("div",{className:"centered",children:(0,h.jsx)("p",{children:"Loading..."})})),"error"===n&&(r=(0,h.jsx)("div",{className:"centered",children:(0,h.jsx)("p",{children:a})})),"completed"!==n||s&&0!==s.length||(r=(0,h.jsx)("div",{className:"centered",children:(0,h.jsx)("p",{children:"No Orders found"})})),"completed"===n&&s.length>0&&(r=(0,h.jsx)("ul",{children:s.map((function(e,r){return(0,h.jsxs)("li",{className:p.order,children:[(0,h.jsx)(h.Fragment,{children:e.orderHeader}),(0,h.jsx)(h.Fragment,{children:e.orderItems}),(0,h.jsx)(h.Fragment,{children:e.orderFooter})]},r)}))})),(0,h.jsxs)("section",{className:p.container,children:[(0,h.jsx)("h2",{children:"Orders History"}),r]})},j=t(2676),_="ProfileForm_container__Mdrz5",v="ProfileForm_control__B7Xng",g="ProfileForm_invalid__2Z6uK",b="ProfileForm_actions__O6Gzo",N=function(e){return""===e.trim()},F=function(e){var r=localStorage.getItem("userId"),t=localStorage.getItem("userEmail"),a=(0,n.useState)(!1),i=(0,s.Z)(a,2),l=i[0],o=i[1],c=(0,n.useState)({name:!0,mobile:!0,pin:!0,area:!0,email:!0}),d=(0,s.Z)(c,2),u=d[0],m=d[1],f=(0,n.useRef)(),p=(0,n.useRef)(),x=(0,n.useRef)(),F=(0,n.useRef)(),I=(0,n.useRef)(),y="".concat(v," ").concat(u.name?"":g),P="".concat(v," ").concat(u.mobile?"":g),S="".concat(v," ").concat(u.pin?"":g),w="".concat(v," ").concat(u.area?"":g),U="".concat(v," ").concat(u.email?"":g),Z={name:"",mobile:"",pin:"",area:""};return e.fetchInfo.fetchedUserProfile&&(Z={name:e.fetchInfo.fetchedUserProfile.name||"",mobile:e.fetchInfo.fetchedUserProfile.mobile||"",pin:e.fetchInfo.fetchedUserProfile.pin||"",area:e.fetchInfo.fetchedUserProfile.area||""}),(0,h.jsx)("form",{children:(0,h.jsxs)("div",{className:_,children:[(0,h.jsx)("h2",{children:"Profile"}),"pending"===e.updateInfo.updatStatus&&(0,h.jsx)("p",{children:"Updating..."}),e.updateInfo.updateError&&(0,h.jsx)("p",{children:e.updateInfo.updateError}),"pending"===e.fetchInfo.fetchUserDetailsStatus&&(0,h.jsx)("p",{children:"Loading profile..."}),e.fetchInfo.fetchUserDetailsError&&(0,h.jsx)("p",{children:e.fetchInfo.fetchUserDetailsError}),(0,h.jsxs)("div",{className:y,children:[(0,h.jsx)("label",{htmlFor:"name",children:"Your Name"}),(0,h.jsx)("input",{type:"text",id:"name",disabled:!l,defaultValue:Z.name,ref:f}),!u.name&&(0,h.jsx)("p",{children:"Please enter valid name"})]}),(0,h.jsxs)("div",{className:P,children:[(0,h.jsx)("label",{htmlFor:"mobile",children:"Mobile"}),(0,h.jsx)("input",{type:"text",id:"mobile",disabled:!l,defaultValue:Z.mobile,ref:p}),!u.mobile&&(0,h.jsx)("p",{children:"Please enter valid mobile"})]}),(0,h.jsxs)("div",{className:S,children:[(0,h.jsx)("label",{htmlFor:"pin",children:"PIN Code"}),(0,h.jsx)("input",{type:"text",id:"pin",disabled:!l,defaultValue:Z.pin,ref:x}),!u.pin&&(0,h.jsx)("p",{children:"Please enter valid pincode"})]}),(0,h.jsxs)("div",{className:w,children:[(0,h.jsx)("label",{htmlFor:"area",children:"Area"}),(0,h.jsx)("input",{type:"text",id:"area",disabled:!l,defaultValue:Z.area,ref:F}),!u.area&&(0,h.jsx)("p",{children:"Please enter valid area"})]}),(0,h.jsxs)("div",{className:U,children:[(0,h.jsx)("label",{htmlFor:"email",children:"Email"}),(0,h.jsx)("input",{type:"text",id:"email",disabled:!0,defaultValue:t,ref:I}),!u.email&&(0,h.jsx)("p",{children:"Please enter valid email"})]}),(0,h.jsxs)("div",{className:b,children:[(0,h.jsx)(j.Z,{type:"button",onClick:function(){l?(o(!1),m({name:!0,mobile:!0,pin:!0,area:!0,email:!0})):o(!0)},children:l?"Cancel":"Edit"}),(0,h.jsx)(j.Z,{type:"button",disabled:!l,onClick:function(){var t=f.current.value,n=p.current.value,a=x.current.value,s=F.current.value,i=I.current.value,l=!N(t),c=10===n.trim().length,d=function(e){return 6===e.trim().length}(a),u=!N(s),h=i.includes("@"),j=l&&c&&d&&u&&h;m({name:l,mobile:c,pin:d,area:u,email:h}),j&&(o(!1),e.onConfirm({userId:r,name:t,mobile:n,pin:a,area:s,email:i}))},children:"Update"})]})]})})},I=t(1302),y=t(6853);var P=function(){var e=localStorage.getItem("userId"),r=(0,I.Z)(y.AU,!0),t=r.sendRequest,s=r.status,i=r.data,l=r.error,o=(0,I.Z)(y.Kg,!1),c=o.sendRequest,d=o.status,u=o.data,f=o.error,p=(0,I.Z)(y.et,!0),j=p.sendRequest,_=p.status,v=p.data,g=p.error;(0,n.useEffect)((function(){t(e)}),[e,t]),(0,n.useEffect)((function(){j(e)}),[e,j]);var b={updatStatus:d,updateFeedback:u,updateError:f},N={fetchUserDetailsStatus:_,fetchUserDetailsError:g,fetchedUserProfile:v};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a.Z,{children:"My Account"}),(0,h.jsx)(x,{orders:i,status:s,error:l}),(0,h.jsx)(F,{onConfirm:function(e){c(e)},updateInfo:b,fetchInfo:N}),(0,h.jsx)("br",{}),(0,h.jsx)(m,{})]})}},2939:function(e,r){r.Z={wrapper:"AuthForm_wrapper__+gqAD",auth:"AuthForm_auth__i9NeK",errors:"AuthForm_errors__8i5MD","form-control":"AuthForm_form-control__bSr9b",invalid:"AuthForm_invalid__gE4mt",actions:"AuthForm_actions__zfFG6",toggle:"AuthForm_toggle__zEayz"}}}]);
//# sourceMappingURL=269.95273525.chunk.js.map