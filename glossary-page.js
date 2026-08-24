(() => {
  'use strict';
  const data = window.QUIZ_DATA;
  const glossary = window.GLOSSARY || [];
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let subject = params.get('subject') || 'all';
  let unit = params.get('unit') || 'all';
  const termParam = params.get('term') || '';

  const names = Object.fromEntries(Object.entries(data).map(([k,v]) => [k,v.name]));
  const unitName = (s,u) => u === 'all' ? '全単元' : data[s]?.units.find(x => x.id === u)?.name || '単元';
  const esc = s => String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));

  function renderSubjects() {
    $('glossarySubjectScreen').classList.add('active');
    $('glossaryUnitScreen').classList.remove('active');
    $('glossaryTermsScreen').classList.remove('active');
    const grid = $('glossarySubjectGrid');
    grid.innerHTML='';
    Object.entries(data).forEach(([key,s])=>{
      const count=glossary.filter(t=>t[0]===key).length;
      const b=document.createElement('button'); b.className='subject-card';
      b.innerHTML=`<span class="subject-icon">${s.icon}</span><div><b>${s.name}</b><small>${s.description}</small><em>${count}語・${s.units.length}単元</em></div>`;
      b.onclick=()=>openUnits(key); grid.appendChild(b);
    });
  }
  function openUnits(key) {
    subject=key; unit='all';
    const s=data[key]; $('glossaryUnitIcon').textContent=s.icon; $('glossaryUnitName').textContent=s.name; $('glossaryUnitDescription').textContent='単元を選んで用語一覧を開きます。';
    const grid=$('glossaryUnitGrid'); grid.innerHTML='';
    const all=document.createElement('button'); all.className='unit-card all-unit'; all.innerHTML=`<span>📚</span><b>全単元</b><small>${glossary.filter(t=>t[0]===key).length}語</small>`; all.onclick=()=>openTerms(key,'all'); grid.appendChild(all);
    s.units.forEach(u=>{const count=glossary.filter(t=>t[0]===key&&t[1]===u.id).length; const b=document.createElement('button'); b.className='unit-card'; b.innerHTML=`<span>${u.icon}</span><b>${u.name}</b><small>${count}語</small>`; b.onclick=()=>openTerms(key,u.id); grid.appendChild(b);});
    $('glossarySubjectScreen').classList.remove('active'); $('glossaryTermsScreen').classList.remove('active'); $('glossaryUnitScreen').classList.add('active');
  }
  function openTerms(key,u) {
    subject=key; unit=u; $('glossaryTermsTitle').textContent=`${data[key].icon} ${data[key].name}・${unitName(key,u)}`;
    $('glossarySubjectScreen').classList.remove('active'); $('glossaryUnitScreen').classList.remove('active'); $('glossaryTermsScreen').classList.add('active'); renderTerms();
  }
  function renderTerms() {
    const q=$('termSearch').value.trim().toLowerCase();
    const list=glossary.filter(t=>(subject==='all'||t[0]===subject)&&(unit==='all'||t[1]===unit)&&(!q||t.join(' ').toLowerCase().includes(q)));
    $('termCount').textContent=`${list.length}語`;
    $('termList').innerHTML=list.length?list.map(t=>`<article class="glossary-item"><div class="glossary-item-head"><div><h3>${esc(t[2])}</h3><span class="reading">${esc(t[3])}</span></div><span class="glossary-badge">${esc(names[t[0]])}・${esc(unitName(t[0],t[1]))}</span></div><p class="glossary-summary">${esc(t[4])}</p><p class="glossary-detail">${esc(t[5])}</p></article>`).join(''):'<div class="empty-state">条件に合う用語がありません。</div>';
  }
  $('homeButton').onclick=()=>location.href='index.html';
  $('backToSubjects').onclick=()=>renderSubjects();
  $('backToUnits').onclick=()=>openUnits(subject);
  $('termSearch').oninput=renderTerms;
  renderSubjects();
  if(subject!=='all' && data[subject]) openUnits(subject);
  if(subject!=='all' && unit!=='all') openTerms(subject,unit);
  if(termParam) { setTimeout(()=>{ $('termSearch').value=termParam; renderTerms(); },0); }
})();
