(this.webpackJsonppandemic_simulator=this.webpackJsonppandemic_simulator||[]).push([[0],{210:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(24),r=n.n(c),s=(n(98),n(5)),l=n(3),o=n(224),d=n(228),u=n(226),j=n(227),b=n(7),f=(n(61),n.p+"static/media/circle.0772d047.png"),g=n(19),h=n(1);function p(){var e=Object(i.useState)(52),t=Object(l.a)(e,2),n=t[0],a=t[1],c=Object(i.useState)(0),r=Object(l.a)(c,2),p=r[0],O=r[1],x=Object(i.useState)(1),m=Object(l.a)(x,2),y=m[0],v=m[1],S=Object(i.useState)(20),w=Object(l.a)(S,2),C=w[0],I=w[1],k=Object(i.useState)([]),B=Object(l.a)(k,2),F=B[0],E=B[1],M=Object(i.useState)(!1),R=Object(l.a)(M,2),z=R[0],D=R[1],L=Object(i.useState)(3),P=Object(l.a)(L,2),T=P[0],A=P[1],q=Object(i.useState)([]),J=Object(l.a)(q,2),W=J[0],Z=J[1],_=Object(i.useState)([]),U=Object(l.a)(_,2),X=U[0],Y=U[1],G=Object(i.useState)([]),H=Object(l.a)(G,2),K=H[0],N=H[1],Q=Object(i.useState)([]),V=Object(l.a)(Q,2),$=V[0],ee=V[1],te=Object(i.useState)([0]),ne=Object(l.a)(te,2),ie=ne[0],ae=ne[1],ce=Object(i.useState)([]),re=Object(l.a)(ce,2),se=re[0],le=re[1],oe=Object(i.useState)([0]),de=Object(l.a)(oe,2),ue=de[0],je=de[1],be=Object(i.useState)({}),fe=Object(l.a)(be,2),ge=fe[0],he=fe[1],pe=Object(i.useState)(!0),Oe=Object(l.a)(pe,2),xe=Oe[0],me=Oe[1];function ye(){Object(b.a)({targets:".population",translateX:function(){return b.a.random(-50,50)},translateY:function(){return b.a.random(-50,50)},easing:"linear",duration:1e3,complete:ye}),Object(b.a)({targets:".ring",scale:{value:[1,4*Math.sqrt(y)],duration:4e3},opacity:{value:[1,0],duration:750,easing:"linear"},loop:!0})}function ve(e,t,n){return Object(h.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(h.jsx)("div",{style:{width:725},children:Object(h.jsx)(g.a,{data:{labels:t,datasets:[{label:"# of infected cases",data:e,fill:{target:"origin",above:"rgb(255, 100, 132)"},borderColor:"rgba(255, 99, 132, 0.2)"}]},options:{animation:!1,scales:{x:{title:{text:"Unit of time",display:!0,font:{size:14}},grid:{display:!1}},y:{max:n.pop+10,title:{text:"Infected cases",display:!0,font:{size:14}}}},elements:{point:{radius:0}},plugins:{legend:{labels:{font:{size:14}}}}}})}),Object(h.jsxs)("div",{style:{border:"3px solid black",display:"flex",width:200,height:150,flexDirection:"column",justifyContent:"center",paddingLeft:10,margin:"0 0 40px 40px"},children:["Population: ",n.pop,Object(h.jsx)("br",{}),"Infected proportion: ",n.infected,"%",Object(h.jsx)("br",{}),"Contagious radius: ",n.radius,"m",Object(h.jsx)("br",{}),"Susceptible Rate: ",n.rate,"%",Object(h.jsx)("br",{}),"Recovery Time: ",n.time]})]})}Object(i.useEffect)((function(){for(var e=[],t=0;t<n;t++)e.push(t);E(e),Y(e.slice(0,Math.floor(n*p/100))),Z(e.slice(Math.floor(n*p/100)))}),[n,p]),Object(i.useEffect)((function(){z&&function(e){setTimeout((function(){var t=document.getElementById("healthy".concat(e));Object(b.a)({targets:t,background:"#808080",duration:1e3,easing:"linear"}),null!==(t=document.getElementById("ring".concat(e)))&&t.remove(),N((function(t){return[].concat(Object(s.a)(t),[e])}))}),1e3*T)}(X.slice(-1)[0])}),[X]),Object(i.useEffect)((function(){var e=setInterval((function(){if(z){for(var e=0;e<W.length;e++)for(var t=0;t<X.length&&!K.includes(t);t++){var n=document.getElementById(W[e]).getBoundingClientRect(),i=document.getElementById(X[t]).getBoundingClientRect();if(Math.sqrt(Math.pow(n.top-i.top,2)+Math.pow(n.left-i.left,2))<25*y)if(b.a.random(0,100)<C){var a=document.getElementById("healthy".concat(W[e])),c=document.getElementById("ring".concat(W[e]));null!==c&&c.classList.add("ring"),Object(b.a)({targets:a,background:"#FF0000",duration:1e3,easing:"linear"}),Y((function(t){return[].concat(Object(s.a)(t),[W[e]])}))}}if(0!==$.slice(-1)[0]){ee((function(e){return[].concat(Object(s.a)(e),[X.length-K.length])}));var r=ie.slice(-1)[0];r+=1,ae((function(e){return[].concat(Object(s.a)(e),[r])}))}}}),1e3);return function(){return clearInterval(e)}}),[z,W,ie]);var Se=ve($,ie,{pop:n,infected:p,radius:y,rate:C,time:T}),we=ve(se,ue,ge);function Ce(e,t,n,i,a,c){return Object(h.jsxs)("div",{children:[Object(h.jsx)(o.a,{id:"range-slider",gutterBottom:!0,style:{fontSize:12},children:e}),Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(h.jsx)("div",{style:{width:300},children:Object(h.jsx)(d.a,{value:t,onChange:function(e,t){return n(t)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",min:a,max:i,step:c,disabled:z})}),Object(h.jsx)("div",{style:{marginLeft:10},children:Object(h.jsx)(u.a,{value:t,margin:"dense",onChange:function(e){return e.target.value?n(e.target.value):function(){}},inputProps:{step:c,min:a,max:i,type:"number","aria-labelledby":"input-slider"}})})]})]})}return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start",padding:"15px 0 0 50px"},children:[Object(h.jsxs)("div",{style:{width:336},children:[Object(h.jsxs)("div",{style:{display:"flex",marginBottom:5},children:[Object(h.jsxs)("div",{style:{display:"flex",flex:.5,fontSize:14,justifyContent:"flex-start"},children:["# Infected cases: ",X.length]}),Object(h.jsxs)("div",{style:{display:"flex",flex:.5,fontSize:14,justifyContent:"flex-end"},children:["# Active cases: ",X.length-K.length]})]}),Object(h.jsx)("div",{style:{border:"3px solid black",width:200,height:200,flexWrap:"wrap",flexDirection:"row",display:"flex",justifyContent:"flex-start",alignItems:"center",padding:65,marginBottom:20},children:F.map((function(e){return e<Math.floor(n*p/100)?function(e){return Object(h.jsxs)("div",{class:"population",id:e,style:{margin:5,display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},children:[Object(h.jsx)("img",{class:"infect ring",src:f,style:{width:5,height:5,position:"absolute"}}),Object(h.jsx)("div",{id:"infected".concat(e),class:"infected",style:{width:5,height:5,borderRadius:"50%",backgroundColor:"#FF0000"}})]})}(e):function(e){return Object(h.jsxs)("div",{class:"population",id:e,style:{margin:5,display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},children:[Object(h.jsx)("img",{id:"ring".concat(e),src:f,style:{width:5,height:5,position:"absolute"}}),Object(h.jsx)("div",{id:"healthy".concat(e),style:{width:5,height:5,borderRadius:"50%",backgroundColor:"#66FF33"}})]})}(e)}))}),Ce("Population",n,a,169,1),Ce("Infected proportion (%)",p,O,100,0,1),Ce("Contagious Radius (meters)",y,v,2,1,.05),Object(h.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:350,height:100},children:[Object(h.jsx)("div",{style:{height:7.5,width:7.5,borderRadius:7.5,backgroundColor:"red"}}),Object(h.jsx)("img",{src:f,style:{height:25*y+5,width:25*y+5,position:"absolute"}})]}),Ce("Susceptible Rate (%)",C,I,100,0,1),Ce("Recovery time (units of time)",T,A,10,1,1),Object(h.jsx)("div",{style:{marginTop:10},children:Object(h.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(h.jsx)("div",{style:{margin:10},children:Object(h.jsx)(j.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){return function(){for(var e,t,i=n,a=Object(s.a)(F);0!==i;)t=Math.floor(Math.random()*i),e=a[i-=1],a[i]=a[t],a[t]=e;E(a)}()},disabled:z,children:"Shuffle"})}),Object(h.jsx)("div",{style:{margin:10},children:Object(h.jsx)(j.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){z?b.a.remove(".population"):(ye(),xe&&setTimeout((function(){Object(b.a)({targets:".infected",background:"#808080",duration:1e3,easing:"linear"}),document.querySelectorAll(".infect.ring").forEach((function(e){e.remove()}));for(var e=0;e<Math.floor(n*p/100);e++)N((function(t){return[].concat(Object(s.a)(t),[e])}));me(!1)}),1e3*T)),D(!z)},children:z?"Pause":"Start"})}),Object(h.jsx)("div",{style:{margin:10},children:Object(h.jsx)(j.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){if(b.a.remove(".population"),a(0),setTimeout((function(){a(52),O(0),I(20),v(1),A(3)}),100),$.length>0){ee([]),ae([0]),D(!1);var e=Object(s.a)($),t=Object(s.a)(ie),i={pop:n,infected:p,radius:y,rate:C,time:T};le(e),je(t),he(i)}me(!0),N([])},children:"Reset"})})]})})]}),Object(h.jsxs)("div",{style:{padding:20,marginLeft:60},children:[Se,se.length?Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{style:{margin:40,fontWeight:"bold",fontSize:20,textAlign:"center"},children:"Previous model"}),we]}):Object(h.jsx)(h.Fragment,{})]})]})})}g.b.plugins.tooltip.enabled=!0,g.b.scale.beginAtZero=!0,g.b.plugins.tooltip.enabled=!0,g.b.scale.beginAtZero=!0;var O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,230)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),c(e),r(e)}))};r.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(p,{})}),document.getElementById("root")),O()},61:function(e,t,n){},98:function(e,t,n){}},[[210,1,2]]]);
//# sourceMappingURL=main.a9b27a83.chunk.js.map