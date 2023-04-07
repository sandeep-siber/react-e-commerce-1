"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[702],{5008:function(e,t,r){r.d(t,{Z:function(){return p}});var i=r(1413),n=r(9439),c=r(2791),l="ProductForm_product-form__f+BNw",a="ProductForm_form-control__iyIG+",s="ProductForm_invalid__uONdg",d="ProductForm_actions__q0l40",o=r(184),u=function(e){return""===e.trim()};var p=function(e){var t,r=e.isEdit,p=e.loadedCategories,f=e.onCheckDuplicateTitle,h=e.titleIsDuplicate,x=e.onSaveProduct,m=e.product,j=(0,c.useState)({titleIsDuplicate:!1,title:!0,imageUrl:!0,description:!0,price:!0,brand:!0}),v=(0,n.Z)(j,2),g=v[0],b=v[1],y=(0,c.useRef)(),Z=(0,c.useRef)(),_=(0,c.useRef)(),P=(0,c.useRef)(),N=(0,c.useRef)(),F=(0,c.useRef)(),k=(0,c.useRef)(),w=(0,c.useRef)();t=m?(0,i.Z)({},m):{category:"",title:"",imageUrl:"",description:"",price:0,brand:"",availability:null},h&&Z.current.focus();var U=g.title&&!h?a:"".concat(a," ").concat(s),D=g.imageUrl?a:"".concat(a," ").concat(s),I=g.description?a:"".concat(a," ").concat(s),C=g.price?a:"".concat(a," ").concat(s),R=g.brand?a:"".concat(a," ").concat(s);return(0,o.jsx)("section",{className:l,children:(0,o.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=y.current.value,r=Z.current.value,i=_.current.value,n=P.current.value,c=N.current.value,l=F.current.value,a=k.current.checked,s=w.current.value,d=!h,o=!u(r),p=!u(i),f=!u(n),m=!(+c<=0),j=!u(l),v=d&&o&&p&&f&&m&&j;b({duplicateTitle:d,title:o,imageUrl:p,description:f,price:m,brand:j}),v&&x({category:t,title:r,imageUrl:i,description:n,price:+c,brand:l,availability:a,info:s})},children:[(0,o.jsxs)("div",{className:a,children:[(0,o.jsx)("label",{htmlFor:"categories",children:"Select Category"}),(0,o.jsx)("select",{id:"categories",ref:y,disabled:!!r,defaultValue:t.category,children:p.map((function(e){return(0,o.jsx)("option",{value:e.id,children:e.title},e.id)}))})]}),(0,o.jsxs)("div",{className:U,children:[(0,o.jsx)("label",{htmlFor:"title",children:"Title"}),(0,o.jsx)("input",{type:"text",id:"title",ref:Z,onBlur:function(e){var t=Z.current.value,r=y.current.value;f({title:t,categoryId:r})},disabled:!!r,defaultValue:t.title}),!g.title&&(0,o.jsx)("p",{children:"Title not entered"}),h&&(0,o.jsx)("p",{children:"Duplicate Title not allowed"})]}),(0,o.jsxs)("div",{className:D,children:[(0,o.jsx)("label",{htmlFor:"imageUrl",children:"Image Url"}),(0,o.jsx)("input",{type:"text",id:"imageUrl",ref:_,defaultValue:t.imageUrl}),!g.imageUrl&&(0,o.jsx)("p",{children:"ImageUrl not entered"})]}),(0,o.jsxs)("div",{className:I,children:[(0,o.jsx)("label",{htmlFor:"description",children:"Description"}),(0,o.jsx)("input",{type:"text",id:"description",ref:P,defaultValue:t.description}),!g.description&&(0,o.jsx)("p",{children:"Description not entered"})]}),(0,o.jsxs)("div",{className:C,children:[(0,o.jsx)("label",{htmlFor:"price",children:"Price"}),(0,o.jsx)("input",{type:"number",id:"price",ref:N,step:"0.01",defaultValue:t.price}),!g.price&&(0,o.jsx)("p",{children:"Price not entered"})]}),(0,o.jsxs)("div",{className:R,children:[(0,o.jsx)("label",{htmlFor:"brand",children:"Brand"}),(0,o.jsx)("input",{type:"text",id:"brand",ref:F,defaultValue:t.brand}),!g.brand&&(0,o.jsx)("p",{children:"Description not entered"})]}),(0,o.jsx)("div",{className:a,children:(0,o.jsxs)("label",{children:["Availability",(0,o.jsx)("input",{type:"checkbox",name:"availablity",ref:k,defaultChecked:t.availability})]})}),(0,o.jsxs)("div",{className:a,children:[(0,o.jsx)("label",{htmlFor:"info",children:"Info"}),(0,o.jsx)("textarea",{rows:"5",cols:"40",type:"text",id:"info",ref:w,defaultValue:t.info})]}),(0,o.jsx)("div",{className:d,children:(0,o.jsx)("button",{children:r?"Update Product":"Add Product"})})]})})}},1790:function(e,t,r){var i=r(184);t.Z=function(e){var t=e.children,r={font:"inherit",fontSize:"24px",fontWeight:"normal",textAlign:e.left?"left":"center",color:"#444"};return(0,i.jsx)("h1",{style:r,children:t})}},1702:function(e,t,r){r.r(t),r.d(t,{loader:function(){return x}});var i=r(4165),n=r(5861),c=r(9439),l=r(2791),a=r(7689),s=r(6853),d=r(1302),o=r(5008),u=r(1790),p=r(5829),f=r(2676),h=r(184);function x(){return m.apply(this,arguments)}function m(){return(m=(0,n.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,s.tG)();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.default=function(){var e,t=(0,a.V4)("loaded-categories"),r=(0,l.useState)(),x=(0,c.Z)(r,2),m=x[0],j=x[1],v=(0,a.s0)(),g=(0,d.Z)(s.gK,!1),b=g.sendRequest,y=g.status,Z=g.data,_=g.error;return"pending"===y&&(e=(0,h.jsx)("p",{children:"Saving Product..."})),"error"===y&&(e=(0,h.jsx)("p",{children:_})),"completed"===y&&(e=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("p",{children:"Product Saved successfully!"}),(0,h.jsxs)("p",{children:["New Product Id: ",Z.productId]})]})),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u.Z,{children:"New Product Page"}),e&&(0,h.jsxs)(p.Z,{children:[e,(0,h.jsx)(f.Z,{onClick:function(){v("/admin/collections/all",{replace:!0})},disabled:"pending"===y,children:"OK"})]}),(0,h.jsx)(o.Z,{loadedCategories:t,onCheckDuplicateTitle:function(e){var t;function r(){return(r=(0,n.Z)((0,i.Z)().mark((function r(){return(0,i.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,s.wp)(e);case 2:t=r.sent,j(t);case 4:case"end":return r.stop()}}),r)})))).apply(this,arguments)}!function(){r.apply(this,arguments)}()},titleIsDuplicate:m,onSaveProduct:function(e){b(e)}})]})}}}]);
//# sourceMappingURL=702.a44c1291.chunk.js.map