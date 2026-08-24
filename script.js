(() => {
  'use strict';

  const SUBJECTS = window.QUIZ_DATA;
  const QUESTIONS = window.QUESTIONS;
  const GLOSSARY = window.GLOSSARY || [];
  const subjectNames = { ...Object.fromEntries(Object.entries(SUBJECTS).map(([key, value]) => [key, value.name])), all: '五教科総合' };
  let subjectKey = 'all';
  let unitKey = 'all';
  let quiz = [];
  let questionIndex = 0;
  let correct = 0;
  let mistakes = [];

  const $ = (id) => document.getElementById(id);
  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
    const target = $(id);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getUnitName(subject, unit) {
    if (unit === 'all') return '全単元';
    return SUBJECTS[subject]?.units.find((item) => item.id === unit)?.name || '単元';
  }

  function getPool(subject, unit) {
    return QUESTIONS.filter((question) =>
      (subject === 'all' || question.subject === subject) &&
      (unit === 'all' || question.unit === unit)
    );
  }

  function renderHome() {
    const grid = $('subjectGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const allButton = document.createElement('button');
    allButton.className = 'subject-card overall';
    allButton.innerHTML = `<span class="subject-icon">🎯</span><div><b>五教科総合</b><small>国語・数学・理科・社会・英語</small><em>${QUESTIONS.length}問</em></div>`;
    allButton.onclick = () => startQuiz('all', 'all');
    grid.appendChild(allButton);

    Object.entries(SUBJECTS).forEach(([key, subject]) => {
      const button = document.createElement('button');
      button.className = 'subject-card';
      button.innerHTML = `<span class="subject-icon">${subject.icon}</span><div><b>${subject.name}</b><small>${subject.description}</small><em>${subject.units.length}単元 ・ ${QUESTIONS.filter((q) => q.subject === key).length}問</em></div>`;
      button.onclick = () => openSubject(key);
      grid.appendChild(button);
    });
  }

  function openSubject(key) {
    if (!SUBJECTS[key]) return;
    subjectKey = key;
    unitKey = 'all';
    const subject = SUBJECTS[key];
    $('subjectIcon').textContent = subject.icon;
    $('subjectName').textContent = subject.name;
    $('subjectDescription').textContent = subject.description;

    const grid = $('unitGrid');
    grid.innerHTML = '';

    const allButton = document.createElement('button');
    allButton.className = 'unit-card all-unit';
    allButton.innerHTML = `<span>📚</span><b>全単元</b><small>${getPool(key, 'all').length}問から出題</small>`;
    allButton.onclick = () => startQuiz(key, 'all');
    grid.appendChild(allButton);

    subject.units.forEach((unit) => {
      const button = document.createElement('button');
      button.className = 'unit-card';
      button.innerHTML = `<span>${unit.icon}</span><b>${unit.name}</b><small>${getPool(key, unit.id).length}問</small>`;
      button.onclick = () => startQuiz(key, unit.id);
      grid.appendChild(button);
    });

    showScreen('unitScreen');
  }

  function renderGlossaryControls() {
    const subjectSelect = $('glossarySubject');
    const unitSelect = $('glossaryUnit');
    subjectSelect.innerHTML = '<option value="all">五教科すべて</option>';
    Object.entries(SUBJECTS).forEach(([key, subject]) => {
      subjectSelect.insertAdjacentHTML('beforeend', `<option value="${key}">${subject.icon} ${subject.name}</option>`);
    });
    subjectSelect.value = 'all';
    updateGlossaryUnits();
  }

  function updateGlossaryUnits() {
    const subject = $('glossarySubject').value;
    const unitSelect = $('glossaryUnit');
    unitSelect.innerHTML = '<option value="all">すべての単元</option>';
    if (subject === 'all') return;
    SUBJECTS[subject].units.forEach((unit) => {
      unitSelect.insertAdjacentHTML('beforeend', `<option value="${unit.id}">${unit.icon} ${unit.name}</option>`);
    });
  }

  function renderGlossary() {
    const subject = $('glossarySubject').value;
    const unit = $('glossaryUnit').value;
    const search = $('glossarySearch').value.trim().toLowerCase();

    const filtered = GLOSSARY.filter((item) => {
      const subjectMatch = subject === 'all' || item.subject === subject;
      const unitMatch = unit === 'all' || item.unit === unit;
      const text = `${item.term} ${item.reading} ${item.summary} ${item.detail}`.toLowerCase();
      return subjectMatch && unitMatch && (!search || text.includes(search));
    });

    $('glossaryCount').textContent = `${filtered.length}語を表示`;
    const list = $('glossaryList');
    if (!filtered.length) {
      list.innerHTML = '<div class="empty-state">条件に合う用語がありません。</div>';
      return;
    }

    list.innerHTML = filtered.map((item) => `
      <article class="glossary-item">
        <div class="glossary-item-head">
          <div><h3>${escapeHtml(item.term)}</h3><span class="reading">${escapeHtml(item.reading)}</span></div>
          <span class="glossary-badge">${escapeHtml(subjectNames[item.subject])}・${escapeHtml(getUnitName(item.subject, item.unit))}</span>
        </div>
        <p class="glossary-summary">${escapeHtml(item.summary)}</p>
        <p class="glossary-detail">${escapeHtml(item.detail)}</p>
      </article>`).join('');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  function getRelevantTerms(question) {
    const pool = GLOSSARY.filter((item) => item.subject === question.subject && item.unit === question.unit);
    const text = `${question.q} ${question.e}`.toLowerCase();
    const matched = pool.filter((item) => text.includes(item.term.toLowerCase()) || text.includes(item.reading.toLowerCase()));
    return [...matched, ...pool.filter((item) => !matched.includes(item))].slice(0, 4);
  }

  function renderProblemLearningTools(question) {
    const terms = getRelevantTerms(question);
    $('termPanel').innerHTML = terms.length
      ? `<div class="term-panel-title">この単元の重要用語</div>${terms.map((term) => `<button class="inline-term" data-term="${escapeHtml(term.term)}"><b>${escapeHtml(term.term)}</b><span>${escapeHtml(term.summary)}</span></button>`).join('')}`
      : '<div class="term-panel-title">この単元の用語解説は用語ページで確認できます。</div>';
    $('hintPanel').innerHTML = `<b>学習ポイント</b><p>${escapeHtml(question.e)}</p><a href="#" id="openAllGlossaryFromHint">📘 用語ページで詳しく見る</a>`;
    $('termPanel').classList.add('hidden');
    $('hintPanel').classList.add('hidden');

    $('termPanel').querySelectorAll('.inline-term').forEach((button) => {
      button.onclick = () => showTermDetail(button.dataset.term);
    });
    const link = $('openAllGlossaryFromHint');
    if (link) link.onclick = (event) => { event.preventDefault(); openGlossaryPage(question.subject, question.unit); };
  }

  function showTermDetail(termName) {
    const term = GLOSSARY.find((item) => item.term === termName);
    if (!term) return;
    const panel = $('termPanel');
    panel.innerHTML = `<div class="term-detail-view"><button id="closeTermDetail" class="mini-close">×</button><div class="glossary-badge">${escapeHtml(subjectNames[term.subject])}・${escapeHtml(getUnitName(term.subject, term.unit))}</div><h3>${escapeHtml(term.term)}</h3><span class="reading">${escapeHtml(term.reading)}</span><p><b>意味：</b>${escapeHtml(term.summary)}</p><p><b>詳しく：</b>${escapeHtml(term.detail)}</p></div>`;
    panel.classList.remove('hidden');
    $('closeTermDetail').onclick = () => renderProblemLearningTools(quiz[questionIndex]);
  }

  function openGlossaryPage(subject = 'all', unit = 'all') {
    renderGlossaryControls();
    $('glossarySubject').value = subject;
    updateGlossaryUnits();
    $('glossaryUnit').value = unit;
    $('glossarySearch').value = '';
    renderGlossary();
    showScreen('glossaryScreen');
  }

  function startQuiz(subject, unit) {
    const pool = getPool(subject, unit);
    if (!pool.length) {
      alert('この単元には現在問題がありません。');
      return;
    }
    subjectKey = subject;
    unitKey = unit;
    quiz = shuffle(pool).slice(0, Math.min(15, pool.length));
    questionIndex = 0;
    correct = 0;
    mistakes = [];
    showScreen('quizScreen');
    renderQuestion();
  }

  function renderQuestion() {
    const question = quiz[questionIndex];
    if (!question) return;

    $('categoryLabel').textContent = subjectKey === 'all' ? '五教科総合' : SUBJECTS[subjectKey].name;
    $('questionNo').textContent = ` ${questionIndex + 1} / ${quiz.length}`;
    $('scoreLive').textContent = `${correct}問正解`;
    $('progressBar').style.width = `${(questionIndex / quiz.length) * 100}%`;
    $('difficulty').textContent = question.difficulty;
    $('unitLabel').textContent = getUnitName(question.subject, question.unit);
    $('questionText').textContent = question.q;
    $('feedback').className = 'feedback hidden';
    $('nextButton').disabled = true;
    renderProblemLearningTools(question);

    const answerText = question.a[question.answer];
    const box = $('choices');
    box.innerHTML = '';
    shuffle(question.a).forEach((choice) => {
      const button = document.createElement('button');
      button.className = 'choice';
      button.textContent = choice;
      button.onclick = () => handleAnswer(choice, answerText, button, question);
      box.appendChild(button);
    });
  }

  function handleAnswer(selected, answerText, selectedButton, question) {
    const isCorrect = selected === answerText;
    document.querySelectorAll('.choice').forEach((button) => {
      button.disabled = true;
      if (button.textContent === answerText) button.classList.add('correct');
      if (!isCorrect && button === selectedButton) button.classList.add('wrong');
    });

    if (isCorrect) correct += 1;
    else mistakes.push({ ...question, answerText });

    $('scoreLive').textContent = `${correct}問正解`;
    const feedback = $('feedback');
    feedback.className = `feedback ${isCorrect ? 'good' : 'bad'}`;
    feedback.innerHTML = `<b>${isCorrect ? '正解！' : '不正解。'}</b> ${escapeHtml(question.e)} <button id="feedbackGlossary" class="inline-link-button">📘 用語を詳しく見る</button>`;
    $('feedbackGlossary').onclick = () => openGlossaryPage(question.subject, question.unit);
    $('nextButton').disabled = false;
  }

  function finishQuiz() {
    if (!quiz.length) return;
    showScreen('resultScreen');
    const score = Math.round((correct / quiz.length) * 100);
    const name = subjectKey === 'all' ? '五教科総合' : SUBJECTS[subjectKey].name;
    const unitName = subjectKey === 'all' ? '' : ` / ${getUnitName(subjectKey, unitKey)}`;

    $('resultScore').textContent = score;
    $('scoreRing').style.setProperty('--score', `${score}%`);
    $('correctCount').textContent = correct;
    $('totalCount').textContent = quiz.length;
    $('accuracy').textContent = `${score}%`;
    $('resultSummary').textContent = `${name}${unitName}で${correct} / ${quiz.length}問正解。`;
    $('resultTitle').textContent = score === 100 ? '全問正解！🎉' : score >= 90 ? '完璧に近い！🔥' : score >= 70 ? 'いい調子！📚' : 'ここから伸ばそう！💪';

    const review = $('mistakeReview');
    review.innerHTML = mistakes.length
      ? `<h3>間違えた問題 (${mistakes.length}問)</h3>` + mistakes.map((question) => `<div class="review-item"><div class="q">${escapeHtml(question.q)}</div><div class="a">正解：${escapeHtml(question.answerText)}<br>${escapeHtml(question.e)}<br><button class="inline-link-button review-term" data-subject="${question.subject}" data-unit="${question.unit}">📘 この単元の用語を復習</button></div></div>`).join('')
      : '<h3>すばらしい！</h3><p>間違えた問題はありません。</p>';
    review.querySelectorAll('.review-term').forEach((button) => {
      button.onclick = () => openGlossaryPage(button.dataset.subject, button.dataset.unit);
    });

    try {
      const best = Math.max(Number(localStorage.getItem('fiveSubjectBest') || 0), score);
      localStorage.setItem('fiveSubjectBest', String(best));
    } catch (_) {}
    renderBestScore();
  }

  function renderBestScore() {
    let best = null;
    try { best = localStorage.getItem('fiveSubjectBest'); } catch (_) {}
    $('bestScore').textContent = `最高得点：${best ? `${best}点` : '—'}`;
  }

  function bindEvents() {
    $('startAll').onclick = () => startQuiz('all', 'all');
    $('backHome').onclick = () => showScreen('homeScreen');
    $('openGlossary').onclick = () => openGlossaryPage();
    $('glossaryHome').onclick = () => showScreen('homeScreen');
    $('glossarySubject').onchange = () => { updateGlossaryUnits(); renderGlossary(); };
    $('glossaryUnit').onchange = renderGlossary;
    $('glossarySearch').oninput = renderGlossary;
    $('showTermsButton').onclick = () => {
      $('termPanel').classList.toggle('hidden');
      $('hintPanel').classList.add('hidden');
    };
    $('showHintButton').onclick = () => {
      $('hintPanel').classList.toggle('hidden');
      $('termPanel').classList.add('hidden');
    };
    $('nextButton').onclick = () => {
      if (questionIndex + 1 < quiz.length) {
        questionIndex += 1;
        renderQuestion();
      } else {
        finishQuiz();
      }
    };
    $('quitButton').onclick = () => showScreen(subjectKey === 'all' ? 'homeScreen' : 'unitScreen');
    $('retryButton').onclick = () => startQuiz(subjectKey, unitKey);
    $('resultHomeButton').onclick = () => showScreen('homeScreen');
  }

  function init() {
    showScreen('homeScreen');
    renderHome();
    renderBestScore();
    renderGlossaryControls();
    renderGlossary();
    bindEvents();
  }

  init();
})();
