(() => {
  const page = document.querySelector('.faq-page');
  if (!page) return;
  const tools = page.querySelector('.faq-tools');
  const search = page.querySelector('#faq-search');
  const buttons = [...page.querySelectorAll('.faq-filters button')];
  const questions = [...page.querySelectorAll('.faq-question')];
  const count = page.querySelector('.faq-count');
  let topic = 'All';
  function filter() {
    const terms = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    questions.forEach(question => {
      const matches = (topic === 'All' || question.dataset.topic === topic)
        && terms.every(term => question.textContent.toLocaleLowerCase().includes(term));
      question.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'answer' : 'answers'}${topic === 'All' ? '' : ` · ${topic}`}`;
    page.querySelector('.faq-empty').hidden = visible !== 0;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
  }
  buttons.forEach(button => button.addEventListener('click', () => { topic = button.dataset.topic; filter(); }));
  search.addEventListener('input', filter);
  page.querySelector('.faq-clear').addEventListener('click', () => { search.value = ''; topic = 'All'; filter(); search.focus(); });
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const question = questions.find(item => item.id === id);
    if (!question) return;
    search.value = ''; topic = 'All'; filter(); question.open = true;
    requestAnimationFrame(() => question.scrollIntoView({block: 'start'}));
  }
  window.addEventListener('hashchange', revealHash);
  tools.hidden = false;
  filter();
  revealHash();
})();
