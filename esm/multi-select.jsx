import t from"react";import{Dropdown as e,Button as n}from"antd";import{DownOutlined as r}from"@ant-design/icons";import o from"classnames";var i={}.toString,c=function(t){return i.call(t).slice(8,-1)},a=Array.isArray||function(t){return"Array"==c(t)},u=function(t){return"object"==typeof t?null!==t:"function"==typeof t},l=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},f=function(t){return Object(l(t))},s=Math.ceil,p=Math.floor,v=function(t){return isNaN(t=+t)?0:(t>0?p:s)(t)},d=Math.min,g=function(t){return t>0?d(v(t),9007199254740991):0},h=function(t,e){if(!u(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!u(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!u(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!u(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},y=function(t){try{return!!t()}catch(t){return!0}},m=!y((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})),b="object"==typeof window&&window&&window.Math==Math?window:"object"==typeof self&&self&&self.Math==Math?self:Function("return this")(),x=b.document,w=u(x)&&u(x.createElement),E=function(t){return w?x.createElement(t):{}},O=!m&&!y((function(){return 7!=Object.defineProperty(E("div"),"a",{get:function(){return 7}}).a})),S=function(t){if(!u(t))throw TypeError(String(t)+" is not an object");return t},j=Object.defineProperty,k={f:m?j:function(t,e,n){if(S(t),e=h(e,!0),S(n),O)try{return j(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},P=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},A=function(t,e,n){var r=h(e);r in t?k.f(t,r,P(0,n)):t[r]=n};function _(t,e){return t(e={exports:{}},e.exports),e.exports}var C,I,M,N=m?function(t,e,n){return k.f(t,e,P(1,n))}:function(t,e,n){return t[e]=n,t},R=function(t,e){try{N(b,t,e)}catch(n){b[t]=e}return e},T=_((function(t){var e=b["__core-js_shared__"]||R("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.0.0",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})})),$=0,D=Math.random(),F=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++$+D).toString(36))},L=!y((function(){String(Symbol())})),z=T("wks"),W=b.Symbol,G=function(t){return z[t]||(z[t]=L&&W[t]||(L?W:F)("Symbol."+t))},V=G("species"),q=function(t,e){var n;return a(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!a(n.prototype)?u(n)&&null===(n=n[V])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},B=G("species"),K=function(t){return!y((function(){var e=[];return(e.constructor={})[B]=function(){return{foo:1}},1!==e[t](Boolean).foo}))},U={}.propertyIsEnumerable,Y=Object.getOwnPropertyDescriptor,H={f:Y&&!U.call({1:2},1)?function(t){var e=Y(this,t);return!!e&&e.enumerable}:U},J="".split,Q=y((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==c(t)?J.call(t,""):Object(t)}:Object,X=function(t){return Q(l(t))},Z={}.hasOwnProperty,tt=function(t,e){return Z.call(t,e)},et=Object.getOwnPropertyDescriptor,nt={f:m?et:function(t,e){if(t=X(t),e=h(e,!0),O)try{return et(t,e)}catch(t){}if(tt(t,e))return P(!H.f.call(t,e),t[e])}},rt=T("native-function-to-string",Function.toString),ot=b.WeakMap,it="function"==typeof ot&&/native code/.test(rt.call(ot)),ct=T("keys"),at=function(t){return ct[t]||(ct[t]=F(t))},ut={},lt=b.WeakMap;if(it){var ft=new lt,st=ft.get,pt=ft.has,vt=ft.set;C=function(t,e){return vt.call(ft,t,e),e},I=function(t){return st.call(ft,t)||{}},M=function(t){return pt.call(ft,t)}}else{var dt=at("state");ut[dt]=!0,C=function(t,e){return N(t,dt,e),e},I=function(t){return tt(t,dt)?t[dt]:{}},M=function(t){return tt(t,dt)}}var gt={set:C,get:I,has:M,enforce:function(t){return M(t)?I(t):C(t,{})},getterFor:function(t){return function(e){var n;if(!u(e)||(n=I(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},ht=_((function(t){var e=gt.get,n=gt.enforce,r=String(rt).split("toString");T("inspectSource",(function(t){return rt.call(t)})),(t.exports=function(t,e,o,i){var c=!!i&&!!i.unsafe,a=!!i&&!!i.enumerable,u=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof e||tt(o,"name")||N(o,"name",e),n(o).source=r.join("string"==typeof e?e:"")),t!==b?(c?!u&&t[e]&&(a=!0):delete t[e],a?t[e]=o:N(t,e,o)):a?t[e]=o:R(e,o)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||rt.call(this)}))})),yt=Math.max,mt=Math.min,bt=function(t){return function(e,n,r){var o,i=X(e),c=g(i.length),a=function(t,e){var n=v(t);return n<0?yt(n+e,0):mt(n,e)}(r,c);if(t&&n!=n){for(;c>a;)if((o=i[a++])!=o)return!0}else for(;c>a;a++)if((t||a in i)&&i[a]===n)return t||a||0;return!t&&-1}},xt=bt(!1),wt=function(t,e){var n,r=X(t),o=0,i=[];for(n in r)!tt(ut,n)&&tt(r,n)&&i.push(n);for(;e.length>o;)tt(r,n=e[o++])&&(~xt(i,n)||i.push(n));return i},Et=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Ot=Et.concat("length","prototype"),St={f:Object.getOwnPropertyNames||function(t){return wt(t,Ot)}},jt={f:Object.getOwnPropertySymbols},kt=b.Reflect,Pt=kt&&kt.ownKeys||function(t){var e=St.f(S(t)),n=jt.f;return n?e.concat(n(t)):e},At=function(t,e){for(var n=Pt(e),r=k.f,o=nt.f,i=0;i<n.length;i++){var c=n[i];tt(t,c)||r(t,c,o(e,c))}},_t=/#|\.prototype\./,Ct=function(t,e){var n=Mt[It(t)];return n==Rt||n!=Nt&&("function"==typeof e?y(e):!!e)},It=Ct.normalize=function(t){return String(t).replace(_t,".").toLowerCase()},Mt=Ct.data={},Nt=Ct.NATIVE="N",Rt=Ct.POLYFILL="P",Tt=Ct,$t=nt.f,Dt=function(t,e){var n,r,o,i,c,a=t.target,u=t.global,l=t.stat;if(n=u?b:l?b[a]||R(a,{}):(b[a]||{}).prototype)for(r in e){if(i=e[r],o=t.noTargetGet?(c=$t(n,r))&&c.value:n[r],!Tt(u?r:a+(l?".":"#")+r,t.forced)&&void 0!==o){if(typeof i==typeof o)continue;At(i,o)}(t.sham||o&&o.sham)&&N(i,"sham",!0),ht(n,r,i,t)}},Ft=G("isConcatSpreadable"),Lt=!y((function(){var t=[];return t[Ft]=!1,t.concat()[0]!==t})),zt=K("concat"),Wt=function(t){if(!u(t))return!1;var e=t[Ft];return void 0!==e?!!e:a(t)};Dt({target:"Array",proto:!0,forced:!Lt||!zt},{concat:function(t){var e,n,r,o,i,c=f(this),a=q(c,0),u=0;for(e=-1,r=arguments.length;e<r;e++)if(Wt(i=-1===e?c:arguments[e])){if(u+(o=g(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,u++)n in i&&A(a,u,i[n])}else{if(u>=9007199254740991)throw TypeError("Maximum allowed index exceeded");A(a,u++,i)}return a.length=u,a}});var Gt=function(t,e,n){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}},Vt=function(t,e){var n=1==t,r=2==t,o=3==t,i=4==t,c=6==t,a=5==t||c,u=e||q;return function(e,l,s){for(var p,v,d=f(e),h=Q(d),y=Gt(l,s,3),m=g(h.length),b=0,x=n?u(e,m):r?u(e,0):void 0;m>b;b++)if((a||b in h)&&(v=y(p=h[b],b,d),t))if(n)x[b]=v;else if(v)switch(t){case 3:return!0;case 5:return p;case 6:return b;case 2:x.push(p)}else if(i)return!1;return c?-1:o||i?i:x}},qt=Vt(2);Dt({target:"Array",proto:!0,forced:!K("filter")},{filter:function(t){return qt(this,t,arguments[1])}});var Bt=Object.keys||function(t){return wt(t,Et)},Kt=m?Object.defineProperties:function(t,e){S(t);for(var n,r=Bt(e),o=r.length,i=0;o>i;)k.f(t,n=r[i++],e[n]);return t},Ut=b.document,Yt=Ut&&Ut.documentElement,Ht=at("IE_PROTO"),Jt=function(){},Qt=function(){var t,e=E("iframe"),n=Et.length;for(e.style.display="none",Yt.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Qt=t.F;n--;)delete Qt.prototype[Et[n]];return Qt()},Xt=Object.create||function(t,e){var n;return null!==t?(Jt.prototype=S(t),n=new Jt,Jt.prototype=null,n[Ht]=t):n=Qt(),void 0===e?n:Kt(n,e)};ut[Ht]=!0;var Zt=G("unscopables"),te=Array.prototype;null==te[Zt]&&N(te,Zt,Xt(null));var ee,ne=bt(!0);Dt({target:"Array",proto:!0},{includes:function(t){return ne(this,t,arguments.length>1?arguments[1]:void 0)}}),ee="includes",te[Zt][ee]=!0;var re=Vt(1);Dt({target:"Array",proto:!0,forced:!K("map")},{map:function(t){return re(this,t,arguments[1])}});var oe=k.f,ie=Function.prototype,ce=ie.toString,ae=/^\s*function ([^ (]*)/;m&&!("name"in ie)&&oe(ie,"name",{configurable:!0,get:function(){try{return ce.call(this).match(ae)[1]}catch(t){return""}}});var ue=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,r){return function(t,e){if(S(t),!u(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(n,r),e?t.call(n,r):n.__proto__=r,n}}():void 0),le=G("match"),fe=function(t){var e;return u(t)&&(void 0!==(e=t[le])?!!e:"RegExp"==c(t))},se=function(){var t=S(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e},pe=b,ve=function(t){return"function"==typeof t?t:void 0},de=G("species"),ge=G("match"),he=k.f,ye=St.f,me=b.RegExp,be=me.prototype,xe=/a/g,we=/a/g,Ee=new me(xe)!==xe;if(Tt("RegExp",m&&(!Ee||y((function(){return we[ge]=!1,me(xe)!=xe||me(we)==we||"/a/i"!=me(xe,"i")}))))){for(var Oe=function(t,e){var n,r,o,i,c=this instanceof Oe,a=fe(t),l=void 0===e;return!c&&a&&t.constructor===Oe&&l?t:(n=Ee?new me(a&&!l?t.source:t,e):me((a=t instanceof Oe)?t.source:t,a&&l?se.call(t):e),r=Oe,(i=(c?this:be).constructor)!==r&&"function"==typeof i&&(o=i.prototype)!==r.prototype&&u(o)&&ue&&ue(n,o),n)},Se=function(t){t in Oe||he(Oe,t,{configurable:!0,get:function(){return me[t]},set:function(e){me[t]=e}})},je=ye(me),ke=0;ke<je.length;)Se(je[ke++]);be.constructor=Oe,Oe.prototype=be,ht(b,"RegExp",Oe)}!function(t){var e=function(t,e){return arguments.length<2?ve(pe[t])||ve(b[t]):pe[t]&&pe[t][e]||b[t]&&b[t][e]}(t),n=k.f;m&&e&&!e[de]&&n(e,de,{configurable:!0,get:function(){return this}})}("RegExp");var Pe=RegExp.prototype.exec,Ae=String.prototype.replace,_e=Pe,Ce=function(){var t=/a/,e=/b*/g;return Pe.call(t,"a"),Pe.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),Ie=void 0!==/()??/.exec("")[1];(Ce||Ie)&&(_e=function(t){var e,n,r,o,i=this;return Ie&&(n=new RegExp("^"+i.source+"$(?!\\s)",se.call(i))),Ce&&(e=i.lastIndex),r=Pe.call(i,t),Ce&&r&&(i.lastIndex=i.global?r.index+r[0].length:e),Ie&&r&&r.length>1&&Ae.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)})),r});var Me=_e;Dt({target:"RegExp",proto:!0,forced:/./.exec!==Me},{exec:Me});var Ne=/./.toString,Re=y((function(){return"/a/b"!=Ne.call({source:"a",flags:"b"})})),Te="toString"!=Ne.name;(Re||Te)&&ht(RegExp.prototype,"toString",(function(){var t=S(this);return"/".concat(t.source,"/","flags"in t?t.flags:!m&&t instanceof RegExp?se.call(t):void 0)}),{unsafe:!0});var $e=function(t,e,n){if(fe(e))throw TypeError("String.prototype."+n+" doesn't accept regex");return String(l(t))},De=G("match");Dt({target:"String",proto:!0,forced:!function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[De]=!1,"/./"[t](e)}catch(t){}}return!1}("includes")},{includes:function(t){return!!~$e(this,t,"includes").indexOf(t,arguments.length>1?arguments[1]:void 0)}});var Fe=function(t,e,n){return e+(n?function(t,e,n){var r,o,i=String(l(t)),c=v(e),a=i.length;return c<0||c>=a?n?"":void 0:(r=i.charCodeAt(c))<55296||r>56319||c+1===a||(o=i.charCodeAt(c+1))<56320||o>57343?n?i.charAt(c):r:n?i.slice(c,c+2):o-56320+(r-55296<<10)+65536}(t,e,!0).length:1)},Le=function(t,e){var n=t.exec;if("function"==typeof n){var r=n.call(t,e);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==c(t))throw TypeError("RegExp#exec called on incompatible receiver");return Me.call(t,e)},ze=G("species"),We=!y((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),Ge=!y((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),Ve=function(t,e,n,r){var o=G(t),i=!y((function(){var e={};return e[o]=function(){return 7},7!=""[t](e)})),c=i&&!y((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[ze]=function(){return n}),n[o](""),!e}));if(!i||!c||"replace"===t&&!We||"split"===t&&!Ge){var a=/./[o],u=n(o,""[t],(function(t,e,n,r,o){return e.exec===Me?i&&!o?{done:!0,value:a.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),l=u[0],f=u[1];ht(String.prototype,t,l),ht(RegExp.prototype,o,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}),r&&N(RegExp.prototype[o],"sham",!0)}},qe=Math.max,Be=Math.min,Ke=Math.floor,Ue=/\$([$&`']|\d\d?|<[^>]*>)/g,Ye=/\$([$&`']|\d\d?)/g;Ve("replace",2,(function(t,e,n){return[function(n,r){var o=l(this),i=null==n?void 0:n[t];return void 0!==i?i.call(n,o,r):e.call(String(o),n,r)},function(t,o){var i=n(e,t,this,o);if(i.done)return i.value;var c=S(t),a=String(this),u="function"==typeof o;u||(o=String(o));var l=c.global;if(l){var f=c.unicode;c.lastIndex=0}for(var s=[];;){var p=Le(c,a);if(null===p)break;if(s.push(p),!l)break;""===String(p[0])&&(c.lastIndex=Fe(a,g(c.lastIndex),f))}for(var d,h="",y=0,m=0;m<s.length;m++){p=s[m];for(var b=String(p[0]),x=qe(Be(v(p.index),a.length),0),w=[],E=1;E<p.length;E++)w.push(void 0===(d=p[E])?d:String(d));var O=p.groups;if(u){var j=[b].concat(w,x,a);void 0!==O&&j.push(O);var k=String(o.apply(void 0,j))}else k=r(b,a,x,w,O,o);x>=y&&(h+=a.slice(y,x)+k,y=x+b.length)}return h+a.slice(y)}];function r(t,n,r,o,i,c){var a=r+t.length,u=o.length,l=Ye;return void 0!==i&&(i=f(i),l=Ue),e.call(c,l,(function(e,c){var l;switch(c.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(a);case"<":l=i[c.slice(1,-1)];break;default:var f=+c;if(0===f)return e;if(f>u){var s=Ke(f/10);return 0===s?e:s<=u?void 0===o[s-1]?c.charAt(1):o[s-1]+c.charAt(1):e}l=o[f-1]}return void 0===l?"":l}))}}));var He=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e};function Je(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Qe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Xe(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Qe(Object(n),!0).forEach((function(e){Je(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Qe(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function Ze(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return tn(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return tn(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function tn(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Ve("search",1,(function(t,e,n){return[function(e){var n=l(this),r=null==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,t,this);if(r.done)return r.value;var o=S(t),i=String(this),c=o.lastIndex;He(c,0)||(o.lastIndex=0);var a=Le(o,i);return He(o.lastIndex,c)||(o.lastIndex=c),null===a?-1:a.index}]}));var en=function(e){var n=e.className,r=e.style,i=e.text,c=void 0===i?"":i;return t.createElement("div",{className:o("empty-placeholder",n),style:Xe(Xe({},r),{},{display:"flex",flexDirection:"column"})},t.createElement("img",{className:"empty-placeholder-image",src:"45664429793fdfb1.png",alt:"无"}),""!==c?t.createElement("div",{style:{display:"block",color:"#78828C"}},c):null)},nn=function(e){var n=e.name,r=e.icon,i=e.checked,c=e.onClick;return t.createElement("div",{className:o("multi-select-item",i?"multi-select-item--selected":void 0),title:n,onClick:function(){return c()}},t.createElement(Checkbox,{checked:i}),r?t.createElement("span",{className:"game-icon"},t.createElement("img",{width:"100%",src:r,onError:function(t){},alt:n})):null,t.createElement("div",{className:"multi-select-item-name"},n))},rn=[{key:1,name:"选项1"},{key:2,name:"选项2"},{key:3,name:"选项3"},{key:4,name:"选项4"}];export default function(i){var c=i.data,a=void 0===c?rn:c,u=i.value,l=i.onChange,f=i.search,s=void 0===f||f,p=i.width,v=Ze(useState([]),2),d=v[0],g=v[1],h=Ze(useState(!1),2),y=h[0],m=h[1],b=Ze(useState(a),2),x=b[0],w=b[1],E=Ze(useState(""),2),O=E[0],S=E[1],j=function(){m(!1),S("")},k=function(t){return d.includes(t)},P=useMemo((function(){return d.length&&x.length===d.length}),[x.length,d.length]),A=function(t){var e;e=t?k(t)?d.filter((function(e){return e!==t})):d.concat(t):P?[]:x.map((function(t){return t.key})),g(e)},_=function(){l&&l(d),j()},C=function(){g(u||[]),j()};useEffect((function(){w(a||[])}),[a]),useEffect((function(){g(u||[])}),[u]),useEffect((function(){y||g(u||[])}),[y]);var I;return t.createElement("div",{className:"multi-select"},t.createElement(e,{overlay:t.createElement("div",{className:"multi-select-dropdown",style:{width:p}},s?t.createElement("div",{className:"multi-select-dropdown-search-wrap"}):null,t.createElement("div",{className:"multi-select-dropdown-list"},(I=x.filter((function(t){return!!new RegExp(O.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&"),"i").test(t.name)}))).length?t.createElement(t.Fragment,null,!O&&t.createElement(nn,{name:"全部",checked:P,onClick:function(){return A()}}),I.map((function(e){return t.createElement(nn,{key:e.key,name:e.name,icon:e.icon,checked:k(e.key),onClick:function(){return A(e.key)}})}))):t.createElement(en,{style:{height:"200px"}})),t.createElement("div",{className:"multi-select-dropdown-footer"},t.createElement(n,{type:"primary",onClick:_,style:"120px"===p?{padding:"1px 4px"}:{}},"确定"),t.createElement(n,{onClick:C,style:"120px"===p?{padding:"1px 4px",marginLeft:"8px"}:{marginLeft:"8px"}},"取消"))),visible:y,onVisibleChange:m,trigger:["click"],getPopupContainer:function(t){return t.parentElement}},t.createElement("div",{className:"multi-select-value",style:p?{width:p}:{},onClick:function(){m(!0)}},P?"全部":d.length?"已选择".concat(d.length,"项"):t.createElement("div",{className:"task-select-placeholder"},"请选择"),t.createElement(r,{className:o("multi-select-arrow",y?"multi-select-arrow--rotate":void 0)}))))}