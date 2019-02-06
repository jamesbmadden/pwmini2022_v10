!function(t){function e(e){for(var s,i,o=e[0],r=e[1],a=0,c=[];a<o.length;a++)i=o[a],n[i]&&c.push(n[i][0]),n[i]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);for(l&&l(e);c.length;)c.shift()()}var s={},n={2:0};function i(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],s=n[t];if(0!==s)if(s)e.push(s[2]);else{var o=new Promise(function(e,i){s=n[t]=[e,i]});e.push(s[2]=o);var r,a=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=function(t){return i.p+""+t+".main.js"}(t),r=function(e){l.onerror=l.onload=null,clearTimeout(c);var s=n[t];if(0!==s){if(s){var i=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+i+": "+o+")");r.type=i,r.request=o,s[1](r)}n[t]=void 0}};var c=setTimeout(function(){r({type:"timeout",target:l})},12e4);l.onerror=l.onload=r,a.appendChild(l)}return Promise.all(e)},i.m=t,i.c=s,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i.oe=function(t){throw console.error(t),t};var o=window.webpackJsonp=window.webpackJsonp||[],r=o.push.bind(o);o.push=e,o=o.slice();for(var a=0;a<o.length;a++)e(o[a]);var l=r;i(i.s=3)}([function(t,e,s){"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const n=new WeakMap,i=t=>"function"==typeof t&&n.has(t),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,s=null)=>{let n=e;for(;n!==s;){const e=n.nextSibling;t.removeChild(n),n=e}},a={},l={},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,p=new RegExp(`${c}|${d}`),u="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;let s=-1,n=0;const i=[],o=e=>{const r=e.content,a=document.createTreeWalker(r,133,null,!1);let l=0;for(;a.nextNode();){s++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const i=e.attributes;let o=0;for(let t=0;t<i.length;t++)i[t].value.indexOf(c)>=0&&o++;for(;o-- >0;){const i=t.strings[n],o=g.exec(i)[2],r=o.toLowerCase()+u,a=e.getAttribute(r).split(p);this.parts.push({type:"attribute",index:s,name:o,strings:a}),e.removeAttribute(r),n+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(c)>=0){const o=e.parentNode,r=t.split(p),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?f():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++s});""===r[a]?(o.insertBefore(f(),e),i.push(e)):e.data=r[a],n+=a}}else if(8===e.nodeType)if(e.data===c){const t=e.parentNode;null!==e.previousSibling&&s!==l||(s++,t.insertBefore(f(),e)),l=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(i.push(e),s--),n++}else{let t=-1;for(;-1!==(t=e.data.indexOf(c,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of i)t.parentNode.removeChild(t)}}const m=t=>-1!==t.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,n=0;const i=t=>{const o=document.createTreeWalker(t,133,null,!1);let r=o.nextNode();for(;s<e.length&&null!==r;){const t=e[s];if(m(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));s++}else n++,"TEMPLATE"===r.nodeName&&i(r.content),r=o.nextNode();else this._parts.push(void 0),s++}};return i(t),o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class v{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],n=g.exec(t);e+=n?t.substr(0,n.index)+n[1]+n[2]+u+n[3]+c:t+d}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const b=t=>null===t||!("object"==typeof t||"function"==typeof t);class _{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||b(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=f()),t._insert(this.endNode=f())}insertAfterPart(t){t._insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}const t=this._pendingValue;t!==a&&(b(t)?t!==this.value&&this._commitText(t):t instanceof v?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===l?(this.value=l,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value&&this.value.template===e)this.value.update(t.values);else{const s=new y(e,t.processor,this.options),n=s._clone();s.update(t.values),this._commitNode(n),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const i of t)void 0===(s=e[n])&&(s=new w(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=a}}class P extends _{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends S{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;i(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=T(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const A=new class{handleAttributeExpressions(t,e,s,n){const i=e[0];return"."===i?new P(t,e.slice(1),s).parts:"@"===i?[new E(t,e.slice(1),n.eventContext)]:"?"===i?[new x(t,e.slice(1),s)]:new _(t,e,s).parts}handleTextExpression(t){return new w(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function O(t){let e=k.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},k.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(c);return void 0===(s=e.keyString.get(n))&&(s=new h(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const k=new Map,I=new WeakMap,M=(t,...e)=>new v(t,e,"html",A),V=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function $(t,e){const{element:{content:s},parts:n}=t,i=document.createTreeWalker(s,V,null,!1);let o=L(n),r=n[o],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,r=n[o=L(n,o)]}c.forEach(t=>t.parentNode.removeChild(t))}const j=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,V,null,!1);for(;s.nextNode();)e++;return e},L=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(m(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const R=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1);const U=t=>e=>{const s=R(e.type,t);let n=k.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},k.set(s,n));let i=n.stringsArray.get(e.strings);if(void 0!==i)return i;const o=e.strings.join(c);if(void 0===(i=n.keyString.get(o))){const s=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(s,t),i=new h(e,s),n.keyString.set(o,i)}return n.stringsArray.set(e.strings,i),i},B=["html","svg"],q=new Set,F=(t,e,s)=>{q.add(s);const n=t.querySelectorAll("style");if(0===n.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,s);const i=document.createElement("style");for(let t=0;t<n.length;t++){const e=n[t];e.parentNode.removeChild(e),i.textContent+=e.textContent}if((t=>{B.forEach(e=>{const s=k.get(R(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),$(t,s)})})})(s),function(t,e,s=null){const{element:{content:n},parts:i}=t;if(null==s)return void n.appendChild(e);const o=document.createTreeWalker(n,V,null,!1);let r=L(i),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===s&&(a=j(e),s.parentNode.insertBefore(e,s));-1!==r&&i[r].index===l;){if(a>0){for(;-1!==r;)i[r].index+=a,r=L(i,r);return}r=L(i,r)}}(e,i,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(i,e.element.content.firstChild);const t=new Set;t.add(i),$(e,t)}},H=(t,e)=>t,D=(t,e)=>{if(t in e)for(;e!==Object.prototype;){if(e.hasOwnProperty(t))return Object.getOwnPropertyDescriptor(e,t);e=Object.getPrototypeOf(e)}},W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),Z={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:J},K=Promise.resolve(!0),G=1,Q=4,X=8,Y=16,tt=32;class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=K,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const t=[];for(const[e,s]of this._classProperties){const n=this._attributeNameForProperty(e,s);void 0!==n&&(this._attributeToPropertyMap.set(n,e),t.push(n))}return t}static _ensureClassProperties(){if(!this.hasOwnProperty(H("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Z){if(this._ensureClassProperties(),this._classProperties.set(t,e),!e.noAccessor){const e=D(t,this.prototype);let s;if(void 0!==e&&e.set&&e.get){const{set:n,get:i}=e;s={get(){return i.call(this)},set(e){const s=this[t];n.call(this,e),this.requestUpdate(t,s)},configurable:!0,enumerable:!0}}else{const e="symbol"==typeof t?Symbol():`__${t}`;s={get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n)},configurable:!0,enumerable:!0}}Object.defineProperty(this.prototype,t,s)}}static _finalize(){if(this.hasOwnProperty(H("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t._finalize&&t._finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(H("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=J){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,n=e.converter||W,i="function"==typeof n?n:n.fromAttribute;return i?i(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,n=e.converter;return(n&&n.toAttribute||W.toAttribute)(t,s)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){for(const[t]of this.constructor._classProperties)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}_applyInstanceProperties(){for(const[t,e]of this._instanceProperties)this[t]=e;this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|tt,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=Z){const n=this.constructor,i=n._attributeNameForProperty(t,s);if(void 0!==i){const t=n._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|X,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=this._updateState&~X}}_attributeToProperty(t,e){if(this._updateState&X)return;const s=this.constructor,n=s._attributeToPropertyMap.get(t);if(void 0!==n){const t=s._classProperties.get(n)||Z;this._updateState=this._updateState|Y,this[n]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}requestUpdate(t,e){let s=!0;if(void 0!==t&&!this._changedProperties.has(t)){const n=this.constructor,i=n._classProperties.get(t)||Z;n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.set(t,e),!0!==i.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}return!this._hasRequestedUpdate&&s&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let t;this._updateState=this._updateState|Q;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);const s=this.performUpdate();null!=s&&"function"==typeof s.then&&await s,t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&tt}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&G}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[t,e]of this._reflectingProperties)this._propertyToAttribute(t,this[t],e);this._reflectingProperties=void 0}}updated(t){}firstUpdated(t){}}et.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
it((t,e)=>t.querySelector(e)),it((t,e)=>t.querySelectorAll(e));const st=(t,e,s)=>{Object.defineProperty(e,s,t)},nt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});function it(t){return e=>(s,n)=>{const i={get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0};return void 0!==n?st(i,s,n):nt(i,s)}}const ot="adoptedStyleSheets"in Document.prototype;class rt{constructor(t){this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(ot?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}}const at=(t,...e)=>{const s=e.reduce((e,s,n)=>e+(t=>{if(t instanceof rt)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}.`)})(s)+t[n+1],t[0]);return new rt(s)};s.d(e,"a",function(){return lt}),s.d(e,"c",function(){return M}),s.d(e,"b",function(){return at});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class lt extends et{static get styles(){return[]}static get _uniqueStyles(){if(void 0===this._styles){const t=this.styles.reduceRight((t,e)=>(t.add(e),t),new Set);this._styles=[],t.forEach(t=>this._styles.unshift(t))}return this._styles}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._uniqueStyles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ot?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof v&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._uniqueStyles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}lt.finalized=!0,lt.render=((t,e,s)=>{const n=s.scopeName,i=I.has(e),o=e instanceof ShadowRoot&&z&&t instanceof v,a=o&&!q.has(n),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=I.get(e);void 0===n&&(r(e,e.firstChild),I.set(e,n=new w(Object.assign({templateFactory:O},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:U(n)},s)),a){const t=I.get(l);I.delete(l),t.value instanceof y&&F(l,t.value.template,n),r(e,e.firstChild),e.appendChild(l),I.set(e,t)}!i&&o&&window.ShadyCSS.styleElement(e.host)})},function(t,e,s){"use strict";s.d(e,"b",function(){return n}),s.d(e,"a",function(){return i});const n="#f44336",i=["1.1","1.2","1.3","1.4","2.1","2.2","2.3","2.4"]},function(t,e){
/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
!function(){"use strict";!function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.hasOwnProperty("polyfillWrapFlushCallback"))return;const t=HTMLElement;window.HTMLElement=function(){return Reflect.construct(t,[],this.constructor)},HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}()}()},function(t,e,s){"use strict";s.r(e);s(2);var n=s(0),i=s(1);var o={};Promise.all([s.e(0),s.e(6)]).then(s.t.bind(null,48,7)).then(t=>{(o=t).initializeApp({apiKey:"AIzaSyD-L3rjWDvUVc1TMDZ_t8xeWZrkhjPM3Fw",authDomain:"powmini2022.firebaseapp.com",databaseURL:"https://powmini2022.firebaseio.com",projectId:"powmini2022",storageBucket:"gs://powmini2022.appspot.com",messagingSenderId:"360649481185"}),document.dispatchEvent(new CustomEvent("firebase-loaded")),Promise.all([s.e(0),s.e(7)]).then(s.bind(null,49)).then(t=>{document.dispatchEvent(new CustomEvent("firebase-auth-loaded"))})}),Promise.all([s.e(5),s.e(1)]).then(s.bind(null,52)).then(t=>{console.log("Classes Loaded")}),s.e(3).then(s.bind(null,50)).then(t=>{console.log("Me Loaded")}),s.e(4).then(s.bind(null,51)).then(t=>{console.log("Mini Loaded")});customElements.define("app-state",class extends n.a{static get properties(){return{signedIn:{type:Boolean},state:{type:String},user:{type:Object},userData:{type:Object},loading:{type:Boolean},mini:{type:Array}}}constructor(){super(),this.state="classes",this.mini=[],this.userData={classes:{},homework:[],events:[]},this.loading=!0,document.addEventListener("auth",t=>{console.log(t),t.detail.signedIn&&(console.log("getting user "+t.detail.email),o.auth().signInWithEmailAndPassword(t.detail.email,t.detail.password),this.loading=!0)}),document.addEventListener("firebase-auth-loaded",()=>{this.loading=!1,o.auth().onAuthStateChanged(t=>{t?(this.user=t,this.signedIn=!0,fetch(`https://powmini2022.firebaseapp.com/api/user/${t.email}`).then(t=>t.json()).then(t=>{this.userData=t,console.log(this.userData)})):this.signedIn=!1})}),document.addEventListener("set-page",t=>{this.state=t.detail.page}),fetch("https://us-central1-powmini2022.cloudfunctions.net/miniEvents").then(t=>t.json()).then(t=>{this.mini=t})}signOut(){o.auth().signOut()}getPage(t){switch(t){case"classes":return n.c`<classes-page .user=${this.userData}></classes-page>`;case"mini":return n.c`<mini-page .mini=${this.mini}></mini-page>`;case"me":return n.c`<me-page .user=${this.user} .userData=${this.userData} .signOut=${this.signOut}></me-page>`;default:return n.c`<p>loading...</p>`}}get bottomAppBarTabs(){return[{title:"Mini",icon:"school",page:"mini"},{title:"Classes",icon:"book",page:"classes"},{title:"Me",icon:"person",page:"me"}]}get selectedInt(){return["mini","classes","me"].indexOf(this.state)}render(){return this.signedIn?n.c`
        ${this.getPage(this.state)}
        <bottom-app-bar .tabs=${this.bottomAppBarTabs} .selected=${this.selectedInt}></bottom-app-bar>
      `:n.c`${this.loading?n.c`<p>loading...</p>`:n.c`<sign-in></sign-in>`}`}}),customElements.define("sign-in",class extends n.a{static get properties(){return{state:{type:String},username:{type:String},password:{type:String},loading:{type:Boolean}}}constructor(){super(),this.state="Sign In",this.loading=!1,this.username||(this.username=""),this.password||(this.password="")}render(){return this.loading?n.c`<p>loading...</p>`:n.c`
        <style>
          :host {
            position:absolute;
            left:0px;
            width:100%;
            top:0px;
            height:100%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
          }
        </style>
        <h1>${this.state}</h1>
        <graviton-input type="email" id="username" autocomplete="email" name="username" .value=${this.username} @input=${t=>{this.username=t.target.value}}>Email</graviton-input><br>
        <graviton-input type="password" autocomplete="${"Sign In"==this.state?"password":"new-password"}" id="password" name="password" .value=${this.password} @input=${t=>{this.password=t.target.value}}>Password</graviton-input><br>
        ${"Sign Up"==this.state?n.c`
          <graviton-input type="password" autocomplete="new-password" id="verifyPassword" name="verifyPassword">Retype Password</graviton-input><br>
          `:""}
        <div><graviton-button @click="${()=>{"Sign In"==this.state&&(this.loading=!0,document.dispatchEvent(new CustomEvent("auth",{detail:{signedIn:!0,email:this.username,password:this.password}})))}}">${this.state}</graviton-button><graviton-button @click="${()=>{this.state="Sign In"==this.state?"Sign Up":"Sign In"}}">${"Sign In"==this.state?"Sign Up":"Sign In"}</graviton-button></div><br>
      `}}),customElements.define("graviton-button",class extends n.a{render(){return n.c`
      <style>
        .btn {
          box-sizing:border-box;
          display:inline-block;
          background-color:${i.b};
          min-width:4rem;
          height:2.25rem;
          padding:0rem 1rem;
          border:0px;
          color:white;
          border-radius:1.125rem;
          box-shadow: 0px 3px 6px rgba(244, 67, 54, 0.16);
          cursor:pointer;
          overflow:hidden;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        }
        .btn-wrapping {
          display:inline-block;
          margin:0.25rem 0rem;
        }
      </style>
      <div class="btn-wrapping">
        <button class="btn">
          <slot></slot>
          <mwc-ripple primary unbounded></mwc-ripple>
        </button>
      </div>
    `}}),customElements.define("graviton-input",class extends n.a{static get properties(){return{type:String,autocomplete:String,value:String}}constructor(){super(),null==this.value&&(this.value="")}render(){return n.c`
              <style>
                * {
                  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                }
                .fieldInput {
                  box-sizing:border-box;
                  padding:0px 12px;
                  min-width:17.5rem;
                  height:3.5rem;
                  background:transparent;
                  border:0px;
                  position:relative;
                  font-size:16pt;
                  z-index:3;
                }
                .highlight {
                  content:"";
                  position:absolute;
                  bottom:0px;
                  width:100%;
                  height:1px;
                  background-color:#bdbdbd;
                  transition:color 0.2s cubic-bezier(1,0,0,1);
                  pointer-events:none;
                }
                .fieldInputLabel {
                  z-index:1;
                  position:absolute;
                  top:12.5px;
                  left:2px;
                  color:#222;
                  transition:transform 0.2s cubic-bezier(1,0,0,1), font-size 0.2s cubic-bezier(1,0,0,1), color 0.2s cubic-bezier(1,0,0,1);
                  transform:translate(0px,-24px);
                  font-size:12px;
                  pointer-events:none;
                }
                supports:placeholder-shown,.fieldInputLabel {
                  transform:translate(0px,0px);
                  font-size:16px;
                }
                .fieldInput:focus {
                  outline: none;
                }
                .fieldInput:focus ~ .highlight {
                  background-color:${i.b};
                }
                .fieldInput:focus ~ .fieldInputLabel {
                  color:${i.b};
                }
                .fieldInput:focus ~ .fieldInputLabel, .fieldInput:not(:placeholder-shown) ~ .fieldInputLabel {
                  transform:translate(0px,-24px);
                  font-size:12px;
                }
                .inputContainer {
                  position:relative;
                  margin-top:12px;
                }
              </style>
              <div class="inputContainer">
                <input .value=${this.value} @input=${t=>{this.value=t.target.value}} class="fieldInput" placeholder=" " type="${this.type}" autocomplete="${this.autocomplete}">
                <label class="fieldInputLabel"><slot></slot></label>
                <div class="highlight"></div>
              </div>`}})}]);