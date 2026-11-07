'use strict';
const fieldSpecs = {
  profile:[['name','스토리 이름'],['shortIntro','한 줄 소개 (30자 이내)']],
  story:[['storyPrompt','스토리 설정 및 정보']],
  start:[['prologue','프롤로그 / 첫 인사말'],['startName','시작 설정 이름'],['startSituation','시작 상황'],['playGuide','플레이 가이드']]
};
const $=id=>document.getElementById(id);
let db={};
let selection={member:'ihyeon',stage:'profile'};
let writeDelay;
const status=(msg,bad=false)=>{$('status').textContent=msg;$('status').classList.toggle('error',bad)};
async function initialize(){
  const defaults=await fetch(chrome.runtime.getURL('stories.json')).then(r=>r.json());
  const saved=await chrome.storage.local.get(['stories','selection']);
  db={...defaults,...(saved.stories||{})};
  selection={...selection,...(saved.selection||{})};
  Object.keys(db).forEach(id=>{
    let o=document.createElement('option');o.value=id;o.textContent=db[id].name;$('member').appendChild(o);
  });
  if(!db[selection.member]) selection.member=Object.keys(db)[0];
  $('member').value=selection.member;$('stage').value=selection.stage;
  $('member').addEventListener('change',e=>{saveEdits();selection.member=e.target.value;persistSelection();renderFields();status('')});
  $('stage').addEventListener('change',e=>{saveEdits();selection.stage=e.target.value;persistSelection();renderFields();status('')});
  $('fields').addEventListener('input',()=>{clearTimeout(writeDelay);writeDelay=setTimeout(saveEdits,250)});
  $('openCrack').addEventListener('click',()=>chrome.tabs.create({url:'https://crack.wrtn.ai/'}));
  $('fill').addEventListener('click',fillCurrentPage);
  renderFields();
}
function renderFields(){
  const root=$('fields'); root.textContent='';
  for(const [key,labelText] of fieldSpecs[selection.stage]){
    const wrap=document.createElement('div');wrap.className='control';
    const header=document.createElement('div');header.className='field-heading';
    const label=document.createElement('label');label.textContent=labelText;label.htmlFor='field-'+key;
    const count=document.createElement('span');count.className='count';
    header.append(label,count);
    const el=document.createElement((key==='name'||key==='shortIntro'||key==='startName')?'input':'textarea');
    el.id='field-'+key;el.dataset.key=key;el.value=db[selection.member][key]||'';
    el.addEventListener('input',()=>count.textContent=el.value.length+'자');
    if(key==='shortIntro')el.maxLength=30;
    count.textContent=el.value.length+'자';wrap.append(header,el);root.append(wrap);
  }
}
function saveEdits(){
  const entry=db[selection.member];
  for(const el of document.querySelectorAll('[data-key]'))entry[el.dataset.key]=el.value;
  chrome.storage.local.set({stories:db});
}
function persistSelection(){chrome.storage.local.set({selection});}
async function fillCurrentPage(){
  saveEdits();
  const tabs=await chrome.tabs.query({active:true,currentWindow:true});
  const tab=tabs[0];
  if(!tab || !/^https:\/\/(?:[\w-]+\.)*crack\.wrtn\.ai\//.test(tab.url||'')){
    status('크랙 스토리 제작 페이지를 연 뒤 다시 눌러줘.',true);return;
  }
  try{
    const fields=Object.fromEntries(fieldSpecs[selection.stage].map(([key])=>[key,db[selection.member][key]||'']));
    const result=await chrome.scripting.executeScript({target:{tabId:tab.id,allFrames:true},func:fillFieldsOnCrack,args:[selection.stage,fields]});
    const names=[...new Set(result.flatMap(r=>r.result?.filled||[]))];
    const missing=fieldSpecs[selection.stage].filter(([key])=>!names.includes(key)).map(([k,label])=>label);
    if(names.length===0){status('맞는 입력칸을 찾지 못했어. 스토리 제작 화면인지 확인해 줘. 크랙 화면 구조가 다르면 조정이 필요해.',true);return;}
    status(`${names.length}개 항목 입력 완료. 화면에서 내용 확인해 줘.${missing.length?'\n미입력: '+missing.join(', '):''}`);
  }catch(e){status('입력에 실패했어: '+(e.message||String(e)),true);}
}
function fillFieldsOnCrack(stage,fields){
  const patterns={
    profile:{
      name:[/^(?:스토리|캐릭터|작품)\s*(?:이름|제목)$/i,/^이름$/, /(?:스토리|캐릭터)의?\s*이름/],
      shortIntro:[/한\s*줄\s*소개/,/짧은\s*소개/,/한줄소개/]
    },
    story:{storyPrompt:[/스토리\s*설정\s*(?:및|\/|\+)\s*정보/,/스토리\s*설정\s*및\s*정보/,/캐릭터\s*설정\s*및\s*정보/,/상세\s*설정/,/스토리\s*설정/ ]},
    start:{
      prologue:[/프롤로그/,/첫\s*인사말/,/시작\s*대사/],
      startName:[/시작\s*설정\s*이름/,/설정\s*이름/,/시작\s*이름/],
      startSituation:[/시작\s*상황/,/시작\s*배경/,/상황\s*설정/],
      playGuide:[/플레이\s*가이드/,/유저\s*가이드/]
    }
  };
  const fieldKey=Object.keys(patterns[stage]||{});
  const candidates=[...document.querySelectorAll('input,textarea,[contenteditable="true"],[role="textbox"]')].filter(el=>{
    if(el instanceof HTMLInputElement && !['text','search',''].includes(el.type))return false;
    if(el.getAttribute('aria-hidden')==='true'||el.disabled||el.readOnly)return false;
    const box=el.getBoundingClientRect();
    const style=getComputedStyle(el);
    return box.width>8&&box.height>8&&style.display!=='none'&&style.visibility!=='hidden';
  });
  function compact(t){return (t||'').replace(/\s+/g,' ').trim().slice(0,180);}
  function getDescriptions(el){
    const direct=[];const nearby=[];
    for(let k of ['aria-label','placeholder','name','id','data-placeholder']){const v=el.getAttribute(k);if(v)direct.push(compact(v));}
    if(el.labels)for(let label of el.labels)direct.push(compact(label.textContent));
    const aria=el.getAttribute('aria-labelledby');if(aria)for(let id of aria.split(/\s+/)){const x=document.getElementById(id);if(x)direct.push(compact(x.textContent));}
    const parentLabel=el.closest('label');if(parentLabel)direct.push(compact(parentLabel.textContent));
    if(el.previousElementSibling)nearby.push(compact(el.previousElementSibling.textContent));
    for(let ancestor=el.parentElement,level=0;ancestor&&level<3;level++,ancestor=ancestor.parentElement){
      let siblings=[...ancestor.children].filter(c=>c!==el&& !c.contains(el));
      for(const node of siblings.slice(0,5)){
        const txt=compact(node.textContent);
        if(txt.length>0&&txt.length<65)nearby.push(txt);
      }
    }
    return {direct,nearby};
  }
  const available=candidates.map(el=>({el,...getDescriptions(el)}));
  const used=new Set(),filled=[];
  function score(item,regexes){
    let max=0;
    for(const rx of regexes){
      for(const v of item.direct)if(rx.test(v))max=Math.max(max,120-(v.length>50?20:0));
      for(const v of item.nearby)if(rx.test(v))max=Math.max(max,65-(v.length>50?20:0));
    }
    return max;
  }
  function update(el,value){
    el.focus();
    if(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement){
      const proto=el instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto,'value').set.call(el,value);
      el.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:value}));
      el.dispatchEvent(new Event('change',{bubbles:true}));
    }else if(el.isContentEditable){
      try{
        const range=document.createRange();range.selectNodeContents(el);
        const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
        if(!document.execCommand('insertText',false,value))throw new Error('execCommand failed');
      }catch(e){el.textContent=value;el.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:value}));}
      el.dispatchEvent(new Event('change',{bubbles:true}));
    }else return false;
    el.style.boxShadow='0 0 0 2px #bce752';
    return true;
  }
  for(const key of fieldKey){
    const value=fields[key];if(!value)continue;
    const matches=available.filter(v=>!used.has(v.el)).map(v=>({v,score:score(v,patterns[stage][key])})).sort((a,b)=>b.score-a.score);
    let best=matches[0];
    // 프로필 화면에서 레이블이 없는 입력칸 두 개만 있을 경우 위치 기반 보조 선택.
    if((!best||best.score<55)&&stage==='profile'){
      const unused=available.filter(v=>!used.has(v.el)&&v.el.tagName!=='DIV');
      if(candidates.length<=3 && unused.length>=1)best={v:unused[0],score:30};
    }
    if(!best||best.score<25)continue;
    if(update(best.v.el,value)){used.add(best.v.el);filled.push(key);}
  }
  return {filled,candidateCount:candidates.length};
}
initialize().catch(e=>status('초기화 오류: '+(e.message||String(e)),true));
