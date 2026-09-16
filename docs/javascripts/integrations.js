(() => {
  const root = document.querySelector('.integration-directory');
  if (!root) return;
  const search = root.querySelector('#integration-search');
  const cards = [...root.querySelectorAll('.integration-card')];
  const sections = [...root.querySelectorAll('.directory-section')];
  const buttons = [...root.querySelectorAll('.directory-filters button')];
  let category = 'all';
  function filter() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let count = 0;
    sections.forEach(section => {
      let shown = 0;
      section.querySelectorAll('.integration-card').forEach(card => {
        const matches = (category === 'all' || category === section.dataset.category)
          && terms.every(term => card.textContent.toLowerCase().includes(term));
        card.hidden = !matches;
        if (matches) shown++;
      });
      section.hidden = shown === 0;
      count += shown;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    root.querySelector('.directory-count').textContent = `${count} ${count === 1 ? 'integration' : 'integrations'}`;
    root.querySelector('.directory-empty').hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.category; filter(); }));
  search.addEventListener('input', filter);
  root.querySelector('.directory-clear').addEventListener('click', () => { category = 'all'; search.value = ''; filter(); search.focus(); });
  function reveal() {
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target || !root.contains(target)) return;
    search.value = ''; category = 'all'; filter();
    const card = target.closest('.integration-card');
    if (card) card.querySelector('details').open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  root.querySelector('.directory-tools').hidden = false;
  window.addEventListener('hashchange', reveal);
  filter(); reveal();
})();
