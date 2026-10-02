"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[672],{4672:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});var n=r(5155),i=r(2115);let o=`
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`,a=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const int TRAIL = 8;
const int PULSES = 3;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uHover;
uniform float uReach;
uniform float uSway;
uniform float uRush;
uniform vec3  uTrail[TRAIL];
uniform vec3  uPulse[PULSES];
uniform vec3  uBg;
uniform vec3  uBase;
uniform vec3  uAccent;
uniform vec3  uHigh;
uniform float uDensity;
uniform float uWidth;
uniform float uSpread;
uniform float uStriation;

float sat(float x) { return clamp(x, 0.0, 1.0); }

float h21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.56);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = h21(i), b = h21(i + vec2(1.0, 0.0));
    float c = h21(i + vec2(0.0, 1.0)), d = h21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm5(vec2 p) {
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
    return s;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float t = uTime;

    float rx  = max(uReach, 0.02);
    float rx2 = rx * rx;

    float lift = 0.0, blob = 0.0, cenY = 0.0, cenW = 0.0;
    for (int i = 0; i < TRAIL; i++) {
        vec3 s = uTrail[i];
        float dx = uv.x - s.x;
        float dy = uv.y - s.y;
        float gx = s.z * exp(-(dx * dx) / rx2);
        lift += gx;
        blob += gx * exp(-(dy * dy) / (rx2 * 2.6));
        cenY += gx * s.y;
        cenW += gx;
    }
    float trailY = cenY / max(cenW, 1e-4);

    float ring = 0.0;
    for (int i = 0; i < PULSES; i++) {
        vec3 p = uPulse[i];
        float d = abs(uv.x - p.x) - p.y;
        ring += p.z * exp(-(d * d) / 0.0012);
    }

    lift = (min(lift, 2.0) + ring * 0.9) * uHover;
    blob = min(blob, 1.5) * uHover;

    float nearP = exp(-pow(uv.x - uMouse.x, 2.0) / (rx2 * 4.0));
    float xw = uv.x - uSway * 0.09 * (0.25 + 0.75 * nearP) * uHover;

    float n1 = fbm5(vec2(xw * 6.5 * uDensity, t * 0.045));
    float n2 = fbm5(vec2(xw * 24.0 * uDensity + 3.1, t * 0.075));
    float n3 = vnoise(vec2(xw * 210.0 * uDensity, t * 0.04));
    float n4 = vnoise(vec2(xw * 70.0 * uDensity, 4.0 + t * 0.03));

    float band = pow(sat(n1 * 1.30 + n2 * 0.80 - 0.58 + lift * 0.34), 1.95);
    band *= 0.62 + 0.70 * n4;

    float yc = 0.50 + 0.24 * uSpread * (fbm5(vec2(xw * 3.1 * uDensity, 11.0)) - 0.5) * 2.0;
    yc = mix(yc, trailY, sat(cenW * 1.1) * uHover * 0.45);

    float wdt = uWidth * (0.22 + 0.28 * n2 + 0.10 * n1) * (1.0 + 0.5 * uRush * sat(lift));
    float prof = exp(-pow(abs(uv.y - yc) / max(wdt, 0.02), 1.75));

    float inten = band * prof * (1.0 - uStriation * 0.5 + uStriation * n3);

    float blend = sat(n1 * 1.30 - n2 * 0.55 + 0.28);
    vec3 c = mix(uBase, uAccent, blend);
    float amber = sat((n2 - 0.70) * 5.2) * sat(n1 * 1.6 - 0.35);
    c = mix(c, uHigh, amber * 0.85);

    vec3 col = uBg;
    col += c * pow(inten, 0.88) * 1.42;
    col += vec3(1.0, 0.94, 1.0) * pow(inten, 4.5) * 0.65;
    col += c * 0.30 * pow(sat(prof * band * 3.0), 0.70);
    col += c * 0.10 * pow(sat(prof * 1.2), 1.3);

    col += mix(uAccent, uHigh, sat(uRush)) * blob * (0.22 + 0.16 * uRush);

    col += mix(uAccent, uHigh, 0.35) * ring * prof * 0.75 * uHover;
    col += vec3(1.0, 0.95, 0.92) * pow(ring, 3.0) * prof * 0.35 * uHover;
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;function u(e,t){if(!e)return t;let r=String(e).trim();if("#"===r.charAt(0)){let e=r.slice(1);if((3===e.length||4===e.length)&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e.length>=6){let t=parseInt(e.slice(0,2),16),r=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16);if(!isNaN(t)&&!isNaN(r)&&!isNaN(n))return[t/255,r/255,n/255]}return t}let n=r.match(/[\d.]+/g);return n&&n.length>=3?[Math.min(255,parseFloat(n[0]))/255,Math.min(255,parseFloat(n[1]))/255,Math.min(255,parseFloat(n[2]))/255]:t}function f(e,t){return"number"==typeof e&&isFinite(e)?e:t}function l(e,t,r){return e<t?t:e>r?r:e}function c(e,t,r){let n=e.createShader(t);return n?(e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))?n:(console.error("LightCurtain shader:",e.getShaderInfoLog(n)),e.deleteShader(n),null):null}function s({className:e,style:t,background:r="#05030A",baseColor:m="#7A2CE0",accentColor:v="#E24BC8",highlight:h="#FF9E3D",density:p=150,speed:d=50,curtainWidth:x=100,spread:g=100,striation:y=55,hover:b=100,reach:w=30}){let A=(0,i.useRef)(null),S={bg:r,base:m,accent:v,high:h,density:l(f(p,50),10,150)/50,speed:l(f(d,50),0,100)/50,cw:l(f(x,100),30,250)/100,spread:l(f(g,100),0,200)/100,striation:l(f(y,55),0,100)/100,hover:l(f(b,100),0,200)/100,reach:.02+l(f(w,30),0,100)/100*.18},R=(0,i.useRef)(S);(0,i.useEffect)(()=>{R.current=S});let E=(0,i.useRef)({x:.5,y:.5,tx:.5,ty:.5,on:0,onTarget:0});return(0,i.useEffect)(()=>{let e=A.current;if(!e)return;let t=e.getContext("webgl",{antialias:!1,alpha:!1,depth:!1});if(!t)return;let r=c(t,t.VERTEX_SHADER,o),n=c(t,t.FRAGMENT_SHADER,a);if(!r||!n)return;let i=t.createProgram();if(!i)return;if(t.attachShader(i,r),t.attachShader(i,n),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))return void console.error("LightCurtain link:",t.getProgramInfoLog(i));t.useProgram(i);let f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let s=t.getAttribLocation(i,"a_pos");t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0);let m={},v=e=>(e in m||(m[e]=t.getUniformLocation(i,e)),m[e]),h=new Float32Array(7),p=new Float32Array(7),d=new Float32Array(7).fill(1.24),x=0,g=.5,y=.5,b=new Float32Array(24),w=new Float32Array(3),S=new Float32Array(3).fill(2.3),L=0,F=new Float32Array(9),M={p:.5,v:0},T=0,P=.5,_=.5,H=0,I=performance.now(),N=0,C=!0,D=!1,B=r=>{let n=Math.min(.05,(r-I)/1e3);I=r;let i=R.current;N=(N+n*i.speed)%3600;let o=E.current,a=1-Math.exp(-6*n);o.on+=(o.onTarget-o.on)*a;let f=1-Math.exp(-22*n);o.x+=(o.tx-o.x)*f,o.y+=(o.ty-o.y)*f;let c=Math.hypot(o.tx-P,o.ty-_)/Math.max(n,.001);P=o.tx,_=o.ty;let s=l(c/2,0,1)*o.on;T+=(s-T)*(1-Math.exp(-(s>T?14:3.2)*n)),M.v+=(-5.7*M.v-90.25*(M.p-o.x))*n,M.p+=M.v*n;let m=l((o.x-M.p)*3,-1,1),A=1-o.y;o.on>.02&&Math.hypot(o.x-g,A-y)>.022&&(h[x=(x+1)%7]=o.x,p[x]=A,d[x]=0,g=o.x,y=A),b[0]=o.x,b[1]=A,b[2]=o.on;for(let e=0;e<7;e++){let t=(x-e+14)%7;d[t]+=n;let r=d[t],i=r>=.62?0:Math.pow(1-r/.62,1.6)*o.on*.8;b[(e+1)*3]=h[t],b[(e+1)*3+1]=p[t],b[(e+1)*3+2]=i}for(let e=0;e<3;e++){S[e]+=n;let t=S[e],r=t>=1.15?0:Math.pow(1-t/1.15,2);F[3*e]=w[e],F[3*e+1]=1.05*t,F[3*e+2]=r}let L=Math.min(window.devicePixelRatio||1,2),C=e.clientWidth||1200,D=e.clientHeight||800,W=Math.max(1,Math.round(C*L)),U=Math.max(1,Math.round(D*L));(e.width!==W||e.height!==U)&&(e.width=W,e.height=U),t.viewport(0,0,W,U);let Y=u(i.bg,[.02,.012,.039]),k=u(i.base,[.478,.173,.878]),G=u(i.accent,[.886,.294,.784]),O=u(i.high,[1,.62,.239]);t.uniform2f(v("uRes"),W,U),t.uniform1f(v("uTime"),N),t.uniform2f(v("uMouse"),o.x,A),t.uniform1f(v("uHover"),Math.min(1,o.on)*i.hover),t.uniform1f(v("uReach"),i.reach),t.uniform1f(v("uSway"),m),t.uniform1f(v("uRush"),T),t.uniform3fv(v("uTrail[0]"),b),t.uniform3fv(v("uPulse[0]"),F),t.uniform3f(v("uBg"),Y[0],Y[1],Y[2]),t.uniform3f(v("uBase"),k[0],k[1],k[2]),t.uniform3f(v("uAccent"),G[0],G[1],G[2]),t.uniform3f(v("uHigh"),O[0],O[1],O[2]),t.uniform1f(v("uDensity"),i.density),t.uniform1f(v("uWidth"),i.cw),t.uniform1f(v("uSpread"),i.spread),t.uniform1f(v("uStriation"),i.striation),t.drawArrays(t.TRIANGLES,0,3),H=requestAnimationFrame(B)},W=()=>{D&&(D=!1,cancelAnimationFrame(H))},U=()=>{C&&"visible"===document.visibilityState?D||(D=!0,I=performance.now(),H=requestAnimationFrame(B)):W()},Y=new IntersectionObserver(e=>{C=e[0]?.isIntersecting??!0,U()},{threshold:0});Y.observe(e),document.addEventListener("visibilitychange",U);let k=t=>{let r=e.offsetWidth,n=e.offsetHeight;if(r<=0||n<=0)return;let i=E.current;i.tx=l(t.offsetX/r,0,1),i.ty=l(t.offsetY/n,0,1),i.on<.02&&(i.x=i.tx,i.y=i.ty,M.p=i.tx,M.v=0,P=i.tx,_=i.ty,g=i.tx,y=1-i.ty,d.fill(1.24)),i.onTarget=1},G=e=>{k(e),w[L=(L+1)%3]=E.current.tx,S[L]=0},O=()=>{E.current.onTarget=0};return e.addEventListener("pointermove",k),e.addEventListener("pointerenter",k),e.addEventListener("pointerdown",G),e.addEventListener("pointerleave",O),U(),()=>{W(),Y.disconnect(),document.removeEventListener("visibilitychange",U),e.removeEventListener("pointermove",k),e.removeEventListener("pointerenter",k),e.removeEventListener("pointerdown",G),e.removeEventListener("pointerleave",O)}},[]),(0,n.jsx)("div",{className:e,style:{position:"relative",overflow:"hidden",background:r,...t},children:(0,n.jsx)("canvas",{ref:A,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}})})}}}]);