
(function(){
  var root=document.documentElement;
  var PAGE_ROUTES={home:'index.html',about:'about.html',work:'results.html',contact:'contact.html'};
  function pageURL(route){return PAGE_ROUTES[route]||(route.indexOf('c-')===0?'campaign-'+route.slice(2)+'.html':'index.html')}
  function fixLinks(scope){scope.querySelectorAll('a[href^="#"]').forEach(function(a){var key=a.getAttribute('href').slice(1);if(PAGE_ROUTES[key]||key.indexOf('c-')===0){a.href=pageURL(key);a.removeAttribute('data-r')}})}

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(pointer: fine)').matches;

  /* language */
  var lang='en';
  try{ var qL=(location.search.match(/[?&]lang=(ar|en)/)||[])[1]; lang=qL||localStorage.getItem('ay-lang')||'en' }catch(e){}
  function L(en,ar){ return lang==='ar'?ar:en }
  var W={TikTok:'تيك توك',Instagram:'إنستقرام',Snapchat:'سناب شات',Macro:'ماكرو',Micro:'مايكرو',Mega:'ميجا',Assir:'عسير',Jazan:'جازان',Jeddah:'جدة',Riyadh:'الرياض',Delivery:'توصيل',Visit:'زيارة','Al Suwaidi':'السويدي','Al Rayyan':'الريان','Al Faihaa':'الفيحاء',Nano:'نانو','Phase 1':'المرحلة 1','Phase 2':'المرحلة 2','Phase 3':'المرحلة 3','Phase 4':'المرحلة 4','Campaign type':'نوع الحملة'};
  function tw(x){ return lang==='ar'&&W[x]||x }
  var MA={hlay:{cat:'حلويات وكافيه · الرياض',period:'إطلاق حلاي كرانشي · 27–30 سبتمبر 2026',asof:'الأرقام من تقرير الحملة'},
    binrushd:{cat:'مركز عناية بالعيون · الرياض',period:'يناير 2025 — سبتمبر 2025',group:'الفرع'},
    lebohneur:{cat:'شوكولاتة بلجيكية',period:'اليوم الوطني السعودي 96 · سبتمبر 2026',asof:'الأرقام حتى 19 أكتوبر 2026'},
    'hlana-gher':{cat:'حلويات ومخبوزات',period:'سبتمبر 2025'},
    'beauty-select':{cat:'تجميل وعناية بالشعر',period:'أغسطس 2025 — نوفمبر 2025',group:'نوع الحملة'},
    noya:{cat:'عناية بالشعر',period:'أكتوبر 2025'},fekrat:{cat:'عود وعطور',period:'2025'},neptar:{cat:'عسل طبيعي',period:'2025'},
    evan:{cat:'متجر قهوة مختصة',period:'حملة UGC · مايو 2026'},
    proleaders:{cat:'معهد تدريب · الرياض وجدة',period:'اليوم الوطني 96 + العام الـ17 · سبتمبر–أكتوبر 2026',asof:'الأرقام حتى 27 أكتوبر 2026',group:'الفرع'},
    umandi:{cat:'مطعم تراثي حجازي · جدة',period:'افتتاح المطعم · يوليو–سبتمبر 2025',asof:'الأرقام من تقرير الحملة، وأرقام تيك توك محدّثة يوم 28 أكتوبر 2026'},
    udf:{cat:'ديكور وأثاث · الرياض',period:'حملة المعرض · مارس–مايو 2026',asof:'الأرقام من تقرير الحملة، وأرقام تيك توك محدّثة يوم 28 أكتوبر 2026'},
    zaitia:{cat:'لوحات وديكور منزلي · الرياض',period:'زيارات وتوصيل · مارس–أبريل 2026',asof:'الأرقام من تقرير الحملة، وأرقام تيك توك محدّثة يوم 28 أكتوبر 2026',group:'نوع الحملة'},
    shawate:{cat:'مطعم شواية · جدة',period:'افتتاح فرع جديد · مايو–يوليو 2026',asof:'الأرقام من تقرير الحملة، وأرقام تيك توك محدّثة يوم 28 أكتوبر 2026',group:'المرحلة'}};
  function M(id,k,v){ return lang==='ar'&&MA[id]&&MA[id][k]||v }
  var onLang=[];
  function setLang(l){
    lang=l; root.setAttribute('lang',l); root.setAttribute('dir',l==='ar'?'rtl':'ltr');
    document.querySelectorAll('[data-ar]').forEach(function(el){ if(el.getAttribute('data-en')===null) el.setAttribute('data-en',el.innerHTML); el.innerHTML=l==='ar'?el.getAttribute('data-ar'):el.getAttribute('data-en') });
    document.querySelectorAll('[data-ar-ph]').forEach(function(el){ if(el.getAttribute('data-en-ph')===null) el.setAttribute('data-en-ph',el.placeholder); el.placeholder=l==='ar'?el.getAttribute('data-ar-ph'):el.getAttribute('data-en-ph') });
    var lb=document.getElementById('lang'); if(lb) lb.setAttribute('aria-label',l==='ar'?'التبديل للإنجليزي':'Switch to Arabic');
    try{localStorage.setItem('ay-lang',l)}catch(e){}
    onLang.forEach(function(f){ try{f()}catch(e){} });
  }
  if(lang==='ar') setLang('ar');

  /* light / dark */
  try{ if(localStorage.getItem('ay-mode')==='light') root.setAttribute('data-mode','light') }catch(e){}
  document.getElementById('mode').addEventListener('click',function(){
    var l=root.getAttribute('data-mode')==='light';
    if(l) root.removeAttribute('data-mode'); else root.setAttribute('data-mode','light');
    try{localStorage.setItem('ay-mode',l?'dark':'light')}catch(e){}
  });

  document.getElementById('lang').addEventListener('click',function(){
    var nl=lang==='ar'?'en':'ar', cu=document.getElementById('curtain');
    if(reduce||!cu){ setLang(nl); return }
    cu.classList.remove('go'); void cu.offsetWidth; cu.classList.add('go');
    setTimeout(function(){ setLang(nl) },420);
  });
  /* menu */
  var ov=document.getElementById('overlay'), bg=document.getElementById('burger');
  function menu(o){ ov.classList.toggle('open',o); ov.setAttribute('aria-hidden',String(!o)); bg.setAttribute('aria-expanded',String(o)) }
  bg.addEventListener('click',function(){menu(true)});
  document.getElementById('close').addEventListener('click',function(){menu(false)});
  addEventListener('keydown',function(e){ if(e.key==='Escape') menu(false) });


  /* campaign detail */
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function K(n){ if(n>=1e6) return (n/1e6).toFixed(2).replace(/\.?0+$/,'')+'M'; if(n>=1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'')+'K'; return String(n) }
  function C(n){ return n.toLocaleString('en-US') }
  var PC={TikTok:'var(--hot)',Instagram:'var(--ink)',Snapchat:'#FFD400'};
  var sortK='v', sortAsc=false, platF='All', showAll=false, SAMPLE=10;
  function renderCamp(id){
    var c=CAMP[id], R=c.rows.map(function(r,i){return {i:i,who:r[0],pf:r[1],type:r[2],tier:r[3],v:r[4],l:r[5],c:r[6],s:r[7],u:r[8],d:r[9],g:r[10],st:r[11],e:r[5]+r[6]+r[7]}});
    var V=0,Lk=0,Cm=0,S=0,cr={}; R.forEach(function(r){V+=r.v;Lk+=r.l;Cm+=r.c;S+=r.s;cr[r.who]=1});
    var E=Lk+Cm+S, nc=Object.keys(cr).length, er=V?(E/V*100):0;
    var logo=LOGOS[id]||'';
    function agg(key){ var m={}; R.forEach(function(r){ var k=r[key]; if(!k) return; m[k]=m[k]||{v:0,n:0,who:{}}; m[k].v+=r.v; m[k].n++; m[k].who[r.who]=1 }); return Object.keys(m).map(function(k){return {k:k,v:m[k].v,n:m[k].n,w:Object.keys(m[k].who).length}}).sort(function(a,b){return b.v-a.v}) }
    function bars(list,fmt,col){ var mx=Math.max.apply(null,list.map(function(x){return x.v}))||1;
      return '<div class="hb">'+list.map(function(x,j){return '<div class="r"><span class="lbl">'+x.lbl+'</span><span class="trk"><i style="--w:'+(x.v/mx*100).toFixed(1)+'%;--dl:'+(j*0.06)+'s'+(col?';--c:'+col(x):'')+'"></i></span><span class="val">'+fmt(x)+'</span></div>'}).join('')+'</div>' }
    var plat=agg('pf'), tier=agg('tier'), grp=c.group?agg('g'):[];
    var byWho={}; R.forEach(function(r){ var b=byWho[r.who]=byWho[r.who]||{v:0,u:r.u,pf:r.pf,top:0}; b.v+=r.v; if(r.v>b.top){b.top=r.v;b.u=r.u;b.pf=r.pf} });
    var topC=Object.keys(byWho).map(function(k){return {k:k,v:byWho[k].v,u:byWho[k].u,pf:byWho[k].pf}}).sort(function(a,b){return b.v-a.v}).slice(0,10);
    var idx=CORDER.indexOf(id), prev=CORDER[(idx-1+CORDER.length)%CORDER.length], next=CORDER[(idx+1)%CORDER.length];
    var host=c.link.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');
    var h='';
    h+='<a class="back" href="#work" data-r>'+L('← Our campaigns','→ حملاتنا')+'</a>';
    h+='<header class="chero rise"><img class="big-lg" src="'+logo+'" alt="'+esc(c.n)+' logo" width="112" height="112"><div><span class="cat">'+esc(M(id,'cat',c.cat))+'</span><h1>'+esc(c.n.toUpperCase())+'</h1><p class="per">'+esc(M(id,'period',c.period))+'</p></div>'+(c.link?'<a class="blink" href="'+c.link+'" target="_blank" rel="noopener">'+esc(host)+' ↗</a>':'')+'</header>';
    h+='<div class="ckpi">'+[[V,L('Total views','إجمالي المشاهدات'),'k'],[R.length,L('Coverages','التغطيات')],[nc,L('Creators','الكريتورز')],[E,L('Engagements','التفاعلات'),'k'],[er.toFixed(2)+'%',L('Engagement rate','نسبة التفاعل')],[Math.round(V/R.length),L('Avg views / coverage','متوسط المشاهدات للتغطية'),'k']].map(function(x,j){
      var num=typeof x[0]==='number'?'<span class="count" data-to="'+x[0]+'"'+(x[2]?' data-fmt="k"':'')+'>'+(x[2]?K(x[0]):x[0])+'</span>':x[0];
      return '<div class="rise d'+Math.min(4,j)+'"><strong>'+num+'</strong><span>'+x[1]+'</span></div>'}).join('')+'</div>';
    h+='<div class="cgrid2">';
    h+='<section class="panel rise d1"><span class="kicker">'+L('Reach','الوصول')+'</span><h3>'+L('VIEWS BY PLATFORM','المشاهدات حسب المنصة')+'</h3>'+bars(plat.map(function(x){return {lbl:tw(x.k),v:x.v,n:x.n,k:x.k}}),function(x){return K(x.v)+'<small>'+x.n+L(' posts',' بوست')+'</small>'},function(x){return PC[x.k]||'var(--hot)'})+'</section>';
    h+='<section class="panel rise d2"><span class="kicker">'+L('Engagement','التفاعل')+'</span><h3>'+L('WHERE IT CAME FROM','من وين جا')+'</h3><div class="split"><i style="--w:'+(Lk/E*100||0)+'%"></i><i style="--w:'+(Cm/E*100||0)+'%"></i><i style="--w:'+(S/E*100||0)+'%"></i></div><div class="slegend"><span style="--k:var(--hot)"><b>'+K(Lk)+'</b>'+L('Likes','لايكات')+'</span><span style="--k:var(--ink)"><b>'+K(Cm)+'</b>'+L('Comments','كومنتات')+'</span><span style="--k:#FFD400"><b>'+K(S)+'</b>'+L('Shares &amp; saves','شير وحفظ')+'</span></div>'
      +(tier.length?'<span class="kicker" style="margin-top:.6rem">'+L('Creator tiers','فئات الكريتورز')+'</span>'+bars(tier.map(function(x){return {lbl:tw(x.k),v:x.w}}),function(x){return x.v+'<small>'+L('creators','كريتور')+'</small>'}):'')+'</section>';
    if(grp.length) h+='<section class="panel wide rise"><span class="kicker">'+esc(M(id,'group',c.group))+'</span><h3>'+L('BY '+esc(c.group.toUpperCase()),'حسب '+esc(M(id,'group',c.group)))+'</h3>'+bars(grp.map(function(x){return {lbl:tw(x.k),v:x.v,n:x.n}}),function(x){return K(x.v)+'<small>'+x.n+L(' posts',' بوست')+'</small>'})+'</section>';
    h+='</div>';
    /* top 5 coverage cards (report style) */
    var top5=R.slice().sort(function(a,b){return b.v-a.v}).slice(0,5);
    var bestEr=top5.reduce(function(m,r){return (r.v&&r.e/r.v>m)?r.e/r.v:m},0), bestSh=Math.max.apply(null,top5.map(function(r){return r.s}));
    var shots=(window.SHOTS&&SHOTS[id])||[], fol=(window.FOL&&FOL[id])||{};
    h+='<section class="tops5"><div class="t5head rise"><span class="kicker">'+L('Top 5 coverages','أعلى 5 تغطيات')+'</span><h3>'+L('THE CONTENT THAT <span class="red">DROVE IT</span>','المحتوى اللي <span class="red">صنع الفرق</span>')+'</h3><p>'+L('The five highest-reach coverages in this campaign, out of '+R.length+'.','أعلى خمس تغطيات وصولاً في الحملة، من أصل '+R.length+'.')+'</p></div><div class="t5grid">';
    top5.forEach(function(r,j){
      var erv=r.v?r.e/r.v*100:0, f=fol[r.who]||0, notes=[];
      if(j===0) notes.push(L('Highest views in the campaign.','أعلى مشاهدات في الحملة.'));
      if(f&&r.v>f) notes.push(L('Views passed the account’s followers ('+Math.round(r.v/f*100)+'%).','المشاهدات عدّت عدد متابعين الحساب ('+Math.round(r.v/f*100)+'%).'));
      if(r.v&&r.e/r.v===bestEr&&top5.length>1) notes.push(L('Best engagement rate in the top 5.','أعلى نسبة تفاعل في التوب 5.'));
      if(r.s===bestSh&&r.s>0&&j>0) notes.push(L('Most shares & saves in the top 5.','أكثر شير وحفظ في التوب 5.'));
      if(!notes.length) notes.push(Math.round(r.v/V*100)+L('% of all campaign views.','% من كل مشاهدات الحملة.'));
      var link=r.u&&r.u.indexOf('pcloud')<0?r.u:(r.u||'');
      var media=shots[j]?'<img class="still" src="'+shots[j]+'" alt="Still from @'+esc(r.who)+'’s video" loading="lazy">':'<div class="poster"><img src="'+logo+'" alt=""><span class="ph">'+esc(tw(r.pf))+'</span><b>@'+esc(r.who)+'</b></div>';
      h+='<article class="t5 rise d'+Math.min(4,j)+'" style="--i:'+j+'"><a class="media" href="'+esc(link||'#')+'" target="_blank" rel="noopener" aria-label="Watch @'+esc(r.who)+'’s coverage">'+media+'<span class="rank">#'+(j+1)+'</span><span class="plat" style="--c:'+(PC[r.pf]||'var(--hot)')+'">'+esc(tw(r.pf))+'</span><span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></a>'
        +'<div class="t5b"><div class="t5h"><h4>@'+esc(r.who)+'</h4>'+(f?'<span class="tg">'+K(f)+L(' followers',' متابع')+'</span>':(r.tier?'<span class="tg">'+esc(tw(r.tier))+'</span>':''))+'</div>'
        +'<div class="t5s"><div><b>'+K(r.v)+'</b><span>'+L('Views','مشاهدات')+'</span></div><div><b>'+K(r.l)+'</b><span>'+L('Likes','لايكات')+'</span></div><div><b>'+K(r.c)+'</b><span>'+L('Comments','كومنتات')+'</span></div><div><b>'+K(r.s)+'</b><span>'+L('Shares','شير')+'</span></div></div>'
        +'<span class="erp'+(erv>=1?'':' low')+'">ER '+erv.toFixed(2)+'%</span><p class="t5n">'+notes.join(' ')+'</p>'
        +(link?'<a class="t5l" href="'+esc(link)+'" target="_blank" rel="noopener">'+(link.indexOf('pcloud')>=0?L('Open story file','افتح ملف الستوري'):L('Watch on '+esc(r.pf),'شوف على '+esc(tw(r.pf))))+L(' →',' ←')+'</a>':'')+'</div></article>';
    });
    h+='</div><p class="cnote">'+(c.asof?esc(M(id,'asof',c.asof))+'. ':'')+L('Showing 5 of '+R.length+' coverages.','معروض 5 من '+R.length+' تغطية.')+'</p></section>';
    h+='<nav class="cnav" aria-label="More campaigns"><a href="#c-'+prev+'" data-r><span>'+L('← Previous','→ السابق')+'</span><b>'+esc((CAMP[prev]||UGC[prev]).n.toUpperCase())+'</b></a><a href="#c-'+next+'" data-r><span>'+L('Next →','التالي ←')+'</span><b>'+esc((CAMP[next]||UGC[next]).n.toUpperCase())+'</b></a></nav>';
    var box=document.getElementById('camp'); box.innerHTML=h; fixLinks(box);
    document.title=c.n+' · '+L('Trenova Agency','منصة ترينوفا');
  }


  /* UGC campaign page */
  var lbList=[], lbI=0;
  function renderUGC(id){
    var c=UGC[id], V=c.videos, CR=c.creators;
    var logo=LOGOS[id]||'';
    var tot=V.reduce(function(a,v){return a+v.d},0), ig=CR.filter(function(x){return x.pf==='Instagram'}).length, tt=CR.length-ig;
    var order=CORDER.concat(['evan']).filter(function(x,i,a){return a.indexOf(x)===i});
    var idx=order.indexOf(id), prev=order[(idx-1+order.length)%order.length], next=order[(idx+1)%order.length];
    function nm(k){ return (CAMP[k]||UGC[k]).n.toUpperCase() }
    var h='<a class="back" href="#work" data-r>'+L('← Our campaigns','→ حملاتنا')+'</a>';
    h+='<header class="chero rise"><img class="big-lg" src="'+logo+'" alt="'+esc(c.n)+' logo" width="112" height="112"><div><span class="cat">'+esc(M(id,'cat',c.cat))+'</span><h1>'+esc(c.n.toUpperCase())+'</h1><p class="per">'+esc(M(id,'period',c.period))+'</p></div><a class="blink" href="'+c.link+'" target="_blank" rel="noopener">'+esc(c.link.replace(/^https?:\/\/(www\.)?/,''))+' ↗</a></header>';
    h+='<div class="ckpi">'+[[CR.length,L('Creators','كريتورز')],[V.length,L('Videos delivered','فيديو تم تسليمه')],[(tot/60).toFixed(1),L('Minutes of content','دقيقة محتوى')],[Math.round(tot/V.length)+L('s',' ث'),L('Average length','متوسط مدة الفيديو')],[ig,L('Instagram creators','كريتورز إنستقرام')],[tt,L('TikTok creators','كريتورز تيك توك')]].map(function(x,j){return '<div class="rise d'+Math.min(4,j)+'"><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>'}).join('')+'</div>';
    h+='<div class="ugc-note rise d2"><div class="ic"><svg viewBox="0 0 24 24"><path d="M15 10l5-3v10l-5-3z"/><rect x="3" y="6" width="12" height="12" rx="2"/></svg></div><p>'+L('<b>UGC, no posting.</b> Creators filmed product videos for Evan Coffee to use on its own accounts and in ads. Nothing went up on the creators\' pages, so this campaign is measured by the content delivered, not by views.','<b>UGC، بدون نشر.</b> صوّر صنّاع المحتوى فيديوهات للمنتج عشان تستخدمها Evan Coffee في حساباتها وإعلاناتها. ما نُشر شي في صفحاتهم، ولهذا تنقاس الحملة بالمحتوى المسلَّم مو بالمشاهدات.')+'</p></div>';
    h+='<section class="tops5"><div class="t5head rise"><span class="kicker">'+L('The videos','الفيديوهات')+'</span><h3>'+L('WATCH THE <span class="red">CONTENT</span>','شوف <span class="red">المحتوى</span>')+'</h3><p>'+L('Tap any video to watch it with sound.','اضغط على أي فيديو لمشاهدته بالصوت.')+'</p></div><div class="vwall">';
    V.forEach(function(v,j){ h+='<div class="vt" role="button" tabindex="0" data-i="'+j+'" aria-label="Play video '+(j+1)+'"><img src="'+v.p+'" alt="Evan Coffee UGC video '+(j+1)+'" loading="lazy" decoding="async"><span class="pl"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg></span><span class="vn">#'+(j+1)+'</span><span class="vd">0:'+String(Math.round(v.d)).padStart(2,'0')+'</span><div class="vw"><span>'+(v.who?'@'+esc(v.who):'Evan Coffee UGC')+'</span><span class="snd"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg></span></div></div>' });
    h+='<a class="vt vcta" href="https://wa.me/966511460554?text='+encodeURIComponent(L('Hi Trenova, I want UGC videos like the Evan Coffee campaign for my brand.','السلام عليكم فريق ترينوفا، نبي فيديوهات UGC مثل حملة Evan Coffee لعلامتنا.'))+'" target="_blank" rel="noopener"><span class="kicker">'+L('Your brand next?','دورك الجاي؟')+'</span><b>'+L('WANT CONTENT LIKE THIS?','تبي محتوى مثله؟')+'</b><span class="vc-b">'+L('Chat on WhatsApp →','تواصل عبر واتساب ←')+'</span></a>';
    h+='</div></section>';
    h+='<section class="tops5"><div class="t5head rise"><span class="kicker">'+L('The creators','الكريتورز')+'</span><h3>'+L('WHO MADE <span class="red">IT</span>','مين <span class="red">صنعه</span>')+'</h3></div><div class="crgrid">'+CR.map(function(x){return '<a class="crc '+(x.pf==='TikTok'?'tt':'ig')+'" href="'+esc(x.u)+'" target="_blank" rel="noopener"><b>@'+esc(x.h)+'</b><span>'+tw(x.pf)+' ↗</span></a>'}).join('')+'</div></section>';
    h+='<nav class="cnav" aria-label="More campaigns"><a href="#c-'+prev+'" data-r><span>'+L('← Previous','→ السابق')+'</span><b>'+nm(prev)+'</b></a><a href="#c-'+next+'" data-r><span>'+L('Next →','التالي ←')+'</span><b>'+nm(next)+'</b></a></nav>';
    var box=document.getElementById('camp'); box.innerHTML=h; fixLinks(box);
    lbList=V;
    box.querySelectorAll('.vt').forEach(function(t){ var open=function(){ openLB(+t.dataset.i) }; t.addEventListener('click',open); t.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open() } }) });
    autoPlay(box);
    document.title=c.n+' · '+L('Trenova Agency','منصة ترينوفا');
  }
  function autoPlay(root){
    if(reduce||!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    root.querySelectorAll('.vt').forEach(function(t){
      if(t.dataset.hp) return; t.dataset.hp='1';
      t.addEventListener('mouseenter',function(){ var it=lbList[+t.dataset.i]; if(!it||t._v) return; var v=document.createElement('video'); v.muted=true; v.loop=true; v.playsInline=true; v.preload='auto'; v.src=it.f; t.insertBefore(v,t.firstChild.nextSibling); v.addEventListener('playing',function(){ v.classList.add('on'); t.classList.add('playing') }); var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){}); t._v=v });
      t.addEventListener('mouseleave',function(){ var v=t._v; if(v){ v.pause(); v.removeAttribute('src'); v.load(); v.remove(); t._v=null } t.classList.remove('playing') });
    });
  }
  function openLB(i){
    var lb=document.getElementById('lb'), v=document.getElementById('lbv'); lbI=(i+lbList.length)%lbList.length; document.querySelectorAll('.vt video').forEach(function(x){x.pause()});
    v.src=lbList[lbI].f; v.poster=lbList[lbI].p; lb.hidden=false; v.muted=false; var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){});
    document.getElementById('lbx').focus();
  }
  function closeLB(){ var lb=document.getElementById('lb'), v=document.getElementById('lbv'); v.pause(); v.removeAttribute('src'); v.load(); lb.hidden=true }
  document.getElementById('lbx').addEventListener('click',closeLB);
  document.getElementById('lbp').addEventListener('click',function(){ openLB(lbI-1) });
  document.getElementById('lbn').addEventListener('click',function(){ openLB(lbI+1) });
  document.getElementById('lb').addEventListener('click',function(e){ if(e.target.id==='lb') closeLB() });
  addEventListener('keydown',function(e){ if(document.getElementById('lb').hidden) return; if(e.key==='Escape') closeLB(); if(e.key==='ArrowRight') openLB(lbI+1); if(e.key==='ArrowLeft') openLB(lbI-1) });
  autoPlay(document);

  onLang.push(function(){ if(current==='campaign'&&curHash) show(curHash) });
  /* router */
  var views={}; document.querySelectorAll('.view').forEach(function(v){views[v.dataset.view]=v});
  var band=document.getElementById('cta-band'), curtain=document.getElementById('curtain'), current=null;
  var curHash=null;
  function show(name){
    curHash=name; var camp=null;
    if(/^c-/.test(name)&&window.CAMP&&CAMP[name.slice(2)]){ camp=name.slice(2); renderCamp(camp); name='campaign' }
    else if(/^c-/.test(name)&&window.UGC&&UGC[name.slice(2)]){ camp=name.slice(2); renderUGC(camp); name='campaign' }
    if(!views[name]||name==='campaign'&&!camp) name=document.body.dataset.page||'home';
    if(!camp) document.title=L('Trenova Agency','منصة ترينوفا')+' · '+(document.body.dataset.label||'Home');
    Object.keys(views).forEach(function(k){views[k].hidden=k!==name; views[k].classList.remove('enter')});
    band.hidden=name==='contact';
    document.querySelectorAll('[data-r]').forEach(function(a){ if(a.closest('.menu-inline')) a.setAttribute('aria-current',(a.getAttribute('href')===pageURL(name)||name==='campaign'&&a.getAttribute('href')===pageURL('work'))?'page':'false') });
    void views[name].offsetWidth; views[name].classList.add('enter');
    scrollTo(0,0); current=name; setupReveal(); counted=false; watchCounts(); if(typeof enhance==='function'){ enhance(views[name]); tlProgress(); btMove() }
  }
  function go(name){
    menu(false);
    if(name===current||(name===curHash)){ scrollTo({top:0,behavior:'smooth'}); return }
    if(reduce||current===null){ show(name); return }
    curtain.classList.remove('go'); void curtain.offsetWidth; curtain.classList.add('go');
    setTimeout(function(){show(name)},420);
  }
  fixLinks(document);
  if(location.hash&&document.body.dataset.page==='home'){var old=location.hash.slice(1);if(PAGE_ROUTES[old]||old.indexOf('c-')===0){location.replace(pageURL(old));return}}
  /* reveal on scroll (only below the fold; never hides content) */
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{threshold:.1}):null;
  function setupReveal(){
    if(reduce||!io) return;
    var vh=innerHeight;
    views[current].querySelectorAll('.rv').forEach(function(el){
      el.classList.remove('pre');
      if(el.getBoundingClientRect().top>vh*.92){ el.classList.add('pre'); io.observe(el) }
    });
  }

  /* count up */
  function fmt(v,f){ if(f==='c') return Math.round(v).toLocaleString('en-US'); if(f==='m') return v>=1e8?String(Math.round(v/1e6)):(v/1e6).toFixed(1); if(f==='k'){ if(v>=1e6) return (v/1e6).toFixed(1).replace(/\.0$/,'')+'M'; if(v>=1e3) return Math.round(v/1e3)+'K'; return Math.round(v)+''} return Math.round(v)+'' }
  var counted=false, cio=null;
  function watchCounts(){
    var box=views[current]; if(!box||reduce||!box.querySelector('.count')) return;
    if(cio) cio.disconnect();
    cio=new IntersectionObserver(function(es){ es.forEach(function(en){ if(!en.isIntersecting||en.target.dataset.done) return; en.target.dataset.done=1; cio.unobserve(en.target);
      en.target.querySelectorAll('.count').forEach(function(c){ var to=+c.dataset.to,t0=null;
        (function f(t){ if(!t0)t0=t; var p=Math.min(1,(t-t0)/1400); var val=to*(1-Math.pow(1-p,3)); c.textContent=fmt(val,c.dataset.fmt); if(p<1) requestAnimationFrame(f) })(performance.now()) }) }) },{threshold:.3});
    box.querySelectorAll('.stats,.totals,.case,.ckpi').forEach(function(el){cio.observe(el)});
  }

  /* typed roles */
  var typed=document.getElementById('typed');
  if(typed){
  var LINES={ar:['خبرة وكالتنا أكثر من 5 سنين في الإنفلونسر ماركتنج','أكثر من 5,000 كريتور و100 براند','أكثر من 150 مليون مشاهدة','ترينوفا · Lead the Trend','اختيار الكريتورز والتواصل معهم','حملات تيك توك تجيب نتيجة','شراكات براندات تدوم']};
  var lines=['5+ years of agency experience in influencer marketing','5,000+ creators · 100+ brands','150M+ views generated','Trenova, Lead the Trend','Creator sourcing & outreach','TikTok campaigns that convert','Brand partnerships that last']; LINES.en=lines; if(lang==='ar'){ lines=LINES.ar; typed.textContent=lines[0] }
  onLang.push(function(){ lines=LINES[lang]; typed.textContent=lines[0]; if(typeof li!=='undefined'){ li=0; ci=lines[0].length; del=true } });
  if(!reduce){
    var li=0, ci=lines[0].length, del=true;
    setTimeout(function tick(){
      var s=lines[li];
      if(del){ ci--; if(ci<=0){ del=false; li=(li+1)%lines.length } }
      else { ci++; if(ci>=lines[li].length){ del=true; typed.textContent=lines[li]; return setTimeout(tick,2200) } }
      typed.textContent=lines[li].slice(0,Math.max(0,ci));
      setTimeout(tick,del?28:55);
    },2400);
  }

  }
  /* copy */
  var cp=document.getElementById('copy'), mail=document.getElementById('mail');
  if(cp) cp.addEventListener('click',function(){
    var done=function(){cp.textContent=L('Copied','تم النسخ');setTimeout(function(){cp.textContent=L('Copy','نسخ')},1600)};
    var sel=function(){var r=document.createRange();r.selectNodeContents(mail);var s=getSelection();s.removeAllRanges();s.addRange(r)};
    try{navigator.clipboard.writeText(mail.textContent.trim()).then(done,sel)}catch(e){sel()}
  });


  /* motion: glare, sweep, tilt */
  var TILT='.case,.card,.stat,.ti .box,.cert,.cbox,.edu,.ckpi > div,.panel,.t5,.next li';
  function enhance(root){
    if(reduce) return;
    root.querySelectorAll(TILT).forEach(function(el,i){
      if(el.dataset.fx) return; el.dataset.fx=1; el.classList.add('hov');
      if(getComputedStyle(el).position==='static') el.style.position='relative';
      var g=document.createElement('span'); g.className='glare'; el.appendChild(g);
      if(el.matches('.case,.card,.stat')){ var w=document.createElement('span'); w.className='sweep'; w.style.setProperty('--sd',(i%5)*1.3+'s'); el.appendChild(w) }
      if(!fine) return;
      var lift=el.matches('.panel')?0:-6, amt=el.matches('.panel,.case.feat')?3:7;
      el.addEventListener('mousemove',function(e){ if(el.classList.contains('pre')) return; var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        el.style.setProperty('--gx',(x*100)+'%'); el.style.setProperty('--gy',(y*100)+'%');
        el.style.transition='transform .15s ease-out,border-color .35s,box-shadow .35s'; el.style.transform='perspective(1000px) rotateX('+((.5-y)*amt).toFixed(2)+'deg) rotateY('+((x-.5)*amt).toFixed(2)+'deg) translateY('+lift+'px)' });
      el.addEventListener('mouseleave',function(){ el.style.transition=''; el.style.transform='' });
    });
  }
  /* timeline progress */
  function tlProgress(){ var tl=views[current]&&views[current].querySelector('.tl'); if(!tl) return; var r=tl.getBoundingClientRect(); var p=(innerHeight*.6-r.top)/r.height; tl.style.setProperty('--tlp',Math.max(0,Math.min(1,p)).toFixed(3)) }
  addEventListener('scroll',function(){ if(!reduce) tlProgress() },{passive:true});


  /* big text: skew + speed-up with scroll velocity */
  var bigs=[].slice.call(document.querySelectorAll('.bigtext')), lastY=scrollY, vel=0, btRaf=null;
  function btMove(){ lastY=scrollY }
  addEventListener('scroll',function(){ if(reduce) return; var dy=scrollY-lastY; lastY=scrollY; vel=Math.max(-14,Math.min(14,dy*.35)); bigs.forEach(function(b){ b.style.setProperty('--skew',(-vel)+'deg'); b.querySelectorAll('.bt-track').forEach(function(t){ t.getAnimations().forEach(function(an){ an.playbackRate=1+Math.min(4,Math.abs(dy)/12) }) }) }); clearTimeout(btRaf); btRaf=setTimeout(function(){ bigs.forEach(function(b){ b.style.setProperty('--skew','0deg'); b.querySelectorAll('.bt-track').forEach(function(t){ t.getAnimations().forEach(function(an){ an.playbackRate=1 }) }) }) },140) },{passive:true});
  /* click embers */
  addEventListener('pointerdown',function(e){ if(reduce) return; for(var i=0;i<10;i++){ var d=document.createElement('i'); d.className='burst'; var a=Math.random()*6.283, r=30+Math.random()*50; d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px'; d.style.setProperty('--bx',Math.cos(a)*r+'px'); d.style.setProperty('--by',Math.sin(a)*r+'px'); document.body.appendChild(d); setTimeout(function(x){x.remove()},750,d) } });


  /* message builder (chat) */
  (function(){
    var send=document.getElementById('send'), bub=document.getElementById('bubble'); if(!send) return;
    var labels={'a full influencer campaign':'A full influencer campaign','access to our creator network':'Our creator network','campaign reporting and analytics':'Reporting and analytics','a monthly partnership with a dedicated team':'A monthly partnership'};
    function sel(id){ return [].slice.call(document.querySelectorAll('#'+id+' [aria-pressed="true"]')).map(function(b){return b.dataset.v}) }
    function list(a){ return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1] }
    function build(){
      var n=document.getElementById('f-name').value.trim(), br=document.getElementById('f-brand').value.trim(), note=document.getElementById('f-note').value.trim();
      var need=sel('pk-need')[0], pl=sel('pk-plat');
      var labAr={'a full influencer campaign':'حملة إنفلونسرز كاملة','access to our creator network':'الاستفادة من شبكة كريتورز','campaign reporting and analytics':'تقارير وتحليلات للحملات','a monthly partnership with a dedicated team':'شراكة شهرية مع فريق مخصص'};
      document.getElementById('ans-need').textContent=need?(lang==='ar'?labAr[need]:labels[need]):'';
      document.getElementById('ans-plat').textContent=pl.map(tw).join(' · ');
      var t;
      if(lang==='ar'){
        var pa=pl.map(tw), la=pa.length<2?pa.join(''):pa.slice(0,-1).join('، ')+' و'+pa[pa.length-1];
        t='السلام عليكم فريق ترينوفا'+(n?'، معكم '+n:'')+(br?' من '+br:'')+'.';
        t+='\nنبي '+(need?labAr[need]:'خدمات التسويق بالمؤثرين')+(pa.length?' على '+la:'')+' في السعودية.';
        if(note) t+='\n'+note;
        t+='\nننتظر تواصلكم.';
      } else {
      t='Hello Trenova team'+(n?', this is '+n:'')+(br?' from '+br:'')+'.';
      t+='\nWe\'re looking for '+(need||'help with influencer marketing')+(pl.length?' on '+list(pl):'')+' in Saudi Arabia.';
      if(note) t+='\n'+note;
      t+='\nCould we schedule a call?';
      }
      bub.textContent=t; send.href='https://wa.me/966511460554?text='+encodeURIComponent(t);
    }
    document.querySelectorAll('#pk-need .opt').forEach(function(b){ b.addEventListener('click',function(){ document.querySelectorAll('#pk-need .opt').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))}); var o=document.getElementById('ans-need'); o.style.animation='none'; void o.offsetWidth; o.style.animation=''; build() }) });
    document.querySelectorAll('#pk-plat .pl').forEach(function(b){ b.addEventListener('click',function(){ b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true')); build() }) });
    ['f-name','f-brand','f-note'].forEach(function(id){ document.getElementById(id).addEventListener('input',build) });
    build(); onLang.push(build);
  })();

  /* project brief builder (start-project page) */
  (function(){
    var send=document.getElementById('sp-send'); if(!send) return;
    var mail=document.getElementById('sp-mail'), bub=document.getElementById('sp-bubble');
    function one(id){ var b=document.querySelector('#'+id+' [aria-pressed="true"]'); return b?{v:b.dataset.v||'',a:b.dataset.va||''}:{v:'',a:''} }
    function many(id){ return [].slice.call(document.querySelectorAll('#'+id+' [aria-pressed="true"]')).map(function(b){ return {v:b.dataset.v||'',a:b.dataset.va||''} }) }
    function joinEn(a){ return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1] }
    function joinAr(a){ return a.length<2?a.join(''):a.slice(0,-1).join('، ')+' و'+a[a.length-1] }
    function build(){
      var n=document.getElementById('sp-name').value.trim(), br=document.getElementById('sp-brand').value.trim(), c=document.getElementById('sp-city').value.trim(), note=document.getElementById('sp-note').value.trim();
      var need=one('sp-need'), pl=many('sp-plat'), bud=one('sp-budget'), whn=one('sp-when');
      var t, lines=[];
      if(lang==='ar'){
        t='أهلاً ترينوفا'+(n?'، معك '+n:'')+(br?' من '+br:'')+'.';
        if(need.a) lines.push('الخدمة: '+need.a);
        if(pl.length) lines.push('المنصات: '+joinAr(pl.map(function(x){return x.a})));
        if(bud.a) lines.push('الميزانية التقريبية: '+bud.a);
        if(whn.a) lines.push('الإطلاق: '+whn.a);
        if(c) lines.push('المدينة: '+c);
        if(note) lines.push(note);
        lines.push('ممكن نتكلم؟');
      } else {
        t='Hi Trenova'+(n?', this is '+n:'')+(br?' from '+br:'')+'.';
        if(need.v) lines.push('Service: '+need.v);
        if(pl.length) lines.push('Platforms: '+joinEn(pl.map(function(x){return x.v})));
        if(bud.v) lines.push('Rough budget: '+bud.v);
        if(whn.v) lines.push('Launch: '+whn.v);
        if(c) lines.push('City: '+c);
        if(note) lines.push(note);
        lines.push('Can we talk?');
      }
      t+='\n'+lines.join('\n');
      bub.textContent=t;
      send.href='https://wa.me/966511460554?text='+encodeURIComponent(t);
      if(mail) mail.href='mailto:trenovaagency@gmail.com?subject='+encodeURIComponent((lang==='ar'?'بريف مشروع':'Project brief')+(br?' — '+br:''))+'&body='+encodeURIComponent(t);
    }
    function single(id){ document.querySelectorAll('#'+id+' [aria-pressed]').forEach(function(b){ b.addEventListener('click',function(){ document.querySelectorAll('#'+id+' [aria-pressed]').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)) }); build() }) }) }
    single('sp-need'); single('sp-budget'); single('sp-when');
    document.querySelectorAll('#sp-plat .pl').forEach(function(b){ b.addEventListener('click',function(){ b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true')); build() }) });
    ['sp-name','sp-brand','sp-city','sp-note'].forEach(function(id){ document.getElementById(id).addEventListener('input',build) });
    var sub=document.getElementById('sp-submit'), st=document.getElementById('sp-status');
    if(sub){ sub.addEventListener('click',function(){
      var n=document.getElementById('sp-name').value.trim(), br=document.getElementById('sp-brand').value.trim();
      function say(en,ar,ok){ st.textContent=lang==='ar'?ar:en; st.style.color=ok?'#86EFAC':'#FCA5A5' }
      if(document.getElementById('sp-honey').value){ return }
      if(!n||!br){ say('Please add your name and brand first.','فضلاً اكتب اسمك واسم البراند أول.',false); return }
      var need=one('sp-need'), pl=many('sp-plat'), bud=one('sp-budget'), whn=one('sp-when');
      var fd=new FormData();
      fd.append('_subject','New project brief: '+br+' ('+n+')');
      fd.append('_template','table'); fd.append('_captcha','false');
      fd.append('Name',n); fd.append('Brand',br); fd.append('City',document.getElementById('sp-city').value.trim());
      fd.append('Service',need.v); fd.append('Platforms',pl.map(function(x){return x.v}).join(', '));
      fd.append('Budget',bud.v); fd.append('Launch',whn.v); fd.append('Notes',document.getElementById('sp-note').value.trim());
      fd.append('Full message',bub.textContent); fd.append('Page language',lang);
      sub.disabled=true; say('Sending...','جاري الإرسال...',true);
      fetch('https://formsubmit.co/ajax/trenovaagency@gmail.com',{method:'POST',body:fd,headers:{'Accept':'application/json'}})
        .then(function(r){ return r.json() })
        .then(function(d){ if(d&&(d.success===true||d.success==='true')){ say('Sent. Our team will get back to you soon.','وصل البريف لفريقنا، بنرجع لك قريب.',true); sub.style.display='none' } else { throw new Error('fail') } })
        .catch(function(){ sub.disabled=false; say('Could not send. Please use WhatsApp or email below.','ما قدرنا نرسل. فضلاً استخدم الواتساب أو الإيميل تحت.',false) });
    }) }
    build(); onLang.push(build);
  })();

  /* scroll progress */
  var prog=document.getElementById('prog');
  addEventListener('scroll',function(){ var h=document.documentElement.scrollHeight-innerHeight; prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')' },{passive:true});

  /* 3D brand ring */
  (function(){
    var host=document.getElementById('ring3d'); if(!host||!window.THREE) { if(host) host.style.display='none'; return }
    var T=THREE, cv=document.getElementById('ringc'), tip=document.getElementById('ringtip');
    var items=RING_ITEMS;
    var ren=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true}); ren.setPixelRatio(Math.min(2,devicePixelRatio||1));
    var scene=new T.Scene(), cam=new T.PerspectiveCamera(40,1,.1,100); cam.position.set(0,1.6,11.5); cam.lookAt(0,-.2,0);
    var group=new T.Group(); scene.add(group);
    var R=Math.max(4.4,items.length*2.5/(2*Math.PI)), EX=(R-4.4)*1.9, meshes=[];
    items.forEach(function(it,i){
      var c=document.createElement('canvas'); c.width=c.height=512; var x=c.getContext('2d');
      var tex=new T.CanvasTexture(c); tex.anisotropy=4;
      var mat=new T.MeshBasicMaterial({map:tex,transparent:true,side:T.DoubleSide});
      var m=new T.Mesh(new T.PlaneGeometry(2.1,2.1),mat); var a=i/items.length*Math.PI*2;
      m.position.set(Math.sin(a)*R,0,Math.cos(a)*R); m.userData={id:it.id,name:it.name,ugc:it.ugc,vw:it.vw,a:a,hover:0}; group.add(m); meshes.push(m);
      var img=new Image(); img.onload=function(){
        x.clearRect(0,0,512,512);
        var r=70; x.fillStyle='#ffffff'; x.beginPath(); x.moveTo(r,0); x.arcTo(512,0,512,512,r); x.arcTo(512,512,0,512,r); x.arcTo(0,512,0,0,r); x.arcTo(0,0,512,0,r); x.closePath(); x.fill();
        x.save(); x.clip(); x.drawImage(img,0,0,512,512); x.restore();
        x.lineWidth=10; x.strokeStyle='rgba(167,139,250,.9)'; x.stroke();
        tex.needsUpdate=true };
      img.src=it.src;
    });
    // glow floor + particles
    var floor=new T.Mesh(new T.RingGeometry(R-.15,R+.15,128),new T.MeshBasicMaterial({color:'#A78BFA',transparent:true,opacity:.45,side:T.DoubleSide,blending:T.AdditiveBlending}));
    floor.rotation.x=-Math.PI/2; floor.position.y=-1.5; scene.add(floor);
    var floor2=new T.Mesh(new T.RingGeometry(0,R*1.35,64),new T.MeshBasicMaterial({color:'#A78BFA',transparent:true,opacity:.06,side:T.DoubleSide}));
    floor2.rotation.x=-Math.PI/2; floor2.position.y=-1.52; scene.add(floor2);
    var n=260, pp=new Float32Array(n*3); for(var k=0;k<n;k++){ var aa=Math.random()*6.283, rr=R+(Math.random()-.5)*3; pp[k*3]=Math.cos(aa)*rr; pp[k*3+1]=(Math.random()-.5)*4; pp[k*3+2]=Math.sin(aa)*rr }
    var pg=new T.BufferGeometry(); pg.setAttribute('position',new T.BufferAttribute(pp,3));
    var spark=new T.Points(pg,new T.PointsMaterial({color:'#ff6b7c',size:.05,transparent:true,opacity:.8,blending:T.AdditiveBlending})); scene.add(spark);
    function size(){ var w=host.clientWidth,h=host.clientHeight; if(!w||!h) return; ren.setSize(w,h,false); cam.aspect=w/h; var m=w<640; cam.fov=m?52:40; cam.position.set(0,(m?3.4:1.6)+EX*.25,(m?10.5:11.5)+EX); cam.lookAt(0,m?-.6:-.2,0); group.scale.setScalar(m?.82:1); meshes.forEach(function(x){x.userData.base=m?1.35:1}); cam.updateProjectionMatrix() }
    size(); addEventListener('resize',size); if(window.ResizeObserver) new ResizeObserver(size).observe(host);
    var rot=0, vel=reduce?0:.004, drag=false, lx=0, moved=0, ray=new T.Raycaster(), mp=new T.Vector2(-9,-9), hov=null;
    function setMP(e){ var r=cv.getBoundingClientRect(); mp.x=(e.clientX-r.left)/r.width*2-1; mp.y=-(e.clientY-r.top)/r.height*2+1 }
    host.addEventListener('pointerdown',function(e){ drag=true; lx=e.clientX; moved=0; host.setPointerCapture(e.pointerId) });
    host.addEventListener('pointermove',function(e){ setMP(e); if(!drag) return; var dx=e.clientX-lx; lx=e.clientX; moved+=Math.abs(dx); vel=dx*.0045; rot+=vel });
    host.addEventListener('pointerup',function(e){ drag=false; if(moved<6&&hov){ location.href=pageURL('c-'+hov.userData.id) } });
    host.addEventListener('pointerleave',function(){ mp.set(-9,-9) });
    var visible=true; if(window.IntersectionObserver) new IntersectionObserver(function(es){ visible=es[0].isIntersecting }).observe(host);
    function frame(t){
      if(visible&&!document.hidden&&host.offsetParent){
        if(!drag){ vel+=((reduce?0:.004)-vel)*.03; rot+=vel }
        group.rotation.y=rot;
        ray.setFromCamera(mp,cam); var hit=ray.intersectObjects(meshes)[0]; var h=hit?hit.object:null;
        if(h!==hov){ hov=h; host.style.cursor=h?'pointer':''; if(h){ tip.innerHTML=h.userData.name+'<small>'+(h.userData.ugc?L('11 UGC videos · tap to open','11 فيديو UGC · اضغط وافتح'):L(h.userData.vw+' views · tap to open',h.userData.vw+' مشاهدة · اضغط وافتح'))+'</small>'; tip.classList.add('on') } else tip.classList.remove('on') }
        meshes.forEach(function(m,i){ m.userData.hover+=((m===hov?1:0)-m.userData.hover)*.15; var s=(m.userData.base||1)*(1+m.userData.hover*.22); m.scale.setScalar(s);
          m.lookAt(cam.position.x*0, m.position.y, 50); m.rotation.y=-group.rotation.y; m.position.y=Math.sin(t*.0012+i)*.18+m.userData.hover*.3 });
        floor.material.opacity=.35+Math.sin(t*.002)*.12; spark.rotation.y=-t*.00008;
        ren.render(scene,cam);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  show(document.body.dataset.campaign||document.body.dataset.page||'home');
  if(reduce) return;

  /* pointer effects */
  if(fine){
    var cur=document.getElementById('cur'), dot=document.getElementById('dot'), tx=-100,ty=-100,cx=-100,cy=-100;
    addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');dot.classList.add('on');dot.style.transform='translate('+tx+'px,'+ty+'px)'});
    (function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
    document.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,.svc,.card'))});
    document.querySelectorAll('.tilt').forEach(function(el){
      el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        el.style.setProperty('--ry',((x-.5)*10).toFixed(2)+'deg');el.style.setProperty('--rx',((.5-y)*10).toFixed(2)+'deg');
        el.style.setProperty('--px',(x*100)+'%');el.style.setProperty('--py',(y*100)+'%')});
      el.addEventListener('mouseleave',function(){el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
    });
    document.querySelectorAll('.mag').forEach(function(el){
      el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left-r.width/2)*.25)+'px');el.style.setProperty('--my',((e.clientY-r.top-r.height/2)*.35)+'px')});
      el.addEventListener('mouseleave',function(){el.style.setProperty('--mx','0px');el.style.setProperty('--my','0px')});
    });
  }

  embers2D();
  function embers2D(){
  var cv=document.getElementById('embers'),ctx=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1),W,H,P=[];
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  size(); addEventListener('resize',size);
  var N=Math.round(Math.min(90,W/14));
  function mk(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*1.8+.4,vy:Math.random()*.55+.15,vx:(Math.random()-.5)*.25,a:Math.random()*.6+.25,w:Math.random()*6.28,white:Math.random()<.2}}
  for(var k=0;k<N;k++)P.push(mk(true));
  (function draw(){
    if(!document.hidden){
      ctx.clearRect(0,0,W,H);
      var light=root.getAttribute('data-mode')==='light';
      for(var i=0;i<P.length;i++){var p=P[i];p.w+=.02;p.x+=p.vx+Math.sin(p.w)*.25;p.y-=p.vy;if(p.y<-10)P[i]=p=mk(false);
        var f=Math.min(1,p.y/H*1.4);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);
        ctx.fillStyle=p.white&&!light?'rgba(244,241,252,'+(p.a*f*.6)+')':'rgba(139,92,246,'+(p.a*f)+')';
        ctx.shadowBlur=8;ctx.shadowColor='rgba(167,139,250,.8)';ctx.fill()}
    }
    requestAnimationFrame(draw);
  })();
  }
})();
