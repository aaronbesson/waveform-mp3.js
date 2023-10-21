"use strict";class t{constructor(){this.listeners={},this.on=this.addEventListener,this.un=this.removeEventListener}addEventListener(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.removeEventListener(t,i),this.removeEventListener(t,e)};return this.addEventListener(t,i),i}return()=>this.removeEventListener(t,e)}removeEventListener(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e)}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}function i(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const s={decode:function(t,e){return i(this,void 0,void 0,(function*(){const i=new AudioContext({sampleRate:e});return i.decodeAudioData(t).finally((()=>i.close()))}))},createBuffer:function(t,e){return"number"==typeof t[0]&&(t=[t]),function(t){const e=t[0];if(e.some((t=>t>1||t<-1))){const i=e.length;let s=0;for(let t=0;t<i;t++){const i=Math.abs(e[t]);i>s&&(s=i)}for(const e of t)for(let t=0;t<i;t++)e[t]/=s}}(t),{duration:e,length:t[0].length,sampleRate:t[0].length/e,numberOfChannels:t.length,getChannelData:e=>null==t?void 0:t[e],copyFromChannel:AudioBuffer.prototype.copyFromChannel,copyToChannel:AudioBuffer.prototype.copyToChannel}}};const n={fetchBlob:function(t,e,s){var n,r;return i(this,void 0,void 0,(function*(){const o=yield fetch(t,s);{const t=null===(n=o.clone().body)||void 0===n?void 0:n.getReader(),s=Number(null===(r=o.headers)||void 0===r?void 0:r.get("Content-Length"));let a=0;const h=(n,r)=>i(this,void 0,void 0,(function*(){if(n)return;a+=(null==r?void 0:r.length)||0;const i=Math.round(a/s*100);return e(i),null==t?void 0:t.read().then((({done:t,value:e})=>h(t,e)))}));null==t||t.read().then((({done:t,value:e})=>h(t,e)))}return o.blob()}))}};class r extends t{constructor(t){super(),this.isExternalMedia=!1,t.media?(this.media=t.media,this.isExternalMedia=!0):this.media=document.createElement("audio"),t.mediaControls&&(this.media.controls=!0),t.autoplay&&(this.media.autoplay=!0),null!=t.playbackRate&&this.onceMediaEvent("canplay",(()=>{null!=t.playbackRate&&(this.media.playbackRate=t.playbackRate)}))}onMediaEvent(t,e,i){return this.media.addEventListener(t,e,i),()=>this.media.removeEventListener(t,e)}onceMediaEvent(t,e){return this.onMediaEvent(t,e,{once:!0})}getSrc(){return this.media.currentSrc||this.media.src||""}revokeSrc(){const t=this.getSrc();t.startsWith("blob:")&&URL.revokeObjectURL(t)}setSrc(t,e){if(this.getSrc()===t)return;this.revokeSrc();const i=e instanceof Blob?URL.createObjectURL(e):t;this.media.src=i,this.media.load()}destroy(){this.media.pause(),this.isExternalMedia||(this.media.remove(),this.revokeSrc(),this.media.src="",this.media.load())}setMediaElement(t){this.media=t}play(){return this.media.play()}pause(){this.media.pause()}isPlaying(){return!this.media.paused&&!this.media.ended}setTime(t){this.media.currentTime=t}getDuration(){return this.media.duration}getCurrentTime(){return this.media.currentTime}getVolume(){return this.media.volume}setVolume(t){this.media.volume=t}getMuted(){return this.media.muted}setMuted(t){this.media.muted=t}getPlaybackRate(){return this.media.playbackRate}setPlaybackRate(t,e){null!=e&&(this.media.preservesPitch=e),this.media.playbackRate=t}getMediaElement(){return this.media}setSinkId(t){return this.media.setSinkId(t)}}class o extends t{constructor(t,e){super(),this.timeouts=[],this.isScrolling=!1,this.audioData=null,this.resizeObserver=null,this.isDragging=!1,this.options=t;const i=this.parentFromOptionsContainer(t.container);this.parent=i;const[s,n]=this.initHtml();i.appendChild(s),this.container=s,this.scrollContainer=n.querySelector(".scroll"),this.wrapper=n.querySelector(".wrapper"),this.canvasWrapper=n.querySelector(".canvases"),this.progressWrapper=n.querySelector(".progress"),this.cursor=n.querySelector(".cursor"),e&&n.appendChild(e),this.initEvents()}parentFromOptionsContainer(t){let e;if("string"==typeof t?e=document.querySelector(t):t instanceof HTMLElement&&(e=t),!e)throw new Error("Container not found");return e}initEvents(){const t=t=>{const e=this.wrapper.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientX-e.left;return[i/e.width,s/e.height]};this.wrapper.addEventListener("click",(e=>{const[i,s]=t(e);this.emit("click",i,s)})),this.wrapper.addEventListener("dblclick",(e=>{const[i,s]=t(e);this.emit("dblclick",i,s)})),this.options.dragToSeek&&this.initDrag(),this.scrollContainer.addEventListener("scroll",(()=>{const{scrollLeft:t,scrollWidth:e,clientWidth:i}=this.scrollContainer,s=t/e,n=(t+i)/e;this.emit("scroll",s,n)}));const e=this.createDelay(100);this.resizeObserver=new ResizeObserver((()=>{e((()=>this.reRender()))})),this.resizeObserver.observe(this.scrollContainer)}initDrag(){!function(t,e,i,s,n=5){let r=()=>{};if(!t)return r;const o=o=>{if(2===o.button)return;o.preventDefault(),o.stopPropagation(),t.style.touchAction="none";let a=o.clientX,h=o.clientY,l=!1;const d=s=>{s.preventDefault(),s.stopPropagation();const r=s.clientX,o=s.clientY;if(l||Math.abs(r-a)>=n||Math.abs(o-h)>=n){const{left:s,top:n}=t.getBoundingClientRect();l||(l=!0,null==i||i(a-s,h-n)),e(r-a,o-h,r-s,o-n),a=r,h=o}},c=t=>{l&&(t.preventDefault(),t.stopPropagation())},u=()=>{t.style.touchAction="",l&&(null==s||s()),r()};document.addEventListener("pointermove",d),document.addEventListener("pointerup",u),document.addEventListener("pointerleave",u),document.addEventListener("click",c,!0),r=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",u),document.removeEventListener("pointerleave",u),setTimeout((()=>{document.removeEventListener("click",c,!0)}),10)}};t.addEventListener("pointerdown",o)}(this.wrapper,((t,e,i)=>{this.emit("drag",Math.max(0,Math.min(1,i/this.wrapper.getBoundingClientRect().width)))}),(()=>this.isDragging=!0),(()=>this.isDragging=!1))}getHeight(){return null==this.options.height?128:isNaN(Number(this.options.height))?"auto"===this.options.height&&this.parent.clientHeight||128:Number(this.options.height)}initHtml(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"});return e.innerHTML=`\n      <style>\n        :host {\n          user-select: none;\n          min-width: 1px;\n        }\n        :host audio {\n          display: block;\n          width: 100%;\n        }\n        :host .scroll {\n          overflow-x: auto;\n          overflow-y: hidden;\n          width: 100%;\n          position: relative;\n        }\n        :host .noScrollbar {\n          scrollbar-color: transparent;\n          scrollbar-width: none;\n        }\n        :host .noScrollbar::-webkit-scrollbar {\n          display: none;\n          -webkit-appearance: none;\n        }\n        :host .wrapper {\n          position: relative;\n          overflow: visible;\n          z-index: 2;\n        }\n        :host .canvases {\n          min-height: ${this.getHeight()}px;\n        }\n        :host .canvases > div {\n          position: relative;\n        }\n        :host canvas {\n          display: block;\n          position: absolute;\n          top: 0;\n          image-rendering: pixelated;\n        }\n        :host .progress {\n          pointer-events: none;\n          position: absolute;\n          z-index: 2;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          overflow: hidden;\n        }\n        :host .progress > div {\n          position: relative;\n        }\n        :host .cursor {\n          pointer-events: none;\n          position: absolute;\n          z-index: 5;\n          top: 0;\n          left: 0;\n          height: 100%;\n          border-radius: 2px;\n        }\n      </style>\n\n      <div class="scroll" part="scroll">\n        <div class="wrapper" part="wrapper">\n          <div class="canvases"></div>\n          <div class="progress" part="progress"></div>\n          <div class="cursor" part="cursor"></div>\n        </div>\n      </div>\n    `,[t,e]}setOptions(t){if(this.options.container!==t.container){const e=this.parentFromOptionsContainer(t.container);e.appendChild(this.container),this.parent=e}t.dragToSeek&&!this.options.dragToSeek&&this.initDrag(),this.options=t,this.reRender()}getWrapper(){return this.wrapper}getScroll(){return this.scrollContainer.scrollLeft}destroy(){var t;this.container.remove(),null===(t=this.resizeObserver)||void 0===t||t.disconnect()}createDelay(t=10){const e={};return this.timeouts.push(e),i=>{e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout(i,t)}}convertColorValues(t){if(!Array.isArray(t))return t||"";if(t.length<2)return t[0]||"";const e=document.createElement("canvas"),i=e.getContext("2d").createLinearGradient(0,0,0,e.height),s=1/(t.length-1);return t.forEach(((t,e)=>{const n=e*s;i.addColorStop(n,t)})),i}renderBarWaveform(t,e,i,s){const n=t[0],r=t[1]||t[0],o=n.length,{width:a,height:h}=i.canvas,l=h/2,d=window.devicePixelRatio||1,c=e.barWidth?e.barWidth*d:1,u=e.barGap?e.barGap*d:e.barWidth?c/2:0,p=e.barRadius||0,m=a/(c+u)/o,v=p&&"roundRect"in i?"roundRect":"rect";i.beginPath();let g=0,f=0,y=0;for(let t=0;t<=o;t++){const o=Math.round(t*m);if(o>g){const t=Math.round(f*l*s),n=t+Math.round(y*l*s)||1;let r=l-t;"top"===e.barAlign?r=0:"bottom"===e.barAlign&&(r=h-n),i[v](g*(c+u),r,c,n,p),g=o,f=0,y=0}const a=Math.abs(n[t]||0),d=Math.abs(r[t]||0);a>f&&(f=a),d>y&&(y=d)}i.fill(),i.closePath()}renderLineWaveform(t,e,i,s){const n=e=>{const n=t[e]||t[0],r=n.length,{height:o}=i.canvas,a=o/2,h=i.canvas.width/r;i.moveTo(0,a);let l=0,d=0;for(let t=0;t<=r;t++){const r=Math.round(t*h);if(r>l){const t=a+(Math.round(d*a*s)||1)*(0===e?-1:1);i.lineTo(l,t),l=r,d=0}const o=Math.abs(n[t]||0);o>d&&(d=o)}i.lineTo(l,a)};i.beginPath(),n(0),n(1),i.fill(),i.closePath()}renderWaveform(t,e,i){if(i.fillStyle=this.convertColorValues(e.waveColor),e.renderFunction)return void e.renderFunction(t,i);let s=e.barHeight||1;if(e.normalize){const e=Array.from(t[0]).reduce(((t,e)=>Math.max(t,Math.abs(e))),0);s=e?1/e:1}e.barWidth||e.barGap||e.barAlign?this.renderBarWaveform(t,e,i,s):this.renderLineWaveform(t,e,i,s)}renderSingleCanvas(t,e,i,s,n,r,o,a){const h=window.devicePixelRatio||1,l=document.createElement("canvas"),d=t[0].length;l.width=Math.round(i*(r-n)/d),l.height=s*h,l.style.width=`${Math.floor(l.width/h)}px`,l.style.height=`${s}px`,l.style.left=`${Math.floor(n*i/h/d)}px`,o.appendChild(l);const c=l.getContext("2d");this.renderWaveform(t.map((t=>t.slice(n,r))),e,c);const u=l.cloneNode();a.appendChild(u);const p=u.getContext("2d");l.width>0&&l.height>0&&p.drawImage(l,0,0),p.globalCompositeOperation="source-in",p.fillStyle=this.convertColorValues(e.progressColor),p.fillRect(0,0,l.width,l.height)}renderChannel(t,e,i){const s=document.createElement("div"),n=this.getHeight();s.style.height=`${n}px`,this.canvasWrapper.style.minHeight=`${n}px`,this.canvasWrapper.appendChild(s);const r=s.cloneNode();this.progressWrapper.appendChild(r);const{scrollLeft:a,scrollWidth:h,clientWidth:l}=this.scrollContainer,d=t[0].length,c=d/h;let u=Math.min(o.MAX_CANVAS_WIDTH,l);if(e.barWidth||e.barGap){const t=e.barWidth||.5,i=t+(e.barGap||t/2);u%i!=0&&(u=Math.floor(u/i)*i)}const p=Math.floor(Math.abs(a)*c),m=Math.floor(p+u*c),v=m-p,g=(o,a)=>{this.renderSingleCanvas(t,e,i,n,Math.max(0,o),Math.min(a,d),s,r)},f=this.createDelay(),y=this.createDelay(),b=(t,e)=>{g(t,e),t>0&&f((()=>{b(t-v,e-v)}))},C=(t,e)=>{g(t,e),e<d&&y((()=>{C(t+v,e+v)}))};b(p,m),m<d&&C(m,m+v)}render(t){this.timeouts.forEach((t=>t.timeout&&clearTimeout(t.timeout))),this.timeouts=[],this.canvasWrapper.innerHTML="",this.progressWrapper.innerHTML="",this.wrapper.style.width="",null!=this.options.width&&(this.scrollContainer.style.width="number"==typeof this.options.width?`${this.options.width}px`:this.options.width);const e=window.devicePixelRatio||1,i=this.scrollContainer.clientWidth,s=Math.ceil(t.duration*(this.options.minPxPerSec||0));this.isScrolling=s>i;const n=this.options.fillParent&&!this.isScrolling,r=(n?i:s)*e;if(this.wrapper.style.width=n?"100%":`${s}px`,this.scrollContainer.style.overflowX=this.isScrolling?"auto":"hidden",this.scrollContainer.classList.toggle("noScrollbar",!!this.options.hideScrollbar),this.cursor.style.backgroundColor=`${this.options.cursorColor||this.options.progressColor}`,this.cursor.style.width=`${this.options.cursorWidth}px`,this.options.splitChannels)for(let e=0;e<t.numberOfChannels;e++){const i=Object.assign(Object.assign({},this.options),this.options.splitChannels[e]);this.renderChannel([t.getChannelData(e)],i,r)}else{const e=[t.getChannelData(0)];t.numberOfChannels>1&&e.push(t.getChannelData(1)),this.renderChannel(e,this.options,r)}this.audioData=t,this.emit("render")}reRender(){if(!this.audioData)return;const t=this.progressWrapper.clientWidth;this.render(this.audioData);const e=this.progressWrapper.clientWidth;this.scrollContainer.scrollLeft+=e-t}zoom(t){this.options.minPxPerSec=t,this.reRender()}scrollIntoView(t,e=!1){const{clientWidth:i,scrollLeft:s,scrollWidth:n}=this.scrollContainer,r=n*t,o=i/2;if(r>s+(e&&this.options.autoCenter&&!this.isDragging?o:i)||r<s)if(this.options.autoCenter&&!this.isDragging){const t=o/20;r-(s+o)>=t&&r<s+i?this.scrollContainer.scrollLeft+=t:this.scrollContainer.scrollLeft=r-o}else if(this.isDragging){const t=10;this.scrollContainer.scrollLeft=r<s?r-t:r-i+t}else this.scrollContainer.scrollLeft=r;{const{scrollLeft:t}=this.scrollContainer,e=t/n,s=(t+i)/n;this.emit("scroll",e,s)}}renderProgress(t,e){isNaN(t)||(this.progressWrapper.style.width=100*t+"%",this.cursor.style.left=100*t+"%",this.cursor.style.marginLeft=100===Math.round(100*t)?`-${this.options.cursorWidth}px`:"",this.isScrolling&&this.options.autoScroll&&this.scrollIntoView(t,e))}}o.MAX_CANVAS_WIDTH=4e3;class a extends t{constructor(){super(...arguments),this.unsubscribe=()=>{}}start(){this.unsubscribe=this.on("tick",(()=>{requestAnimationFrame((()=>{this.emit("tick")}))})),this.emit("tick")}stop(){this.unsubscribe()}destroy(){this.unsubscribe()}}class h extends t{constructor(t=new AudioContext){super(),this.bufferNode=null,this.autoplay=!1,this.playStartTime=0,this.playedDuration=0,this._muted=!1,this.buffer=null,this.currentSrc="",this.paused=!0,this.crossOrigin=null,this.audioContext=t,this.gainNode=this.audioContext.createGain(),this.gainNode.connect(this.audioContext.destination)}load(){return i(this,void 0,void 0,(function*(){}))}get src(){return this.currentSrc}set src(t){this.currentSrc=t,fetch(t).then((t=>t.arrayBuffer())).then((t=>this.audioContext.decodeAudioData(t))).then((t=>{this.buffer=t,this.emit("loadedmetadata"),this.emit("canplay"),this.autoplay&&this.play()}))}_play(){var t;this.paused&&(this.paused=!1,null===(t=this.bufferNode)||void 0===t||t.disconnect(),this.bufferNode=this.audioContext.createBufferSource(),this.bufferNode.buffer=this.buffer,this.bufferNode.connect(this.gainNode),this.playedDuration>=this.duration&&(this.playedDuration=0),this.bufferNode.start(this.audioContext.currentTime,this.playedDuration),this.playStartTime=this.audioContext.currentTime,this.bufferNode.onended=()=>{this.currentTime>=this.duration&&(this.pause(),this.emit("ended"))})}_pause(){var t;this.paused||(this.paused=!0,null===(t=this.bufferNode)||void 0===t||t.stop(),this.playedDuration+=this.audioContext.currentTime-this.playStartTime)}play(){return i(this,void 0,void 0,(function*(){this._play(),this.emit("play")}))}pause(){this._pause(),this.emit("pause")}setSinkId(t){return i(this,void 0,void 0,(function*(){return this.audioContext.setSinkId(t)}))}get playbackRate(){var t,e;return null!==(e=null===(t=this.bufferNode)||void 0===t?void 0:t.playbackRate.value)&&void 0!==e?e:1}set playbackRate(t){this.bufferNode&&(this.bufferNode.playbackRate.value=t)}get currentTime(){return this.paused?this.playedDuration:this.playedDuration+this.audioContext.currentTime-this.playStartTime}set currentTime(t){this.emit("seeking"),this.paused?this.playedDuration=t:(this._pause(),this.playedDuration=t,this._play()),this.emit("timeupdate")}get duration(){var t;return(null===(t=this.buffer)||void 0===t?void 0:t.duration)||0}get volume(){return this.gainNode.gain.value}set volume(t){this.gainNode.gain.value=t,this.emit("volumechange")}get muted(){return this._muted}set muted(t){this._muted!==t&&(this._muted=t,this._muted?this.gainNode.disconnect():this.gainNode.connect(this.audioContext.destination))}getGainNode(){return this.gainNode}}const l={waveColor:"#999",progressColor:"#555",cursorWidth:1,minPxPerSec:0,fillParent:!0,interact:!0,dragToSeek:!1,autoScroll:!0,autoCenter:!0,sampleRate:8e3};class d extends r{static create(t){return new d(t)}constructor(t){const e=t.media||("WebAudio"===t.backend?new h:void 0);super({media:e,mediaControls:t.mediaControls,autoplay:t.autoplay,playbackRate:t.audioRate}),this.plugins=[],this.decodedData=null,this.subscriptions=[],this.mediaSubscriptions=[],this.options=Object.assign({},l,t),this.timer=new a;const i=e?void 0:this.getMediaElement();this.renderer=new o(this.options,i),this.initPlayerEvents(),this.initRendererEvents(),this.initTimerEvents(),this.initPlugins();const s=this.options.url||this.getSrc();s?this.load(s,this.options.peaks,this.options.duration):this.options.peaks&&this.options.duration&&this.loadPredecoded()}initTimerEvents(){this.subscriptions.push(this.timer.on("tick",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),!0),this.emit("timeupdate",t),this.emit("audioprocess",t)})))}initPlayerEvents(){this.mediaSubscriptions.push(this.onMediaEvent("timeupdate",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),this.isPlaying()),this.emit("timeupdate",t)})),this.onMediaEvent("play",(()=>{this.emit("play"),this.timer.start()})),this.onMediaEvent("pause",(()=>{this.emit("pause"),this.timer.stop()})),this.onMediaEvent("emptied",(()=>{this.timer.stop()})),this.onMediaEvent("ended",(()=>{this.emit("finish")})),this.onMediaEvent("seeking",(()=>{this.emit("seeking",this.getCurrentTime())})))}initRendererEvents(){this.subscriptions.push(this.renderer.on("click",((t,e)=>{this.options.interact&&(this.seekTo(t),this.emit("interaction",t*this.getDuration()),this.emit("click",t,e))})),this.renderer.on("dblclick",((t,e)=>{this.emit("dblclick",t,e)})),this.renderer.on("scroll",((t,e)=>{const i=this.getDuration();this.emit("scroll",t*i,e*i)})),this.renderer.on("render",(()=>{this.emit("redraw")})));{let t;this.subscriptions.push(this.renderer.on("drag",(e=>{this.options.interact&&(this.renderer.renderProgress(e),clearTimeout(t),t=setTimeout((()=>{this.seekTo(e)}),this.isPlaying()?0:200),this.emit("interaction",e*this.getDuration()),this.emit("drag",e))})))}}initPlugins(){var t;(null===(t=this.options.plugins)||void 0===t?void 0:t.length)&&this.options.plugins.forEach((t=>{this.registerPlugin(t)}))}unsubscribePlayerEvents(){this.mediaSubscriptions.forEach((t=>t())),this.mediaSubscriptions=[]}setOptions(t){this.options=Object.assign({},this.options,t),this.renderer.setOptions(this.options),t.audioRate&&this.setPlaybackRate(t.audioRate),null!=t.mediaControls&&(this.getMediaElement().controls=t.mediaControls)}registerPlugin(t){return t.init(this),this.plugins.push(t),this.subscriptions.push(t.once("destroy",(()=>{this.plugins=this.plugins.filter((e=>e!==t))}))),t}getWrapper(){return this.renderer.getWrapper()}getScroll(){return this.renderer.getScroll()}getActivePlugins(){return this.plugins}loadPredecoded(){return i(this,void 0,void 0,(function*(){this.options.peaks&&this.options.duration&&(this.decodedData=s.createBuffer(this.options.peaks,this.options.duration),yield Promise.resolve(),this.renderDecoded())}))}renderDecoded(){return i(this,void 0,void 0,(function*(){this.decodedData&&(this.emit("decode",this.getDuration()),this.renderer.render(this.decodedData))}))}loadAudio(t,e,r,o){return i(this,void 0,void 0,(function*(){if(this.emit("load",t),!this.options.media&&this.isPlaying()&&this.pause(),this.decodedData=null,!e&&!r){const i=t=>this.emit("loading",t);e=yield n.fetchBlob(t,i,this.options.fetchParams)}if(this.setSrc(t,e),o=(yield Promise.resolve(o||this.getDuration()))||(yield new Promise((t=>{this.onceMediaEvent("loadedmetadata",(()=>t(this.getDuration())))})))||(yield Promise.resolve(0)),r)this.decodedData=s.createBuffer(r,o);else if(e){const t=yield e.arrayBuffer();this.decodedData=yield s.decode(t,this.options.sampleRate)}this.renderDecoded(),this.emit("ready",this.getDuration())}))}load(t,e,s){return i(this,void 0,void 0,(function*(){yield this.loadAudio(t,void 0,e,s)}))}loadBlob(t,e,s){return i(this,void 0,void 0,(function*(){yield this.loadAudio("blob",t,e,s)}))}zoom(t){if(!this.decodedData)throw new Error("No audio loaded");this.renderer.zoom(t),this.emit("zoom",t)}getDecodedData(){return this.decodedData}exportPeaks({channels:t=2,maxLength:e=8e3,precision:i=1e4}={}){if(!this.decodedData)throw new Error("The audio has not been decoded yet");const s=Math.min(t,this.decodedData.numberOfChannels),n=[];for(let t=0;t<s;t++){const s=this.decodedData.getChannelData(t),r=[],o=Math.round(s.length/e);for(let t=0;t<e;t++){const e=s.slice(t*o,(t+1)*o),n=Math.max(...e);r.push(Math.round(n*i)/i)}n.push(r)}return n}getDuration(){let t=super.getDuration()||0;return 0!==t&&t!==1/0||!this.decodedData||(t=this.decodedData.duration),t}toggleInteraction(t){this.options.interact=t}seekTo(t){const e=this.getDuration()*t;this.setTime(e)}playPause(){return i(this,void 0,void 0,(function*(){return this.isPlaying()?this.pause():this.play()}))}stop(){this.pause(),this.setTime(0)}skip(t){this.setTime(this.getCurrentTime()+t)}empty(){this.load("",[[0]],.001)}setMediaElement(t){this.unsubscribePlayerEvents(),super.setMediaElement(t),this.initPlayerEvents()}destroy(){this.emit("destroy"),this.plugins.forEach((t=>t.destroy())),this.subscriptions.forEach((t=>t())),this.unsubscribePlayerEvents(),this.timer.destroy(),this.renderer.destroy(),super.destroy()}}const c={height:50,overlayColor:"rgba(100, 100, 100, 0.1)",insertPosition:"afterend"};class u extends e{constructor(t){super(t),this.miniWavesurfer=null,this.container=null,this.options=Object.assign({},c,t),this.minimapWrapper=this.initMinimapWrapper(),this.overlay=this.initOverlay()}static create(t){return new u(t)}onInit(){var t,e;if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");this.options.container?("string"==typeof this.options.container?this.container=document.querySelector(this.options.container):this.options.container instanceof HTMLElement&&(this.container=this.options.container),null===(t=this.container)||void 0===t||t.appendChild(this.minimapWrapper)):(this.container=this.wavesurfer.getWrapper().parentElement,null===(e=this.container)||void 0===e||e.insertAdjacentElement(this.options.insertPosition,this.minimapWrapper)),this.initWaveSurferEvents()}initMinimapWrapper(){const t=document.createElement("div");return t.style.position="relative",t.setAttribute("part","minimap"),t}initOverlay(){const t=document.createElement("div");return t.setAttribute("style","position: absolute; z-index: 2; left: 0; top: 0; bottom: 0; transition: left 100ms ease-out; pointer-events: none;"),t.style.backgroundColor=this.options.overlayColor,this.minimapWrapper.appendChild(t),t}initMinimap(){if(this.miniWavesurfer&&(this.miniWavesurfer.destroy(),this.miniWavesurfer=null),!this.wavesurfer)return;const t=this.wavesurfer.getDecodedData(),e=this.wavesurfer.getMediaElement();t&&e&&(this.miniWavesurfer=d.create(Object.assign(Object.assign({},this.options),{container:this.minimapWrapper,minPxPerSec:0,fillParent:!0,media:e,peaks:[t.getChannelData(0)],duration:t.duration})),this.subscriptions.push(this.miniWavesurfer.on("ready",(()=>{this.emit("ready")})),this.miniWavesurfer.on("interaction",(()=>{this.emit("interaction")}))))}getOverlayWidth(){var t;const e=(null===(t=this.wavesurfer)||void 0===t?void 0:t.getWrapper().clientWidth)||1;return Math.round(this.minimapWrapper.clientWidth/e*100)}onRedraw(){const t=this.getOverlayWidth();this.overlay.style.width=`${t}%`}onScroll(t){if(!this.wavesurfer)return;const e=this.wavesurfer.getDuration();this.overlay.style.left=t/e*100+"%"}initWaveSurferEvents(){this.wavesurfer&&this.subscriptions.push(this.wavesurfer.on("decode",(()=>{this.initMinimap()})),this.wavesurfer.on("scroll",(t=>{this.onScroll(t)})),this.wavesurfer.on("redraw",(()=>{this.onRedraw()})))}destroy(){var t;null===(t=this.miniWavesurfer)||void 0===t||t.destroy(),this.minimapWrapper.remove(),super.destroy()}}module.exports=u;
