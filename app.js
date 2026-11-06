const albumCoverUrl=document.getElementById('knockCover').src;
/* VANTA! official concept website — edit information in this file. */
const members = [
  {id:'ihyeon',name:'서이현',latin:'SEO IHYEON',english:'IHYEON',number:'01',role:'LEADER · LEAD VOCAL',color:'#174BFF',image:'assets/seo-ihyeon.png',teaser:'assets/teaser-ihyeon.png',description:'어떤 무대에서도 중심을 잃지 않는 VANTA의 리더. 차분한 판단력과 단단한 존재감으로 팀의 방향을 이끈다.',keywords:['LEADERSHIP','COOL','STEADY'],mood:'THE UNWAVERING ONE'},
  {id:'sion',name:'백시온',latin:'BAEK SION',english:'SION',number:'02',role:'CENTER · SUB VOCAL',color:'#FF4392',image:'assets/baek-sion.png',teaser:'assets/teaser-sion.png',description:'순식간에 시선을 붙잡는 VANTA의 센터. 화려한 비주얼과 여유 있는 무대 매너가 돋보이는 멤버.',keywords:['CENTER','CHARISMA','SPARK'],mood:'THE MAGNETIC ONE'},
  {id:'dogyeom',name:'차도겸',latin:'CHA DOGYEOM',english:'DOGYEOM',number:'03',role:'MAIN RAPPER',color:'#FF5639',image:'assets/cha-dogyeom.png',teaser:'assets/teaser-dogyeom.png',description:'날카로운 래핑과 강렬한 무대 장악력으로 자신만의 색을 보여주는 메인 래퍼. 거침없는 에너지가 시그니처.',keywords:['RAP','EDGE','BOLD'],mood:'THE BOLD ONE'},
  {id:'taegyeong',name:'유태경',latin:'YOO TAEGYEONG',english:'TAEGYEONG',number:'04',role:'MAIN VOCAL',color:'#8857FF',image:'assets/yoo-taegyeong.png',teaser:'assets/teaser-taegyeong.png',description:'맑고 깊은 음색으로 VANTA의 음악에 감정을 더하는 메인 보컬. 부드러운 분위기와 진정성 있는 표현력이 매력.',keywords:['VOCAL','WARM','EMOTION'],mood:'THE GENTLE ONE'},
  {id:'seoyul',name:'한서율',latin:'HAN SEOYUL',english:'SEOYUL',number:'05',role:'LEAD DANCER · MAKNAE',color:'#D4FF39',image:'assets/han-seoyul.png',teaser:'assets/teaser-seoyul.png',description:'발랄한 에너지와 생동감 넘치는 움직임으로 무대에 활기를 더하는 막내. 기대를 뛰어넘는 반전 매력의 소유자.',keywords:['DANCE','ENERGY','PLAYFUL'],mood:'THE WILD CARD'}
];
const albums = [
  {id:'knockknock',name:'KNOCK KNOCK',chapter:'1ST MINI ALBUM',color:'#18191D',fg:'#D7D8DF',label:'THE DOOR IS NOT LOCKED.',song:'거짓된 낙원',cover:albumCoverUrl,description:'문 너머에서 들려오는 두 번의 노크. 검은 꽃과 닫힌 문, 보이지 않는 진실이 교차하는 VANTA의 첫 번째 미니앨범. 섬뜩하면서도 몽환적인 분위기를 담았다.'}
];
const notices = [
  {tag:'NOTICE',title:'VANTA 공식 홈페이지를 소개합니다',body:'VANTA의 그룹 소개, 멤버 프로필, 디스코그래피 콘셉트와 비주얼 아카이브를 한곳에서 확인할 수 있는 공식 프로젝트 홈페이지입니다.'},
  {tag:'ARTIST',title:'5인 멤버 공식 프로필 공개',body:'서이현, 백시온, 차도겸, 유태경, 한서율. 다섯 명의 개성과 컬러를 담은 프로필이 공개되었습니다. ARTIST 메뉴에서 각 멤버를 선택해 확인해 주세요.'},
  {tag:'ARCHIVE',title:'VANTA 비주얼 티저 및 원본 포트레이트 업데이트',body:'멤버별 개인 티저와 포트레이트, VANTA 그룹 티저를 ARCHIVE에서 확인할 수 있습니다. 인물 이미지는 PixAI로 제작한 원본을 재생성하지 않고 사용했습니다.'},
  {tag:'SCHEDULE',title:'새로운 활동 일정 안내',body:'새로운 프로젝트와 콘텐츠 일정은 준비가 완료되면 공개할 예정입니다. 현재 확정된 공식 일정은 없습니다.'}
];
const memberGrid=document.getElementById('memberGrid');
memberGrid.innerHTML=members.map(m=>`<button type="button" class="member-card" data-member="${m.id}" data-id="${m.id}" style="--member-color:${m.color}" aria-label="${m.name} 상세 프로필 열기"><div class="member-image"><span class="member-number">${m.number}</span><img src="${m.image}" alt="${m.name} 원본 일러스트" loading="lazy"><span class="member-arrow">↗</span></div><div class="member-details"><h3>${m.name}</h3><p>${m.english} / ${m.role}</p></div><div class="member-strip"></div></button>`).join('');
const musicGrid=document.getElementById('musicGrid');
musicGrid.innerHTML=''; // Only confirmed album appears in the main feature.
const galleryEntries = [
  {image:'assets/group-teaser.png',label:'GROUP TEASER',kind:'teaser',wide:true},
  ...members.map(m=>({image:m.image,label:`${m.english} / PORTRAIT`,kind:'portrait',wide:false})),
  ...members.map(m=>({image:m.teaser,label:`${m.english} / TEASER`,kind:'teaser',wide:false})),
  {image:albumCoverUrl,label:'KNOCK KNOCK / 1ST MINI ALBUM',kind:'album',wide:false},
  {image:'assets/vanta-original-logo.png',label:'VANTA! / OFFICIAL LOGO',kind:'logo',wide:false}
];
const gallery=document.getElementById('gallery');
gallery.innerHTML=galleryEntries.map((g,i)=>`<button type="button" class="gallery-card ${g.wide?'wide':''}" data-photo="${i}" data-kind="${g.kind}" aria-label="${g.label} 확대"><figure><img src="${g.image}" alt="${g.label}" loading="lazy"><figcaption class="gallery-caption">${g.label}<span>↗</span></figcaption></figure></button>`).join('');
document.getElementById('noticeList').innerHTML=notices.map((n,i)=>`<div class="notice-entry"><button class="notice-toggle" type="button" data-notice="${i}" aria-expanded="false" aria-controls="noticeDetail${i}"><span>${n.tag}</span><strong>${n.title}</strong><b aria-hidden="true">+</b></button><div class="notice-detail" id="noticeDetail${i}" hidden>${n.body}</div></div>`).join('');

const overlay=document.getElementById('overlay');const dialogContent=document.getElementById('dialogContent');const closeDialog=document.getElementById('closeDialog');let lastFocused=null;
function showDialog(html){lastFocused=document.activeElement;dialogContent.innerHTML=html;overlay.hidden=false;document.body.classList.add('lock-scroll');closeDialog.focus();}
function hideDialog(){overlay.hidden=true;document.body.classList.remove('lock-scroll');dialogContent.innerHTML='';if(lastFocused&&lastFocused.focus)lastFocused.focus();}
function memberDialog(id){const idx=members.findIndex(m=>m.id===id);const m=members[idx];if(!m)return;const next=members[(idx+1)%members.length];const prev=members[(idx-1+members.length)%members.length];showDialog(`<div class="profile-dialog" style="--member-color:${m.color}"><div class="profile-visual"><img src="${m.image}" alt="${m.name} 단독 초상화"><span>${m.number} / 05 · ${m.mood}</span></div><div class="profile-text"><div class="eyebrow">VANTA! / OFFICIAL MEMBER PROFILE</div><h2 id="dialogTitle">${m.name}<br><em>${m.english}.</em></h2><div class="profile-role">${m.role}</div><div class="profile-description">${m.description}</div><div class="profile-tags">${m.keywords.map(t=>`<span>${t}</span>`).join('')}</div><div class="profile-color"><div class="profile-swatch"></div>SIGNATURE COLOR / ${m.color.toUpperCase()}</div><a class="profile-photo-link" href="${m.teaser}" download="VANTA_${m.english}_TEASER.png">PERSONAL TEASER IMAGE ↓</a><div class="profile-next"><button type="button" data-profile-nav="${prev.id}">← PREV</button><button type="button" data-profile-nav="${next.id}">NEXT MEMBER →</button></div></div></div>`);}
function albumDialog(id){const a=albums.find(v=>v.id===id);if(!a)return;showDialog(`<div class="album-dialog"><img class="album-dialog-cover" src="${a.cover}" alt="${a.name} 앨범 커버" /><div class="eyebrow">${a.chapter} / VANTA! DISCOGRAPHY</div><h2 id="dialogTitle">${a.name}</h2><strong>${a.label}</strong><p><b>수록곡</b> · ${a.song}</p><p>${a.description}</p><p>다른 트랙과 발매일은 추후 안내 예정입니다.</p></div>`);}
function photoDialog(index){const item=galleryEntries[index];if(!item)return;showDialog(`<div class="photo-dialog"><img src="${item.image}" alt="${item.label}"><p id="dialogTitle">${item.label}</p><a class="profile-photo-link" href="${item.image}" download style="color:#d4ff39">OPEN ORIGINAL IMAGE ↓</a></div>`);}
document.addEventListener('click',e=>{const m=e.target.closest('[data-member]');if(m){memberDialog(m.dataset.member);return;}const p=e.target.closest('[data-profile-nav]');if(p){memberDialog(p.dataset.profileNav);return;}const a=e.target.closest('[data-album]');if(a){albumDialog(a.dataset.album);return;}const g=e.target.closest('[data-photo]');if(g){photoDialog(Number(g.dataset.photo));return;}const n=e.target.closest('[data-notice]');if(n){const parent=n.parentElement;const open=parent.classList.toggle('is-open');n.setAttribute('aria-expanded',String(open));parent.querySelector('.notice-detail').hidden=!open;return;}});
closeDialog.addEventListener('click',hideDialog);overlay.querySelector('[data-close]').addEventListener('click',hideDialog);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)hideDialog();if(e.key==='Tab'&&!overlay.hidden){const focusable=[...overlay.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.offsetParent!==null);if(focusable.length){const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}});
const menuTrigger=document.getElementById('menuTrigger'),mobileMenu=document.getElementById('mobileMenu');function toggleMenu(open){menuTrigger.setAttribute('aria-expanded',String(open));menuTrigger.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileMenu.classList.toggle('is-open',open);mobileMenu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('lock-scroll',open);}menuTrigger.addEventListener('click',()=>toggleMenu(menuTrigger.getAttribute('aria-expanded')!=='true'));mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{const v=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.gallery-card').forEach(c=>c.hidden=v!=='all'&&c.dataset.kind!==v);}));
const secretButton=document.getElementById('secretButton');secretButton.addEventListener('click',()=>{const el=document.getElementById('secretMessage');el.hidden=!el.hidden;secretButton.setAttribute('aria-expanded',String(!el.hidden));secretButton.firstChild.textContent=el.hidden?'UNLOCK THE OTHER SIDE ':'LOCK THE OTHER SIDE ';});
const navLinks=[...document.querySelectorAll('.desktop-nav a')];const sections=[...document.querySelectorAll('main > section[id]')];if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('is-active',a.hash==='#'+entry.target.id));}})},{rootMargin:'-20% 0px -65% 0px',threshold:0});sections.forEach(s=>observer.observe(s));}
/* Hero portraits are the user's original PixAI images; only DOM and CSS layout are applied. */


// VANTA! home background music: 3rd uploaded instrumental.
// Most browsers block audible autoplay until the visitor interacts.
const siteBgm = document.getElementById('siteBgm');
const bgmToggle = document.getElementById('bgmToggle');
const bgmLabel = document.getElementById('bgmLabel');
let bgmWasManuallyStopped = false;
siteBgm.volume = 0.16;
function refreshBgmButton() {
  const playing = !siteBgm.paused && !siteBgm.ended;
  bgmToggle.setAttribute('aria-pressed', String(playing));
  bgmToggle.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');
  bgmToggle.title = playing ? '배경음악 끄기' : '배경음악 켜기';
  bgmLabel.textContent = playing ? 'SOUND ON' : 'SOUND OFF';
}
async function startBgm() {
  try { await siteBgm.play(); } catch (_) { /* autoplay blocked: control remains available */ }
  refreshBgmButton();
}
bgmToggle.addEventListener('click', () => {
  if (siteBgm.paused) {
    bgmWasManuallyStopped = false;
    startBgm();
  } else {
    bgmWasManuallyStopped = true;
    siteBgm.pause();
    refreshBgmButton();
  }
});
siteBgm.addEventListener('play', refreshBgmButton);
siteBgm.addEventListener('pause', refreshBgmButton);
siteBgm.addEventListener('error', () => {
  bgmLabel.textContent = 'AUDIO ERROR';
  bgmToggle.title = '오디오 파일을 확인해 주세요';
});
// Try once when the page opens. If the browser disallows this, start after
// the first tap/click on the site; sound may always be disabled manually.
window.addEventListener('load', startBgm, {once:true});
document.addEventListener('pointerdown', (event) => {
  if (!event.target.closest('#bgmToggle') && !bgmWasManuallyStopped && siteBgm.paused) startBgm();
}, {once:true});
refreshBgmButton();
