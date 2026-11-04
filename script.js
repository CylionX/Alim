/* ---- Loader: 0 → 99, then open the page ---- */
(function(){
const L=document.querySelector("#loader"),n=document.querySelector("#loaderNum"),bar=document.querySelector("#loaderBar"),txt=document.querySelector("#loaderText");
if(!L)return;
const rm=matchMedia("(prefers-reduced-motion: reduce)").matches,dur=rm?400:2800,start=performance.now();
const msgs=[[0,"BOOTING SECURE ENVIRONMENT"],[25,"MOUNTING /DEV/ALIM"],[50,"LOADING SECURITY MODULES"],[75,"ESTABLISHING ENCRYPTED CHANNEL"],[95,"ACCESS GRANTED"]];
let loaded=document.readyState==="complete";addEventListener("load",()=>{loaded=true});
function open(){L.classList.add("hide");document.body.classList.remove("is-loading");document.dispatchEvent(new Event("siteready"));setTimeout(()=>L.remove(),800)}
function tick(now){
  const p=Math.min(1,(now-start)/dur),v=Math.floor((1-Math.pow(1-p,2.2))*99);
  n.textContent=v;bar.style.width=v+"%";
  msgs.forEach(m=>{if(v>=m[0])txt.textContent=m[1]});
  if(p<1){requestAnimationFrame(tick);return}
  n.textContent=99;bar.style.width="99%";
  const t0=performance.now();(function wait(){if(loaded||performance.now()-t0>3000)setTimeout(open,320);else setTimeout(wait,80)})();
}
requestAnimationFrame(tick);
})();

const values=[["01","⌁","Curiosity","Ask better questions and understand how systems work.","#ffb454"],["02","◈","Practical Learning","Turn concepts into hands-on experimentation and projects.","#3fe0ff"],["03","↻","Continuous Growth","Keep learning as technology and threats evolve.","#3fff8f"]];
const skills=[["Cybersecurity","Core security concepts and responsible security learning.","◉","#ff2438"],["Information Security","Exploring principles for protecting information and systems.","◈","#3fa9ff"],["Ethical Hacking","Learning responsible offensive security concepts.","⌁","#ff9d3f"],["Penetration Testing","Studying structured security testing approaches.","⌖","#ff3fa0"],["Red Teaming","Exploring adversary simulation and offensive concepts.","△","#b83fff"],["Network Security","Learning networks, protocols, architecture, and security.","⌬","#3ff0ff"],["Linux","Developing practical Linux and operating-system knowledge.","$","#ffd23f"],["Security Tools","Exploring tools used in ethical security labs.","▣","#3fff8f"],["Vulnerability Assessment","Learning how weaknesses can be identified and documented.","!","#ff5b3f"],["Web Application Security","Understanding common web security weaknesses and mitigations.","◇","#7c3fff"],["OSINT","Exploring open-source intelligence and information gathering.","◎","#2fe0c0"],["Security Research","Building a responsible security research mindset.","⌘","#4f6bff"],["Artificial Intelligence","Exploring AI and its relationship with technology and security.","AI","#d63fff"],["Emerging Technologies","Following new technical ideas and evolving security challenges.","↗","#8bff3f"]];
const focuses=[["01","Ethical Hacking","Exploring responsible security testing, offensive security concepts, and ethical hacking methodologies.","⌁","#ff2438"],["02","Penetration Testing","Learning structured approaches to identifying, understanding, and responsibly documenting security weaknesses.","⌖","#ff3fa0"],["03","Red Teaming","Developing knowledge of adversary simulation, attack methodologies, and security testing concepts.","△","#ff9d3f"],["04","Network Security","Building an understanding of networks, protocols, architecture, and security principles.","⌬","#3ff0ff"],["05","Web Application Security","Learning how web applications can be analyzed, tested, and secured against common security weaknesses.","◇","#7c3fff"],["06","OSINT & Security Research","Exploring information gathering, open-source intelligence, and cybersecurity research techniques.","◎","#2fe0c0"]];
const methods=[["01","LEARN","Build strong technical foundations and continuously expand cybersecurity knowledge.","◈","#3fa9ff"],["02","PRACTICE","Apply knowledge through hands-on experimentation, labs, and practical projects.","⌁","#ffd23f"],["03","SECURE","Understand vulnerabilities and responsible security practices to help build safer digital environments.","◉","#3fff8f"],["04","EVOLVE","Stay adaptable and continuously learn as technology and cyber threats evolve.","↗","#b83fff"]];

document.querySelector("#valueGrid").innerHTML=values.map(v=>`<article class="value-card interactive-card reveal" style="--accent:${v[4]}"><span class="num">${v[0]}</span><h3>${v[2]}</h3><p>${v[3]}</p><span class="corner-badge">${v[1]}</span></article>`).join("");
document.querySelector("#skillsGrid").innerHTML=skills.map((s,i)=>`<button type="button" class="skill-pill${i===0?" active":""}" style="--accent:${s[3]}" data-i="${i}"><span class="pill-icon">${s[2]}</span>${s[0]}</button>`).join("");
document.querySelector("#focusGrid").innerHTML=focuses.map(f=>`<article class="focus-card interactive-card reveal" style="--accent:${f[4]}"><span class="num">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p><span class="corner-badge">${f[3]}</span></article>`).join("");

/* ---- Skill pills: click to reveal related info ---- */
const skillInfo=document.querySelector("#skillInfo");
let typeJob=0;
function typedPart(el,text,speed){el.textContent="";const on=document.createElement("span"),off=document.createElement("span");on.className="t-on";off.className="t-off";off.textContent=text;el.append(on,off);return{el,on,off,text,speed}}
function runTyping(parts,job){
  let pi=0,n=0,start=performance.now();
  (function step(now){
    if(job!==typeJob)return;
    const p=parts[pi];p.el.classList.add("typing");
    const t=Math.min(p.text.length,Math.max(0,Math.floor((now-start)/p.speed)));
    if(t!==n){n=t;p.on.textContent=p.text.slice(0,n);p.off.textContent=p.text.slice(n)}
    if(n>=p.text.length){p.el.classList.remove("typing");pi++;if(pi>=parts.length)return;start=now+120;n=0}
    requestAnimationFrame(step);
  })(performance.now());
}
/* mode: "now" = type immediately, "wait" = prepare hidden text (typed later), "static" = no animation */
function renderSkillInfo(i,mode){
  const s=skills[i];if(!skillInfo)return;
  skillInfo.style.setProperty("--accent",s[3]);
  skillInfo.innerHTML='<span class="info-tag"></span><h4></h4><p></p>';
  const parts=[typedPart(skillInfo.querySelector(".info-tag"),"TECH / "+s[0].toUpperCase(),18),typedPart(skillInfo.querySelector("h4"),s[0],38),typedPart(skillInfo.querySelector("p"),s[1],16)];
  const job=++typeJob;skillInfo._parts=parts;
  if(mode==="static"||matchMedia("(prefers-reduced-motion: reduce)").matches){parts.forEach(p=>{p.on.textContent=p.text;p.off.textContent=""});return}
  if(mode==="now")runTyping(parts,job);
}
renderSkillInfo(0,"wait");
if(skillInfo){
  if("IntersectionObserver" in window){const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();const parts=skillInfo._parts;if(parts&&!parts[0].on.textContent)runTyping(parts,typeJob)}},{threshold:.6});io.observe(skillInfo)}else renderSkillInfo(0,"static");
}
document.querySelector("#skillsGrid").addEventListener("click",e=>{const btn=e.target.closest(".skill-pill");if(!btn)return;document.querySelectorAll(".skill-pill").forEach(p=>p.classList.remove("active"));btn.classList.add("active");renderSkillInfo(+btn.dataset.i,"now")});

const header=document.querySelector("#header"), menu=document.querySelector(".menu"), links=document.querySelector("#navLinks");
menu.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>20),{passive:true});

if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));}

const navLinks=[...document.querySelectorAll(".links a")], sections=navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));

document.querySelectorAll(".interactive-card,.panel").forEach(card=>card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();card.style.setProperty("--mx",`${e.clientX-r.left}px`);card.style.setProperty("--my",`${e.clientY-r.top}px`)}));

/* ---- Interactive red cursor glow ---- */
const glow=document.querySelector(".pointer-glow"), dot=document.querySelector(".cursor-dot");
let glowX=innerWidth/2,glowY=innerHeight/2,targetX=glowX,targetY=glowY,glowActive=false;
function setGlow(x,y){targetX=x;targetY=y;if(!glowActive){glowActive=true;glow&&glow.classList.add("active");dot&&dot.classList.add("active")}if(dot){dot.style.left=x+"px";dot.style.top=y+"px"}}
window.addEventListener("pointermove",e=>setGlow(e.clientX,e.clientY),{passive:true});
window.addEventListener("pointerenter",e=>setGlow(e.clientX,e.clientY),{passive:true});
window.addEventListener("pointerleave",()=>{glowActive=false;glow&&glow.classList.remove("active");dot&&dot.classList.remove("active")});
function moveGlow(){if(glow&&glowActive){glowX+=(targetX-glowX)*0.22;glowY+=(targetY-glowY)*0.22;glow.style.left=glowX+"px";glow.style.top=glowY+"px"}requestAnimationFrame(moveGlow)}
if(!matchMedia("(pointer:coarse)").matches)moveGlow();
document.addEventListener("pointerdown",()=>{dot&&dot.style.setProperty("transform","translate(-50%,-50%) scale(.55)")});
document.addEventListener("pointerup",()=>{dot&&dot.style.setProperty("transform","translate(-50%,-50%) scale(1)")});

/* ---- Premium click burst: dual rings + flash + radiating sparks ---- */
window.addEventListener("click",e=>{
  const x=e.clientX,y=e.clientY;
  const r1=document.createElement("span");r1.className="ripple";r1.style.left=x+"px";r1.style.top=y+"px";document.body.appendChild(r1);setTimeout(()=>r1.remove(),780);
  const r2=document.createElement("span");r2.className="ripple r2";r2.style.left=x+"px";r2.style.top=y+"px";document.body.appendChild(r2);setTimeout(()=>r2.remove(),1050);
  const flash=document.createElement("span");flash.className="click-flash";flash.style.left=x+"px";flash.style.top=y+"px";document.body.appendChild(flash);setTimeout(()=>flash.remove(),520);
  const sparkCount=reduceMotionActive()?0:7;
  for(let i=0;i<sparkCount;i++){
    const ang=(Math.PI*2/sparkCount)*i+Math.random()*.5;
    const dist=30+Math.random()*38;
    const s=document.createElement("span");s.className="spark";
    s.style.left=x+"px";s.style.top=y+"px";
    s.style.setProperty("--sx",(Math.cos(ang)*dist).toFixed(1)+"px");
    s.style.setProperty("--sy",(Math.sin(ang)*dist).toFixed(1)+"px");
    document.body.appendChild(s);setTimeout(()=>s.remove(),620);
  }
});
function reduceMotionActive(){return matchMedia("(prefers-reduced-motion: reduce)").matches}

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter,cards=[...document.querySelectorAll(".lab-card")];let n=0;
  cards.forEach(c=>{const ok=f==="all"||c.dataset.category.split(" ").includes(f);c.hidden=!ok;if(ok)n++});
  const e=document.querySelector("#labEmpty");if(e)e.hidden=n>0;
}));

const form=document.querySelector("#contactForm"), result=document.querySelector("#formResult");
form.addEventListener("submit",e=>{
  e.preventDefault();let ok=true;
  form.querySelectorAll("input,textarea").forEach(input=>{
    const small=input.parentElement.querySelector("small");let msg="";
    if(!input.value.trim())msg="This field is required.";
    else if(input.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))msg="Enter a valid email.";
    small.textContent=msg;input.setAttribute("aria-invalid",msg?"true":"false");if(msg)ok=false;
  });
  if(!ok){result.textContent="Please correct the highlighted fields and try again.";result.style.color="#ff2438";return}
  const f=new FormData(form),body="Name: "+f.get("name")+"\nEmail: "+f.get("email")+"\n\n"+f.get("message");
  result.style.color="#3fff8f";result.textContent="Opening your email app… If nothing opens, write to alimvai9667@gmail.com directly.";
  location.href="mailto:alimvai9667@gmail.com?subject="+encodeURIComponent(f.get("subject"))+"&body="+encodeURIComponent(body);
});
form.addEventListener("submit",e=>{e.preventDefault();let ok=true;form.querySelectorAll("input,textarea").forEach(input=>{const small=input.parentElement.querySelector("small");let msg="";if(!input.value.trim())msg="This field is required.";else if(input.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))msg="Enter a valid email.";small.textContent=msg;if(msg)ok=false});result.textContent=ok?"Form validated successfully. No message was sent because no backend or email service is configured yet.":"Please correct the highlighted fields and try again.";result.style.color=ok?"#ff7c87":"#ff2438"});

const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer:coarse)").matches;
const small=()=>innerWidth<700,DPR=()=>Math.min(devicePixelRatio||1,coarse?1.5:2);
let vw=innerWidth,vh=innerHeight;
const canvas=document.querySelector("#starfield"),ctx=canvas&&canvas.getContext?canvas.getContext("2d"):null;
let stars=[],shooters=[];
const STAR_COLORS=["255,255,255","190,212,255","255,224,190"];
function sizeCanvas(c,x){if(!c||!x)return;const d=DPR();c.width=Math.round(vw*d);c.height=Math.round(vh*d);x.setTransform(d,0,0,d,0,0)}
function makeStars(){
  const n=Math.min(small()?400:1000,Math.floor(vw*vh/(small()?950:1500)));
  stars=Array.from({length:n},()=>{
    const z=Math.pow(Math.random(),2.3),k=Math.random(),b=Math.pow(Math.random(),1.5);
    return{x:Math.random()*vw,y:Math.random()*vh,r:.2+z*.5,v:9+z*68,a:.16+b*.7,tw:.7+Math.random()*2.6,ph:Math.random()*6.283,c:k<.12?2:(k<.4?1:0),g:z>.78&&b>.5};
  });
}
sizeCanvas(canvas,ctx);makeStars();
let rT;addEventListener("resize",()=>{clearTimeout(rT);rT=setTimeout(()=>{if(innerWidth===vw&&Math.abs(innerHeight-vh)<160)return;vw=innerWidth;vh=innerHeight;sizeCanvas(canvas,ctx);makeStars();resizeFloaters()},150)});
let lastT=0,lastShot=0,shotCount=0,nextShot=1800;
function animate(now=0){
  if(!canvas||!ctx)return;
  const dt=lastT?Math.min(.05,(now-lastT)/1000):.016;lastT=now;
  ctx.clearRect(0,0,vw,vh);ctx.globalCompositeOperation="lighter";
  const t=now/1000,mv=reduce?0:1;
  for(let ci=0;ci<3;ci++){
    ctx.fillStyle="rgb("+STAR_COLORS[ci]+")";
    for(let i=0;i<stars.length;i++){
      const s=stars[i];if(s.c!==ci)continue;
      s.x+=s.v*dt*mv;s.y+=s.v*dt*mv*.07;
      if(s.x>vw+2){s.x=-2;s.y=Math.random()*vh}
      if(s.y>vh+2)s.y=-2;
      ctx.globalAlpha=s.a*(.7+.3*Math.sin(t*s.tw+s.ph));
      if(s.r<.5)ctx.fillRect(s.x,s.y,s.r*2,s.r*2);else{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.2832);ctx.fill()}
      if(s.g){ctx.globalAlpha*=.16;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.4,0,6.2832);ctx.fill()}
    }
  }
  if(!reduce&&now-lastShot>nextShot){
    shotCount++;const big=shotCount%4===0;
    shooters.push({x:Math.random()*vw*.8+30,y:Math.random()*vh*.45+20,v:big?780:620,l:big?Math.random()*40+110:Math.random()*50+70,w:big?1.4:1.05,head:big?1.7:1.3,life:0});lastShot=now;nextShot=small()?4000+Math.random()*4500:2200+Math.random()*3600;
  }
  shooters=shooters.filter(s=>s.x<vw+220&&s.y<vh+220&&s.life<1.9);
  shooters.forEach(s=>{
    s.life+=dt;
    const x0=s.x-s.l,y0=s.y-s.l*.34,g=ctx.createLinearGradient(x0,y0,s.x,s.y);
    g.addColorStop(0,"rgba(255,20,45,0)");g.addColorStop(.5,"rgba(255,80,100,.28)");g.addColorStop(1,"rgba(255,235,238,1)");
    const fade=Math.min(1,s.life/.12);ctx.strokeStyle=g;ctx.lineCap="round";
    ctx.globalAlpha=.1*fade;ctx.lineWidth=s.w*3.2;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(s.x,s.y);ctx.stroke();
    ctx.globalAlpha=fade;ctx.lineWidth=s.w;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(s.x,s.y);ctx.stroke();
    ctx.globalAlpha=.95;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s.x,s.y,s.head,0,6.2832);ctx.fill();
    s.x+=s.v*dt;s.y+=s.v*.34*dt;
  });
  ctx.globalAlpha=1;requestAnimationFrame(animate);
}
animate();

if(reduce){document.querySelectorAll(".reveal").forEach(e=>e.classList.add("visible"))}

/* ---- Parallax background (mouse move shifts ambient/nebula depth) ---- */
const parallaxLayers=[{el:document.querySelector(".ambient-1"),depth:16},{el:document.querySelector(".ambient-2"),depth:12},{el:document.querySelector(".nebula-1"),depth:30},{el:document.querySelector(".nebula-2"),depth:24}].filter(l=>l.el);
let pmx=innerWidth/2,pmy=innerHeight/2;
if(!reduce&&!coarse&&parallaxLayers.length){
  window.addEventListener("pointermove",e=>{pmx=e.clientX;pmy=e.clientY},{passive:true});
  window.addEventListener("deviceorientation",e=>{if(e.gamma==null)return;pmx=innerWidth/2+e.gamma*8;pmy=innerHeight/2+(e.beta-45)*8});
  (function parallaxLoop(){
    const nx=pmx/innerWidth-0.5, ny=pmy/innerHeight-0.5;
    parallaxLayers.forEach(l=>{l.el.style.transform=`translate3d(${(-nx*l.depth).toFixed(2)}px,${(-ny*l.depth).toFixed(2)}px,0)`});
    requestAnimationFrame(parallaxLoop);
  })();
}

/* ---- Floating nebula particles (soft orange, slow upward drift) ---- */
const pCanvas=document.querySelector("#particles");
const pCtx=pCanvas&&pCanvas.getContext?pCanvas.getContext("2d"):null;
let floaters=[];
function resizeFloaters(){
  if(!pCanvas||!pCtx)return;
  sizeCanvas(pCanvas,pCtx);
  const count=reduce?0:Math.min(small()?26:80,Math.floor(innerWidth/14));
  floaters=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*.7+.3,vy:Math.random()*.3+.08,sway:Math.random()*.5+.15,phase:Math.random()*Math.PI*2,a:Math.random()*.4+.1,hue:Math.random()>.5?"255,150,60":"255,90,35"}));
}
resizeFloaters();
function animateFloaters(t=0){
  if(!pCanvas||!pCtx)return;
  pCtx.clearRect(0,0,innerWidth,innerHeight);
  pCtx.globalCompositeOperation="lighter";
  floaters.forEach(f=>{
    f.y-=f.vy;f.x+=Math.sin(t/1000+f.phase)*f.sway*.02;
    if(f.y<-6){f.y=innerHeight+6;f.x=Math.random()*innerWidth}
    if(f.x<-6)f.x=innerWidth+6;else if(f.x>innerWidth+6)f.x=-6;
    const grad=pCtx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*5);
    grad.addColorStop(0,`rgba(${f.hue},${f.a})`);grad.addColorStop(1,`rgba(${f.hue},0)`);
    pCtx.fillStyle=grad;pCtx.beginPath();pCtx.arc(f.x,f.y,f.r*5,0,Math.PI*2);pCtx.fill();
  });
  pCtx.globalAlpha=1;
  requestAnimationFrame(animateFloaters);
}
animateFloaters();


/* ---- Hero: entrance after loader + gentle mouse depth ---- */
(function(){
  const heroEls=[...document.querySelectorAll(".hero .reveal")];
  if(!reduce&&document.body.classList.contains("is-loading")){
    heroEls.forEach(el=>{el.style.opacity="0"});
    const showHero=()=>{heroEls.forEach(el=>{el.style.transition="opacity .8s ease";el.style.opacity="1"})};document.addEventListener("siteready",showHero,{once:true});setTimeout(showHero,9000);
  }
  if(reduce||coarse)return;
  const hero=document.querySelector("#home");
  const layers=[[".cube-wrap",22,14],[".orbit-a",-10,-6],[".orbit-b",8,5],[".orbit-c",-14,-9],[".signal-1",-16,-10],[".signal-2",14,9],[".signal-3",-12,-8],[".stage-caption",6,4],[".titan-title",-8,-4]].map(a=>({el:document.querySelector(a[0]),x:a[1],y:a[2]})).filter(l=>l.el);
  let mx=0,my=0,cx=0,cy=0,vis=true,run=false;
  function frame(){
    cx+=(mx-cx)*.07;cy+=(my-cy)*.07;
    layers.forEach(l=>{l.el.style.translate=(cx*l.x).toFixed(2)+"px "+(cy*l.y).toFixed(2)+"px"});
    if(vis&&(Math.abs(mx-cx)>.0008||Math.abs(my-cy)>.0008))requestAnimationFrame(frame);else run=false;
  }
  function wake(){if(!run&&vis){run=true;requestAnimationFrame(frame)}}
  addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;wake()},{passive:true});
  if("IntersectionObserver" in window&&hero)new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)wake()}).observe(hero);
})();

/* =====================================================================
   HACKER MODULES: hero roles, toolkit, lifecycle, interactive terminal
   Edit the arrays below to update content.
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s);

/* ---- Hero: rotating typed roles ---- */
(function(){
  const el=$("#roleTyped");if(!el||reduce)return;
  const words=["SECURITY RESEARCH","DIGITAL DEFENSE","OFFENSIVE SECURITY","ETHICAL HACKING","PENETRATION TESTING","RED TEAM LEARNER"];
  let w=0,i=words[0].length,mode="hold";
  function tick(){
    if(document.hidden){setTimeout(tick,700);return}
    if(mode==="hold"){mode="del";setTimeout(tick,1700);return}
    if(mode==="del"){i--;el.textContent=words[w].slice(0,Math.max(i,0));if(i<=0){w=(w+1)%words.length;mode="type"}setTimeout(tick,26);return}
    i++;el.textContent=words[w].slice(0,i);if(i>=words[w].length)mode="hold";setTimeout(tick,58);
  }
  setTimeout(tick,3400);
})();

/* ---- Toolkit ---- */
const tools=[
 ["Nmap","Recon","Network mapper that finds live hosts, open ports and service versions.","nmap -sV -sC <lab-target>","#3fa9ff"],
 ["Whois & dig","Recon","Look up domain ownership and DNS records during passive recon.","dig example.com +short","#2fe0c0"],
 ["Wireshark","Network","Packet analyser for seeing exactly what travels across a network.","tcp.port == 443","#3ff0ff"],
 ["Burp Suite","Web","Intercepting proxy for studying how web apps handle requests and sessions.",null,"#ff9d3f"],
 ["OWASP ZAP","Web","Free web-app scanner, great for learning and for automation.","zaproxy","#7c3fff"],
 ["Gobuster","Web","Discovers hidden directories and files on web servers in a lab.","gobuster dir -u <lab-url> -w wordlist.txt","#ffd23f"],
 ["Nikto","Web","Quick web-server scanner for outdated software and risky configuration.","nikto -h <lab-url>","#ff5b3f"],
 ["Metasploit","Exploitation","Framework for safely testing known vulnerabilities on lab machines.","msfconsole","#ff2438"],
 ["John the Ripper","Passwords","Password auditing tool, used on practice hashes in labs.","john --list=formats","#b83fff"],
 ["Hashcat","Passwords","Fast hash recovery for authorised password audits.","hashcat --help","#ff3fa0"],
 ["Aircrack-ng","Wireless","Suite for auditing the security of Wi-Fi networks I own.","airmon-ng","#2fe0c0"],
 ["Autopsy","Forensics & OSINT","Digital forensics platform for analysing disk images and evidence.",null,"#8bff3f"],
 ["OSINT Framework","Forensics & OSINT","A curated map of free tools for open-source intelligence.",null,"#4f6bff"],
 ["Kali Linux","OS","Security-focused Linux distribution, run safely inside a virtual machine.","cat /etc/os-release","#ff2438"]
];
(function(){
  const grid=$("#toolGrid"),fil=$("#toolFilters");if(!grid||!fil)return;
  const cats=["All",...new Set(tools.map(t=>t[1]))];
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  fil.innerHTML=cats.map((c,i)=>`<button type="button" class="filter${i?"":" active"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  grid.innerHTML=tools.map(t=>`<article class="tool-card" data-cat="${esc(t[1])}" style="--accent:${t[4]}"><span class="tool-status">EXPLORING</span><span class="tool-cat">${esc(t[1]).toUpperCase()}</span><h3>${esc(t[0])}</h3><p>${esc(t[2])}</p>${t[3]?`<div class="tool-cmd"><span class="prompt">$</span><code>${esc(t[3])}</code><button type="button" data-copy="${esc(t[3])}" aria-label="Copy command">COPY</button></div>`:`<div class="tool-cmd none">GUI tool: used in authorised labs only</div>`}</article>`).join("");
  fil.addEventListener("click",e=>{
    const b=e.target.closest(".filter");if(!b)return;
    fil.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");
    grid.querySelectorAll(".tool-card").forEach(c=>{c.hidden=!(b.dataset.cat==="All"||c.dataset.cat===b.dataset.cat)});
  });
  grid.addEventListener("click",e=>{
    const b=e.target.closest("[data-copy]");if(!b)return;
    const done=()=>{b.textContent="COPIED";setTimeout(()=>{b.textContent="COPY"},1200)};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(b.dataset.copy).then(done,()=>{});else done();
  });
})();

/* ---- Lifecycle: stage picker with typed output ---- */
const stages=[
 ["Reconnaissance","Learn about the target before touching it: domains, public records, technologies, exposed assets and people.","whois · dig / nslookup · Shodan · OSINT Framework","Keep an asset inventory, limit what is public, watch for look-alike domains."],
 ["Scanning & Enumeration","Discover live hosts, open ports, running services and their versions to build a map of the attack surface.","Nmap · Nikto · Gobuster · Wireshark","IDS/IPS alerts on scan patterns, close unused ports, rate-limit probing."],
 ["Gaining Access","Check whether a weakness (weak credentials, misconfiguration, unpatched service, injection flaw) is really usable, strictly inside the authorised scope.","Burp Suite · Metasploit (lab) · custom scripts","Patch quickly, enforce MFA, validate input, apply least privilege."],
 ["Privilege Escalation","Test whether a small foothold can grow: weak permissions, reused credentials, over-privileged services.","LinPEAS / WinPEAS · BloodHound (AD)","Least privilege, credential hygiene, network segmentation, EDR."],
 ["Impact & Evidence","Show real impact safely: what could be reached, with clear proof. Then clean up and leave nothing behind.","Notes · screenshots · CherryTree / Obsidian","Centralised logging and alerting (OWASP A09), tested incident-response playbooks."],
 ["Reporting & Remediation","Turn findings into a clear report: severity (CVSS), steps to reproduce, business impact and fixes, then retest.","CVSS calculator · report templates","Track fixes, verify them, and share lessons with the developers."]
];
(function(){
  const nav=$("#lifeNav"),bodyEl=$("#lifeBody"),title=$("#lifeTitle");if(!nav||!bodyEl)return;
  nav.innerHTML=stages.map((s,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}" class="${i===0?"active":""}"><b>${String(i+1).padStart(2,"0")}</b>${s[0]}</button>`).join("");
  let job=0;
  function show(i,animate){
    const s=stages[i],my=++job;
    title.textContent="root@alim:~/lifecycle/stage-"+String(i+1).padStart(2,"0");
    const lines=[["$ cat stage-"+String(i+1).padStart(2,"0")+".txt","t-user"],["",""],["STAGE   "+s[0].toUpperCase(),"t-white"],["",""],["WHAT    "+s[1],""],["",""],["TOOLS   "+s[2],"t-cyan"],["",""],["DEFENDER VIEW","t-ok"],["        "+s[3],"t-ok"]];
    bodyEl.textContent="";
    const els=lines.map(l=>{const d=document.createElement("div");d.className="term-line "+l[1];bodyEl.appendChild(d);return d});
    if(!animate||reduce){lines.forEach((l,k)=>{els[k].textContent=l[0]});return}
    const t0=performance.now(),total=lines.reduce((a,l)=>a+l[0].length+1,0);
    (function step(now){
      if(my!==job)return;
      const done=Math.min(total,Math.floor(((now||performance.now())-t0)*.13));let n=done;
      lines.forEach((l,k)=>{const len=l[0].length+1;els[k].textContent=l[0].slice(0,Math.max(0,Math.min(len-1,n)));n-=len});
      if(done<total)requestAnimationFrame(step);
    })(t0);
  }
  nav.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    nav.querySelectorAll("button").forEach(x=>{x.classList.remove("active");x.setAttribute("aria-selected","false")});
    b.classList.add("active");b.setAttribute("aria-selected","true");show(+b.dataset.i,true);
  });
  show(0,false);
})();

/* ---- Interactive terminal ---- */
(function(){
  const body=$("#termBody"),input=$("#termInput"),form=$("#termForm"),chips=$("#termChips");
  if(!body||!input||!form)return;
  const FLAG="FLAG{ethical_hackers_always_ask_first}",B64="RkxBR3tldGhpY2FsX2hhY2tlcnNfYWx3YXlzX2Fza19maXJzdH0=",MAIL="alimvai9667@gmail.com";
  const FILES={
    "README.md":["# alim-portfolio","An interactive way to meet me. Try: about, skills, tools, roadmap, ethics.","Some files are hidden. Real hackers always look closer."],
    "about.txt":["Muhammad Abdul Alim","Aspiring cybersecurity & ethical hacking professional from Bangladesh.","Learning by doing: networking, Linux, web security and penetration testing."],
    "skills.txt":["Cybersecurity · Ethical Hacking · Penetration Testing · Red Teaming","Network Security · Linux · Web Application Security · OSINT","Vulnerability Assessment · Security Research · AI & Emerging Tech"],
    "roadmap.txt":["1. Networking, Linux & scripting        [in progress]","2. TryHackMe: Pre-Security → Jr Pentester [planned]","3. PortSwigger Academy + OWASP Top 10    [planned]","4. Hack The Box + CTFs                   [planned]","5. eJPT → PNPT / CPTS → OSCP             [goal]"],
    "contact.txt":["Email : "+MAIL,"GitHub: github.com/CylionX","LinkedIn: linkedin.com/in/abdul-alim-674ba5410"],
    ".secret.b64":[B64]
  };
  const NAMES=["help","whoami","about","skills","tools","lifecycle","roadmap","projects","owasp","ethics","contact","ls","cat","base64","submit","nmap","ping","date","pwd","uname","echo","history","clear","sudo","rm","hack","exit"];
  const hist=[];let hp=0;
  function line(t,c){const d=document.createElement("div");d.className="term-line"+(c?" "+c:"");d.textContent=t;body.appendChild(d);return d}
  function lines(a,c){a.forEach(t=>line(t,c))}
  function link(label,href){const d=line(label+" ");const a=document.createElement("a");a.href=href;a.textContent=href.replace("mailto:","").split("?")[0];a.target=href.startsWith("http")?"_blank":"";a.rel="noopener noreferrer";d.appendChild(a)}
  function scroll(){body.scrollTop=body.scrollHeight}
  const C={
    help(){lines(["Available commands:","  whoami | about   who I am","  skills           what I'm learning","  tools            my security toolkit","  lifecycle        pentest stages","  roadmap          learning path","  projects         lab notebook status","  owasp            OWASP Top 10:2025","  ethics           my rules of engagement","  contact          how to reach me","  ls [-a]          list files","  cat <file>       read a file","  base64 -d <txt>  decode base64 text","  nmap localhost   simulated scan","  clear            clear the screen"],"t-cyan");line("Tip: plain `ls` doesn't show everything.","t-dim")},
    whoami(){lines(FILES["about.txt"])},about(){lines(FILES["about.txt"])},
    skills(){lines(FILES["skills.txt"])},
    tools(){lines(tools.map(t=>"  "+t[0].padEnd(18)+" "+t[1]));line("Scroll up to the Toolkit section for details.","t-dim")},
    lifecycle(){stages.forEach((s,i)=>line("  "+(i+1)+". "+s[0]));line("See the Attack Lifecycle section for the full breakdown.","t-dim")},
    roadmap(){lines(FILES["roadmap.txt"])},
    projects(){lines(["LAB-01 Home Lab: Kali + vulnerable targets   [planned]","LAB-02 DVWA vulnerability assessment          [planned]","LAB-03 CTF & room write-ups                   [planned]","LAB-04 Python security scripts                [planned]","LAB-05 AI & security notes                    [planned]","LAB-06 This portfolio                         [live]"])},
    owasp(){lines(["OWASP Top 10:2025","A01 Broken Access Control","A02 Security Misconfiguration","A03 Software Supply Chain Failures  (new)","A04 Cryptographic Failures","A05 Injection","A06 Insecure Design","A07 Authentication Failures","A08 Software or Data Integrity Failures","A09 Logging & Alerting Failures","A10 Mishandling of Exceptional Conditions  (new)"])},
    ethics(){lines(["1. Permission first   2. Stay in scope   3. Do no harm","4. Disclose responsibly   5. Protect privacy   6. Know the law"],"t-ok")},
    contact(){link("Email   :","mailto:"+MAIL);link("GitHub  :","https://github.com/CylionX");link("LinkedIn:","https://www.linkedin.com/in/abdul-alim-674ba5410/")},
    ls(a){const all=a.includes("-a")||a.includes("-la")||a.includes("-al");const f=Object.keys(FILES).filter(n=>all||!n.startsWith("."));line((all?".  ..  ":"")+f.join("  "))},
    cat(a){if(!a[0])return line("usage: cat <file>","t-warn");const f=FILES[a[0]];f?lines(f):line("cat: "+a[0]+": No such file or directory","t-err")},
    base64(a){
      const arg=a.filter(x=>!x.startsWith("-")).join("");
      if(!arg)return line("usage: base64 -d <text>","t-warn");
      let d;try{d=atob(arg)}catch(e){return line("base64: invalid input","t-err")}
      line(d,"t-ok");
      if(d===FLAG){line("Nice. That looks like a flag. Submit it with: submit "+FLAG,"t-warn")}
    },
    submit(a){
      if(a[0]===FLAG){lines(["FLAG ACCEPTED.","You looked past the obvious and decoded what you found. That is the mindset.","Say hi and tell me how fast you got it:"],"t-ok");link("→",`mailto:${MAIL}?subject=I%20found%20the%20flag`)}
      else line(a[0]?"Incorrect flag. Keep digging.":"usage: submit FLAG{...}","t-err")
    },
    nmap(a){
      const t=(a.filter(x=>!x.startsWith("-"))[0]||"");
      if(!t)return line("usage: nmap localhost","t-warn");
      if(!["localhost","127.0.0.1"].includes(t))return lines(["nmap: refusing to scan "+t,"Scanning systems without written permission is illegal. Try: nmap localhost"],"t-err");
      lines(["Starting Nmap (simulated) scan of alim-portfolio (127.0.0.1)","PORT      STATE   SERVICE","22/tcp    closed  ssh","80/tcp    open    http     portfolio","443/tcp   open    https    portfolio","31337/tcp open    elite    hint: ls -a","Nmap done: 1 host up (simulated)."]);
    },
    ping(a){const t=a[0]||"localhost";if(!["localhost","127.0.0.1"].includes(t))return line("ping: "+t+": only localhost is allowed here","t-warn");lines(["PING localhost (127.0.0.1): 56 data bytes","64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.04 ms","64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.03 ms"])},
    date(){line(new Date().toString())},pwd(){line("/home/guest")},
    uname(){line("Linux alim-portfolio 6.x-kali x86_64 GNU/Linux (simulated)")},
    echo(a){line(a.join(" "))},
    history(){hist.forEach((h,i)=>line("  "+(i+1)+"  "+h))},
    clear(){body.textContent=""},
    sudo(){line("guest is not in the sudoers file. This incident will be reported. (just kidding)","t-warn")},
    rm(){line("rm: permission denied. This is a read-only portfolio, and that is not how we do things here.","t-err")},
    hack(){lines(["Ethical hackers don't just \"hack\". They ask permission first.","Try: ethics"],"t-warn")},
    exit(){line("logout... just kidding. Scroll down to keep exploring.","t-dim")}
  };
  function run(raw){
    const cmd=raw.trim();
    const d=line("");d.innerHTML='<span class="t-user">guest@alim</span><span class="t-dim">:~$</span> ';d.appendChild(document.createTextNode(cmd));
    if(!cmd){scroll();return}
    hist.push(cmd);hp=hist.length;
    const parts=cmd.split(/\s+/),name=parts[0].toLowerCase(),args=parts.slice(1);
    if(Object.prototype.hasOwnProperty.call(C,name))C[name](args);else line("bash: "+name+": command not found. Type help","t-err");
    scroll();
  }
  form.addEventListener("submit",e=>{e.preventDefault();const v=input.value;input.value="";run(v)});
  input.addEventListener("keydown",e=>{
    if(e.key==="ArrowUp"){e.preventDefault();if(hp>0){hp--;input.value=hist[hp]||""}}
    else if(e.key==="ArrowDown"){e.preventDefault();if(hp<hist.length-1){hp++;input.value=hist[hp]}else{hp=hist.length;input.value=""}}
    else if(e.key==="Tab"){
      e.preventDefault();const p=input.value.split(/\s+/);
      if(p.length===1){const m=NAMES.filter(n=>n.startsWith(p[0].toLowerCase()));if(m.length===1)input.value=m[0]+" "}
      else if(p[0]==="cat"){const m=Object.keys(FILES).filter(n=>n.startsWith(p[1]||""));if(m.length===1)input.value="cat "+m[0]}
    }
    else if(e.key==="l"&&e.ctrlKey){e.preventDefault();C.clear()}
  });
  body.addEventListener("click",()=>{if(!getSelection().toString())input.focus({preventScroll:true})});
  if(chips){
    chips.innerHTML=["help","whoami","skills","tools","roadmap","ls -a","nmap localhost","contact","clear"].map(c=>`<button type="button" data-cmd="${c}">${c}</button>`).join("");
    chips.addEventListener("click",e=>{const b=e.target.closest("button");if(b)run(b.dataset.cmd)});
  }
  lines(["alim-portfolio · interactive shell (simulated, nothing here touches a real system)","Type help to begin. Hint: plain ls doesn't show everything."],"t-dim");
  line("");
})();

/* ---- Scroll reveal: sections fade/slide in gradually as you scroll (and back out when scrolling up) ---- */
(function(){
  if(reduce)return;
  const SEL=".section:not(.hero) :is(.section-head,.about-left,.about-photo,.about-right,.value-card,.skill-pill,.skill-info,.focus-card,.method-card,.process,.filters,.project-empty,.timeline-item,.github,.vision,.contact-left,.form,.tool-card,.life-nav,.term,.term-chips,.lab-card,.road-item,.rule-card,.lab-cta,.filters)";
  const items=[...document.querySelectorAll(SEL)].map(el=>{
    el.classList.remove("reveal");el.classList.add("sr");
    const sibs=[...el.parentElement.children].filter(c=>c.matches(SEL));
    return{el,fx:+(el.dataset.fx||0),sc:el.hasAttribute("data-scale"),k:Math.max(0,sibs.indexOf(el))%4,p:-1,ty:0};
  });
  let ticking=false;
  function update(){
    ticking=false;
    const vh=innerHeight,mob=innerWidth<700,rise=mob?26:48,slide=mob?22:70;
    const tops=items.map(it=>it.el.getBoundingClientRect().top-it.ty);
    items.forEach((it,i)=>{
      let p=(vh*.97-tops[i]-it.k*20)/(vh*.3);p=p<0?0:p>1?1:Math.round(p*100)/100;
      if(p===it.p)return;it.p=p;
      const e=1-Math.pow(1-p,3),r=1-e,el=it.el;
      it.ty=it.fx?0:r*rise;
      el.style.opacity=e.toFixed(3);
      el.style.translate=(it.fx*r*slide).toFixed(1)+"px "+it.ty.toFixed(1)+"px";
      if(it.sc)el.style.scale=(.92+.08*e).toFixed(3);
    });
  }
  const kick=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};
  addEventListener("scroll",kick,{passive:true});addEventListener("resize",kick);addEventListener("load",kick);
  update();
})();

/* ---- Click sound ("tup") with on/off toggle ---- */
(function(){
  const btn=document.querySelector("#soundBtn");
  let on=true;try{on=localStorage.getItem("snd")!=="off"}catch(_){}
  let ac=null,noise=null;
  function ctx(){
    if(!ac){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ac=new A()}
    if(ac.state==="suspended")ac.resume();return ac;
  }
  function tup(vol,f){
    if(!on)return;const a=ctx();if(!a)return;const t=a.currentTime;
    const o=a.createOscillator(),g=a.createGain();o.type="sine";
    o.frequency.setValueAtTime(f*(.94+Math.random()*.12),t);o.frequency.exponentialRampToValueAtTime(f*.45,t+.07);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.09);
    o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.1);
    if(!noise){noise=a.createBuffer(1,Math.floor(a.sampleRate*.012),a.sampleRate);const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length)}
    const n=a.createBufferSource(),ng=a.createGain();n.buffer=noise;ng.gain.value=vol*.35;n.connect(ng);ng.connect(a.destination);n.start(t);
  }
  function paint(){if(!btn)return;btn.classList.toggle("off",!on);btn.setAttribute("aria-pressed",String(on));btn.title=on?"Sound on":"Sound off"}
  paint();
  if(btn)btn.addEventListener("click",()=>{on=!on;try{localStorage.setItem("snd",on?"on":"off")}catch(_){}paint();tup(.16,210)});
  document.addEventListener("click",e=>{
    if(btn&&e.target.closest("#soundBtn"))return;
    if(e.target.closest("a[href],button,[role=tab],.skill-pill,.filter,.chip,summary"))tup(.16,210);
  },true);
  const ti=document.querySelector("#termInput");
  if(ti)ti.addEventListener("keydown",e=>{if(e.key==="Enter")tup(.13,180);else if(e.key.length===1||e.key==="Backspace")tup(.05,330)});
})();

/* ---- Click "puff": options swell briefly when clicked ---- */
(function(){
  if(reduce)return;
  const SEL=".skill-pill,.filter,.chip,.term-chips button,.life-nav button,.links a,.sound";
  document.addEventListener("click",e=>{
    const el=e.target.closest(SEL);if(!el)return;
    el.classList.remove("puff");void el.offsetWidth;el.classList.add("puff");
  });
  document.addEventListener("animationend",e=>{if(e.animationName==="puff")e.target.classList.remove("puff")});
})();
