/* ---------- data ---------- */
const services=[
 {t:"Websites Institucionais",d:"O site da sua empresa com design exclusivo, conteúdo bem estruturado e presença que transmite confiança.",b:"Presença",i:"M3 12h18M3 6h18M3 18h18"},
 {t:"Landing Pages",d:"Páginas de conversão com um objetivo claro: transformar visitas em contatos e vendas.",b:"Conversão",i:"M13 2 3 14h7l-1 8 11-12h-7l1-8z"},
 {t:"Sistemas Web",d:"Aplicações construídas em torno do fluxo real da sua operação, não o contrário.",b:"Operação",i:"M4 6h16v12H4zM4 10h16"},
 {t:"Soluções Sob Medida",d:"Quando a prateleira não resolve: projetos digitais desenhados para o seu caso específico.",b:"Sob medida",i:"M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"},
 {t:"Manutenção e Evolução",d:"Seu projeto não termina no lançamento: cuidamos das atualizações e do crescimento contínuo.",b:"Suporte",i:"M12 20a8 8 0 1 1 8-8M12 12l4-4"}
];
const faqs=[
 ["Quanto tempo leva um projeto?","Depende do escopo: uma landing page costuma ficar pronta em 1 a 2 semanas; sistemas personalizados seguem cronograma definido na etapa de planejamento, sempre por escrito."],
 ["Como funciona o orçamento?","Você descreve a ideia, fazemos uma conversa de discovery e devolvemos uma proposta com escopo, prazo e valor fechados. Sem surpresa no meio do caminho."],
 ["Vocês dão suporte depois do lançamento?","Sim. Suporte é a sétima etapa do nosso processo: acompanhamos o projeto no ar, corrigimos o que for necessário e evoluímos junto com o seu negócio."],
 ["O site será meu ou fico preso a uma plataforma?","O código é seu. Entregamos projetos versionados e documentados, sem dependência de construtores fechados."],
 ["Vocês cuidam de sites que já existem?","Sim. Assumimos projetos em andamento para manutenção, redesign ou evolução: começamos com uma análise técnica do que está no ar."]
];

/* ---------- render ---------- */
const serviceList=document.getElementById('serviceList');
const serviceDetail=document.getElementById('serviceDetail');

function renderServiceDetail(idx){
  const s=services[idx];
  serviceDetail.innerHTML=`
   <span class="service-ghost">0${idx+1}</span>
   <div class="top-row">
    <span class="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${s.i}"/></svg></span>
    <span class="service-tag">${s.b}</span>
   </div>
   <h3>${s.t}</h3><p>${s.d}</p>`;
}
function setActiveService(idx){
  serviceList.querySelectorAll('.service-item').forEach((el,i)=>el.classList.toggle('active',i===idx));
  renderServiceDetail(idx);
}

serviceList.innerHTML=services.map((s,i)=>`
 <button type="button" class="service-item${i===0?' active':''}" data-i="${i}">
  <span class="service-num">0${i+1}</span><h3>${s.t}</h3>
  <span class="service-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
 </button>`).join('');
serviceList.addEventListener('mouseover',e=>{
  const btn=e.target.closest('.service-item');if(!btn)return;
  setActiveService(+btn.dataset.i);
});
serviceList.addEventListener('click',e=>{
  const btn=e.target.closest('.service-item');if(!btn)return;
  setActiveService(+btn.dataset.i);
});
renderServiceDetail(0);

const faqList=document.getElementById('faqList');
faqList.innerHTML=faqs.map((f,i)=>`
 <div class="q"><button aria-expanded="false" aria-controls="a${i}">${f[0]}
   <span class="plus"><svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.4" fill="none"><path d="M12 5v14M5 12h14"/></svg></span></button>
  <div class="a" id="a${i}" role="region"><p>${f[1]}</p></div></div>`).join('');
faqList.addEventListener('click',e=>{
  const btn=e.target.closest('button');if(!btn)return;
  const q=btn.parentElement,a=q.querySelector('.a'),open=q.classList.toggle('open');
  btn.setAttribute('aria-expanded',open);
  a.style.maxHeight=open?a.scrollHeight+'px':'0';
});

/* ---------- reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
    if(e.target.id==='tl'){e.target.querySelector('.progress').style.width='94%';e.target.classList.add('done');
      e.target.querySelectorAll('.step').forEach((s,i)=>setTimeout(()=>s.classList.add('on'),300+i*300));}
  }
}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ---------- counters ---------- */
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  const el=e.target,end=+el.dataset.count,t0=performance.now();
  const tick=t=>{const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

/* ---------- mouse parallax (orbs + dashboard tilt) ---------- */
const fine=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
if(fine){
  const orbs=document.querySelectorAll('[data-parallax]');
  addEventListener('mousemove',e=>{
    const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
    orbs.forEach(o=>{const f=+o.dataset.parallax;o.style.transform=`translate(${x*f}px,${y*f}px)`});
  });
  /* magnetic buttons */
  document.querySelectorAll('.magnetic').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`});
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });

  /* ---------- ambient cursor fx: trailing glow + spotlight + card/button proximity ---------- */
  (function(){
    const fx=document.createElement('div');
    fx.className='cursor-fx';
    fx.setAttribute('aria-hidden','true');
    fx.innerHTML='<div class="cursor-fx__spotlight"></div><div class="cursor-fx__glow"></div>';
    document.body.appendChild(fx);
    const spot=fx.querySelector('.cursor-fx__spotlight'),glow=fx.querySelector('.cursor-fx__glow');

    let mx=innerWidth/2,my=innerHeight/2;      /* raw pointer target */
    let sx=mx,sy=my,gx=mx,gy=my;               /* eased positions: spotlight tracks fast, glow lags for "weight" */

    addEventListener('mousemove',e=>{
      mx=e.clientX;my=e.clientY;
      fx.classList.add('active');
    },{passive:true});
    document.addEventListener('mouseleave',()=>fx.classList.remove('active'));

    /* cards react within ~180px of the pointer; rects are cached and only
       refreshed on resize/scroll so the rAF loop stays pure math, no layout reads */
    const RADIUS=180;
    let cards=[...document.querySelectorAll('.metric,.quote,.folio,.service-detail')].map(el=>({el,r:el.getBoundingClientRect()}));
    let rectsDirty=false;
    const markDirty=()=>{rectsDirty=true};
    addEventListener('resize',markDirty,{passive:true});
    addEventListener('scroll',markDirty,{passive:true});

    (function loop(){
      if(rectsDirty){cards.forEach(c=>c.r=c.el.getBoundingClientRect());rectsDirty=false}

      sx+=(mx-sx)*.22;sy+=(my-sy)*.22;
      gx+=(mx-gx)*.09;gy+=(my-gy)*.09;
      spot.style.setProperty('--sx',sx+'px');spot.style.setProperty('--sy',sy+'px');
      glow.style.setProperty('--gx',gx+'px');glow.style.setProperty('--gy',gy+'px');

      cards.forEach(({el,r})=>{
        const cx=r.left+r.width/2,cy=r.top+r.height/2;
        const dx=mx-cx,dy=my-cy,dist=Math.hypot(dx,dy);
        if(dist<RADIUS){
          const p=1-dist/RADIUS;
          el.style.setProperty('--lift',(-4*p).toFixed(2)+'px');
          el.style.setProperty('--rx',((-dy/RADIUS)*3*p).toFixed(2)+'deg');
          el.style.setProperty('--ry',((dx/RADIUS)*3*p).toFixed(2)+'deg');
          el.style.setProperty('--prox',p.toFixed(3));
          if(!el.classList.contains('card-active'))el.classList.add('card-active');
        }else if(el.classList.contains('card-active')){
          el.classList.remove('card-active');
          el.style.removeProperty('--lift');el.style.removeProperty('--rx');
          el.style.removeProperty('--ry');el.style.removeProperty('--prox');
        }
      });
      requestAnimationFrame(loop);
    })();

    /* buttons: reflection sheen follows the pointer inside each button */
    document.querySelectorAll('.btn,.nav-cta,.wa').forEach(b=>{
      b.addEventListener('mousemove',e=>{
        const r=b.getBoundingClientRect();
        b.style.setProperty('--bx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
        b.style.setProperty('--by',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
      });
    });
  })();
}

/* ---------- form → FormSubmit (envio direto por e-mail, sem abrir cliente local) ---------- */
document.getElementById('form').addEventListener('submit',async e=>{
  e.preventDefault();
  const f=e.target;
  if(!f.reportValidity())return;
  const btn=f.querySelector('button[type="submit"]');
  const formOk=document.getElementById('formOk');
  const ajaxUrl=f.action.replace('formsubmit.co/','formsubmit.co/ajax/');
  btn.disabled=true;
  try{
    const res=await fetch(ajaxUrl,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)});
    if(!res.ok)throw new Error('Falha no envio');
    formOk.textContent='Mensagem enviada! Vamos responder em breve.';
    formOk.style.display='block';
    f.reset();
  }catch(err){
    formOk.textContent='Não deu pra enviar agora. Tenta de novo ou manda um e-mail direto pra uplead00@gmail.com.';
    formOk.style.display='block';
  }finally{
    btn.disabled=false;
  }
});

function toggleMenu(btn){
  const mm=document.getElementById('mm'),open=mm.classList.toggle('open');
  btn.setAttribute('aria-expanded',open);
}
document.getElementById('mm').addEventListener('click',e=>{if(e.target.tagName==='A')document.getElementById('mm').classList.remove('open')});

/* ---------- hero video scroll-scrub ---------- */
(function(){
  const scrub=document.getElementById('heroScrub'),vid=document.getElementById('scrubVid');
  if(!scrub||!vid)return;
  /* usuários com "reduzir movimento" ainda controlam o vídeo pelo scroll,
     só sem o lag suavizado (nada de animação disparando sozinha) */
  const ease=matchMedia('(prefers-reduced-motion:reduce)').matches?1:0.14;

  let target=0,current=0,dur=0;
  vid.addEventListener('loadedmetadata',()=>{dur=vid.duration;vid.currentTime=0});

  /* destravar o frame do vídeo (senão fica preso no poster até um play real acontecer) */
  const unlock=()=>{vid.play().then(()=>{vid.pause();vid.currentTime=0}).catch(()=>{})};
  vid.addEventListener('loadedmetadata',unlock,{once:true});
  addEventListener('touchstart',unlock,{once:true,passive:true});
  addEventListener('click',unlock,{once:true});

  const onScroll=()=>{
    const total=scrub.offsetHeight-innerHeight;
    if(total<=0)return;
    target=Math.min(Math.max(-scrub.getBoundingClientRect().top/total,0),1);
  };
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  onScroll();

  (function loop(){
    /* interpolação suave: o vídeo persegue a posição do scroll */
    current+=(target-current)*ease;
    if(Math.abs(target-current)<0.0004)current=target;
    scrub.style.setProperty('--p',current.toFixed(4));
    if(dur){
      const t=current*(dur-0.06);
      /* seta o currentTime direto a cada frame — esperar o evento "seeked"
         antes do próximo seek trava o vídeo, pois nem todo navegador
         dispara esse evento para todo seek programático */
      if(Math.abs(vid.currentTime-t)>0.01)vid.currentTime=t;
    }
    requestAnimationFrame(loop);
  })();
})();

/* ---------- portfólio: vídeos + carrossel (dispara 1x ao entrar na viewport) ---------- */
(function(){
  const section=document.getElementById('portfolio');
  if(!section)return;

  const startVideos=()=>{
    section.querySelectorAll('video.media').forEach(v=>{
      v.src=v.dataset.src;            /* lazy-load: só carrega quando a seção aparece */
      v.load();
      v.addEventListener('canplay',()=>{v.classList.add('in');v.play().catch(()=>{})},{once:true});
    });
  };

  const startCarousel=()=>{
    const car=section.querySelector('.carousel');if(!car)return;
    const track=car.querySelector('.carousel-track');
    const slides=track.children.length;
    track.appendChild(track.children[0].cloneNode(true)); /* clone p/ loop infinito sem salto */
    let i=0,timer=null;
    car.classList.add('in');
    const step=()=>{
      i++;
      track.style.transition='transform .6s cubic-bezier(.4,0,.2,1)';
      track.style.transform=`translateX(-${i*100}%)`;
      if(i===slides){ /* chegou no clone: volta ao início sem animação */
        setTimeout(()=>{track.style.transition='none';track.style.transform='translateX(0)';i=0},620);
      }
    };
    const play=()=>{if(!timer)timer=setInterval(step,1500)};
    const stop=()=>{clearInterval(timer);timer=null};
    play();
    document.addEventListener('visibilitychange',()=>document.hidden?stop():play()); /* pausa em aba oculta */
  };

  const pio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    pio.disconnect();               /* dispara apenas uma vez */
    startVideos();
    startCarousel();
  }),{threshold:.2,rootMargin:'0px 0px 120px 0px'});
  pio.observe(section);
})();
