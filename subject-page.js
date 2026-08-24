(() => {
  'use strict';
  const subject = document.body.dataset.subject;
  const data = window.QUIZ_DATA[subject];
  const questions = window.QUESTIONS.filter(q => q.subject === subject);
  let unit = 'all';
  let quiz = [];
  let index = 0;
  let correct = 0;
  let mistakes = [];

  const $ = id => document.getElementById(id);
  const shuffle = a => [...a].sort(() => Math.random() - 0.5);
  const unitName = id => id === 'all' ? '全単元' : data.units.find(u => u.id === id)?.name || '単元';
  const escapeHtml = s => String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));

  function show(id) {
    document.querySelectorAll('.page-screen').forEach(x => x.classList.remove('active'));
    $(id)?.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function renderUnits() {
    $('pageSubjectIcon').textContent = data.icon;
    $('pageSubjectName').textContent = data.name;
    $('pageSubjectDescription').textContent = data.description;
    const grid = $('subjectUnitGrid');
    grid.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'unit-card all-unit';
    all.innerHTML = `<span>📚</span><b>全単元</b><small>${questions.length}問からランダム出題</small>`;
    all.onclick = () => startQuiz('all');
    grid.appendChild(all);
    data.units.forEach(u => {
      const count = questions.filter(q => q.unit === u.id).length;
      const b = document.createElement('button');
      b.className = 'unit-card';
      b.innerHTML = `<span>${u.icon}</span><b>${u.name}</b><small>${count}問</small>`;
      b.onclick = () => startQuiz(u.id);
      grid.appendChild(b);
    });
  }

  function startQuiz(selectedUnit) {
    unit = selectedUnit;
    const pool = selectedUnit === 'all' ? questions : questions.filter(q => q.unit === selectedUnit);
    if (!pool.length) return;
    quiz = shuffle(pool).slice(0, Math.min(15, pool.length));
    index = 0; correct = 0; mistakes = [];
    show('quizScreen');
    renderQuestion();
  }

  function renderQuestion() {
    const q = quiz[index];
    $('quizUnit').textContent = unitName(q.unit);
    $('quizNo').textContent = `${index + 1} / ${quiz.length}`;
    $('quizScore').textContent = `${correct}問正解`;
    $('quizProgress').style.width = `${index / quiz.length * 100}%`;
    $('quizDifficulty').textContent = q.difficulty;
    $('quizText').textContent = q.q;
    $('termPanel').innerHTML = getTerms(q).length ? `<b>📘 この単元の重要用語</b>${getTerms(q).map(t => `<button class="inline-term" data-term="${escapeHtml(t[2])}"><b>${escapeHtml(t[2])}</b><span>${escapeHtml(t[4])}</span></button>`).join('')}` : '<b>📘 用語解説</b><p>この単元の用語は用語解説ページで確認できます。</p>';
    $('termPanel').classList.add('hidden');
    $('hintPanel').classList.add('hidden');
    $('feedback').classList.add('hidden');
    $('nextButton').disabled = true;
    $('choices').innerHTML = '';
    const answer = q.a[q.answer];
    shuffle(q.a).forEach(choice => {
      const b = document.createElement('button');
      b.className = 'choice'; b.textContent = choice;
      b.onclick = () => answerQuestion(choice, answer, b, q);
      $('choices').appendChild(b);
    });
    document.querySelectorAll('.inline-term').forEach(b => b.onclick = () => location.href = `glossary.html?subject=${encodeURIComponent(subject)}&unit=${encodeURIComponent(q.unit)}&term=${encodeURIComponent(b.dataset.term)}`);
  }

  function getTerms(q) {
    return (window.GLOSSARY || []).filter(t => t[0] === q.subject && t[1] === q.unit).slice(0, 5);
  }

  function answerQuestion(selected, answer, button, q) {
    const ok = selected === answer;
    document.querySelectorAll('#choices .choice').forEach(b => {
      b.disabled = true;
      if (b.textContent === answer) b.classList.add('correct');
      if (!ok && b === button) b.classList.add('wrong');
    });
    if (ok) correct++; else mistakes.push({...q, answerText: answer});
    $('quizScore').textContent = `${correct}問正解`;
    $('feedback').className = `feedback ${ok ? 'good' : 'bad'}`;
    $('feedback').innerHTML = `<b>${ok ? '正解！' : '不正解。'}</b> ${escapeHtml(q.e)} <button id="feedbackGlossary" class="inline-link-button">📘 この単元の用語を見る</button>`;
    $('feedbackGlossary').onclick = () => location.href = `glossary.html?subject=${subject}&unit=${q.unit}`;
    $('nextButton').disabled = false;
  }

  function finish() {
    const score = Math.round(correct / quiz.length * 100);
    $('resultScore').textContent = score;
    $('resultSummary').textContent = `${data.name}・${unitName(unit)}で ${correct} / ${quiz.length}問正解`;
    $('mistakeReview').innerHTML = mistakes.length ? `<h3>間違えた問題 ${mistakes.length}問</h3>${mistakes.map(q => `<div class="review-item"><div class="q">${escapeHtml(q.q)}</div><div class="a">正解：${escapeHtml(q.answerText)}<br>${escapeHtml(q.e)}</div></div>`).join('')}` : '<h3>全問正解！🎉</h3><p>この単元はかなり仕上がっています。</p>';
    show('resultScreen');
  }

  $('backHome').onclick = () => location.href = 'index.html';
  $('homeFromQuiz').onclick = () => location.href = 'index.html';
  $('nextButton').onclick = () => index + 1 < quiz.length ? (index++, renderQuestion()) : finish();
  $('quitQuiz').onclick = () => show('unitScreen');
  $('retryQuiz').onclick = () => startQuiz(unit);
  $('resultHome').onclick = () => location.href = 'index.html';
  $('showTerms').onclick = () => { $('termPanel').classList.toggle('hidden'); $('hintPanel').classList.add('hidden'); };
  $('showHint').onclick = () => { $('hintPanel').classList.toggle('hidden'); $('termPanel').classList.add('hidden'); };
  $('openGlossary').onclick = () => location.href = `glossary.html?subject=${subject}`;
  $('hintPanel').innerHTML = '<b>💡 学習ポイント</b><p>問題文を読み、単元の基本用語と結びつけて考えよう。詳しい用語は「用語・解説」から確認できます。</p>';

  renderUnits();
  show('unitScreen');
})();
