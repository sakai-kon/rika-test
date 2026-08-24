(() => {
  'use strict';

  const SUBJECTS = window.QUIZ_DATA;
  const QUESTIONS = window.QUESTIONS;
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
    feedback.innerHTML = `<b>${isCorrect ? '正解！' : '不正解。'}</b> ${question.e}`;
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
      ? `<h3>間違えた問題 (${mistakes.length}問)</h3>` + mistakes.map((question) => `<div class="review-item"><div class="q">${question.q}</div><div class="a">正解：${question.answerText}<br>${question.e}</div></div>`).join('')
      : '<h3>すばらしい！</h3><p>間違えた問題はありません。</p>';

    let best = 0;
    try {
      best = Math.max(Number(localStorage.getItem('fiveSubjectBest') || 0), score);
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
    // Always begin at the home screen after a fresh load/refresh.
    showScreen('homeScreen');
    renderHome();
    renderBestScore();
    bindEvents();
  }

  if (!SUBJECTS || !QUESTIONS || !Array.isArray(QUESTIONS)) {
    console.error('Quiz data failed to load.');
  } else {
    init();
  }
})();
