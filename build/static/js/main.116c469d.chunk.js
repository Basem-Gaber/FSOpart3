(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var o=n(14),a=n(2),r=n(0),l=n.n(r),c=n(3),u=n.n(c),s="/api/persons",i=function(){return u.a.get(s)},m=function(e){return u.a.post(s,e)},d=function(e,t){return u.a.put("".concat(s,"/").concat(e),t)},f=function(e){return u.a.delete("".concat(s,"/").concat(e))},g=n(13),b=n.n(g),p=function(e){var t=e.value,n=e.setter;return l.a.createElement("div",null,"filter shown with ",l.a.createElement("input",{value:t,onChange:function(e){console.log(e.target.value),n(e.target.value)}}))},v=function(e){var t=e.person,n=e.deletePerson;return console.log(t),l.a.createElement("div",null,t.name," ",t.number,l.a.createElement("button",{onClick:n},"Delete"))},E=function(e){var t=e.persons,n=e.newInput,o=e.setPersons,a=e.setMessage,r=e.setColorToggle,c=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return l.a.createElement("div",null,c.map((function(e){return l.a.createElement(v,{key:e.name,person:e,deletePerson:function(){return function(e){if(window.confirm("Delete ".concat(t.find((function(t){return t.id===e})).name," ?"))){var n=t.find((function(t){return t.id===e})).name;f(e).then((function(n){o(t.filter((function(t){return t.id!==e})))})),r(!0),a("Removed '".concat(n,"'")),setTimeout((function(){a(null)}),1e4)}}(e.id)}})})))},h=function(e){var t=e.persons,n=e.newName,o=e.newNumber,a=e.personsSetter,r=e.nameSetter,c=e.numberSetter,u=e.setMessage,s=e.setColorToggle;return l.a.createElement("div",null,l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("button clicked",e.target);var l,i=!1;for(l in t)if(console.log("now name is ".concat(t[l].name)),t[l].name===n){if(t[l].number===o)alert("".concat(n," is already added to phonebook"));else window.confirm("".concat(t[l].name," is already added to the phonebook, replace old number with new one ?"))&&(console.log(t[l].id),d(t[l].id,{name:n,number:o}).then((function(e){a(t.map((function(t){return t.name!==n?t:e.data}))),s(!0),u("Updated number of '".concat(t[l].name,"'")),setTimeout((function(){u(null)}),1e4)})).catch((function(e){s(!1),u("Information of '".concat(t[l].name,"' has already been removed from the server.")),setTimeout((function(){u(null)}),1e4)})));i=!0;break}if(!i){var f={name:n,number:o};m(f).then((function(e){a(t.concat(e.data)),r(""),c("")})),s(!0),u("Added '".concat(f.name,"'")),setTimeout((function(){u(null)}),1e4)}}},l.a.createElement("div",null,"name: ",l.a.createElement("input",{value:n,onChange:function(e){console.log(e.target.value),r(e.target.value)}})),l.a.createElement("div",null,"number: ",l.a.createElement("input",{value:o,onChange:function(e){console.log(e.target.value),c(e.target.value)}})),l.a.createElement("div",null,l.a.createElement("button",{type:"submit"},"add"))))},w=(n(37),function(e){var t=e.message,n=e.colorToggle,a=(e.setColorToggle,{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}),r=Object(o.a)({},a,{color:"red"});return null===t?null:!1===n?(console.log("yes is false"),l.a.createElement("div",{style:r},t)):l.a.createElement("div",{style:a},t)});b.a.render(l.a.createElement((function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),u=Object(a.a)(c,2),s=u[0],m=u[1],d=Object(r.useState)(""),f=Object(a.a)(d,2),g=f[0],b=f[1],v=Object(r.useState)(""),S=Object(a.a)(v,2),j=S[0],O=S[1],k=Object(r.useState)(""),C=Object(a.a)(k,2),T=C[0],y=C[1],N=Object(r.useState)(!0),P=Object(a.a)(N,2),I=P[0],M=P[1];return Object(r.useEffect)((function(){console.log("effect"),i().then((function(e){console.log("promise fulfilled"),o(e.data)}))}),[]),l.a.createElement("div",null,l.a.createElement("h2",null,"Phonebook"),l.a.createElement(w,{message:T,colorToggle:I,setColorToggle:M}),l.a.createElement(p,{value:j,setter:O}),l.a.createElement("h3",null,"add a new"),l.a.createElement(h,{persons:n,newName:s,newNumber:g,personsSetter:o,nameSetter:m,numberSetter:b,setMessage:y,setColorToggle:M}),l.a.createElement("h3",null,"Numbers"),l.a.createElement(E,{persons:n,newInput:j,setPersons:o,setMessage:y,setColorToggle:M}))}),null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.116c469d.chunk.js.map