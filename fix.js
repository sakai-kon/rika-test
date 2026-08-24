const originalRenderQuestion = renderQuestion;
renderQuestion = function () {
  originalRenderQuestion();
  const holder = document.querySelector('#questionNo')?.parentElement;
  if (holder) {
    holder.innerHTML = `<span id="categoryLabel">${MODE_INFO[state.mode].label}</span><span id="questionNo">${state.index + 1} / ${state.questions.length}</span>`;
  }
};
