"use strict";class t{constructor(){this.listeners={},this.on=this.addEventListener,this.un=this.removeEventListener}addEventListener(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.removeEventListener(t,i),this.removeEventListener(t,e)};return this.addEventListener(t,i),i}return()=>this.removeEventListener(t,e)}removeEventListener(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e)}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}const i={height:20,formatTimeCallback:t=>{if(t/60>1){return`${Math.floor(t/60)}:${`${(t=Math.round(t%60))<10?"0":""}${t}`}`}return`${Math.round(1e3*t)/1e3}`}};class n extends e{constructor(t){super(t||{}),this.options=Object.assign({},i,t),this.timelineWrapper=this.initTimelineWrapper()}static create(t){return new n(t)}onInit(){if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");let t=this.wavesurfer.getWrapper();if(this.options.container instanceof HTMLElement)t=this.options.container;else if("string"==typeof this.options.container){const e=document.querySelector(this.options.container);if(!e)throw Error(`No Timeline container found matching ${this.options.container}`);t=e}this.options.insertPosition?(t.firstElementChild||t).insertAdjacentElement(this.options.insertPosition,this.timelineWrapper):t.appendChild(this.timelineWrapper),this.options.duration?this.initTimeline(this.options.duration):this.subscriptions.push(this.wavesurfer.on("redraw",(()=>{var t;this.initTimeline((null===(t=this.wavesurfer)||void 0===t?void 0:t.getDuration())||0)})))}destroy(){this.timelineWrapper.remove(),super.destroy()}initTimelineWrapper(){const t=document.createElement("div");return t.setAttribute("part","timeline"),t}defaultTimeInterval(t){return t>=25?1:5*t>=25?5:15*t>=25?15:60*Math.ceil(.5/t)}defaultPrimaryLabelInterval(t){return t>=25?10:5*t>=25?6:4}defaultSecondaryLabelInterval(t){return t>=25?5:2}initTimeline(t){var e,i,n;const s=this.timelineWrapper.scrollWidth/t,r=null!==(e=this.options.timeInterval)&&void 0!==e?e:this.defaultTimeInterval(s),o=null!==(i=this.options.primaryLabelInterval)&&void 0!==i?i:this.defaultPrimaryLabelInterval(s),l=this.options.primaryLabelSpacing,a=null!==(n=this.options.secondaryLabelInterval)&&void 0!==n?n:this.defaultSecondaryLabelInterval(s),h=this.options.secondaryLabelSpacing,p="beforebegin"===this.options.insertPosition,d=document.createElement("div");if(d.setAttribute("style",`\n      height: ${this.options.height}px;\n      overflow: hidden;\n      font-size: ${this.options.height/2}px;\n      white-space: nowrap;\n      position: relative;\n    `),p){const t="\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 2;\n      ";d.setAttribute("style",d.getAttribute("style")+t)}"string"==typeof this.options.style?d.setAttribute("style",d.getAttribute("style")+this.options.style):"object"==typeof this.options.style&&Object.assign(d.style,this.options.style);const u=document.createElement("div");u.setAttribute("part","timeline-notch"),u.setAttribute("style",`\n      width: 0;\n      height: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: ${p?"flex-start":"flex-end"};\n      ${p?"top: 0;":"bottom: 0;"}\n      overflow: visible;\n      border-left: 1px solid currentColor;\n      opacity: 0.25;\n      position: absolute;\n      z-index: 1;\n    `);for(let e=0,i=0;e<t;e+=r,i++){const t=u.cloneNode(),n=Math.round(100*e)/100%o==0||l&&i%l==0,r=Math.round(100*e)/100%a==0||h&&i%h==0;(n||r)&&(t.style.height="100%",t.style.textIndent="3px",t.textContent=this.options.formatTimeCallback(e),n&&(t.style.opacity="1")),t.style.left=e*s+"px",d.appendChild(t)}this.timelineWrapper.innerHTML="",this.timelineWrapper.appendChild(d),this.emit("ready")}}module.exports=n;
