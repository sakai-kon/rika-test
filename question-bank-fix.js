// Small cleanup pass for generated questions.
(()=>{
  const Q=window.QUESTIONS;
  Q.filter(q=>q.id.startsWith('GEN-E-BN-')).forEach(q=>{
    q.a=[q.a[0],'am not','is not','are not'];
  });
  Q.filter(q=>q.id.startsWith('GEN-E-V-')&&q.q.includes('go English')).forEach(q=>{
    q.q=q.q.replace('go English every day.','go to school every day.');
  });
  // Remove exact duplicate choices from any generated item while keeping four choices.
  Q.filter(q=>q.id.startsWith('GEN-')).forEach(q=>{
    const unique=[...new Set(q.a)];
    if(unique.length<4){
      const fillers=['—','なし','別の答え','どれでもない'];
      for(const f of fillers){if(unique.length>=4)break;if(!unique.includes(f))unique.push(f);}
      q.a=unique.slice(0,4);
    }
  });
  window.QUESTIONS=Q;
})();
