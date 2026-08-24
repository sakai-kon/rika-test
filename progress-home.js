(() => {
  'use strict';
  const KEY = 'rikaTestProgressV1';
  const SUBJECT_NAMES = { japanese:'国語', math:'数学', science:'理科', social:'社会', english:'英語' };
  const SUBJECT_PAGES = { japanese:'japanese.html', math:'math.html', science:'science.html', social:'social.html', english:'english.html' };
  const subject = localStorage.getItem('fiveSubjectLastSubject') || '';

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p || !p.subject || !Array.isArray(p.quizIds) || !p.quizIds.length) return null;
      if (typeof p.index !== 'number' || p.index < 0 || p.index >= p.quizIds.length) return null;
      return p;
    } catch (_) { return null; }
  }

  function render() {
    const p = read();
    const area = document.getElementById('resumeArea');
    if (!area) return;
    if (!p || !SUBJECT_PAGES[p.subject]) {
      area.classList.add('hidden');
      return;
    }
    const name = SUBJECT_NAMES[p.subject] || p.subject;
    const unit = p.unit === 'all' ? '全単元' : p.unit;
    const progress = `${Math.min(p.index + 1, p.quizIds.length)} / ${p.quizIds.length}問目`;
    const saved = p.savedAt ? new Date(p.savedAt).toLocaleString('ja-JP', {month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}) : '';
    area.innerHTML = `<a class="resume-card" href="${SUBJECT_PAGES[p.subject]}?resume=1"><span class="resume-icon">▶️</span><div><b>続きから再開</b><small>${name} ・ ${unit}</small><em>${progress}${saved ? ` ・ 保存: ${saved}` : ''}</em></div><strong>→</strong></a>`;
    area.classList.remove('hidden');
  }

  render();
  window.addEventListener('storage', render);
})();
