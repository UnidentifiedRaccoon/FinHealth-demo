import{n as e,s as t,t as n}from"./jsx-runtime-Bzw2jH9X.js";import{A as r,C as i,D as a,E as o,F as s,I as c,L as l,M as u,N as d,O as f,P as p,R as m,S as h,T as g,_,b as v,g as y,h as b,i as x,j as S,k as C,m as w,n as T,p as E,r as D,w as ee,x as O,y as k}from"./month-state-DtknJh_A.js";import{l as A,s as te}from"./club-calendar-Cq9jRduU.js";var j=t(e(),1),M={home:`#/home`,program:`#/program`,library:`#/library`,financialPlanner:`#/financial-planner`,month:`#/month`,material:`#/material`,scheduled:`#/material/upcoming`,practice:`#/practice`,reflection:`#/reflection`,planner:`#/planner`,courses:`#/courses`,blog:`#/blog`,blogArticle:`#/blog/articles`,support:`#/support`};function ne(e){return e.formats??(e.format?[e.format]:[])}function re(e=`all`){return M.blog+(e===`all`?``:`?category=${encodeURIComponent(e)}`)}function ie(e,t=`all`){if(!/^[a-z0-9-]+$/.test(e))throw Error(`Invalid article slug`);return`${M.blogArticle}/${e}`+(t===`all`?``:`?category=${encodeURIComponent(t)}`)}var ae=/^\d{4}-(?:0[1-9]|1[0-2])$/;function oe(e){if(!Number.isInteger(e)||e<2e3||e>2099)throw Error(`Invalid program year`);return`${M.program}?year=${e}`}var se={month:``,material:`/material`,scheduled:`/material/upcoming`,practice:`/practice`,reflection:`/reflection`,planner:`/planner`};function N(e){if(!ae.test(e))throw Error(`Invalid month ID`);return Object.fromEntries(Object.entries(se).map(([t,n])=>[t,`#/months/${e}${n}`]))}function ce(e){let t=new URLSearchParams;e.query&&t.set(`q`,e.query),e.month&&t.set(`month`,e.month),e.format&&t.set(`format`,e.format),e.formats?.length&&t.set(`formats`,[...new Set(e.formats)].join(`,`));for(let n of new Set(e.topics??[]))t.append(`topic`,n);return e.rubric&&t.set(`rubric`,e.rubric),e.author&&t.set(`author`,e.author),e.favorites&&t.set(`favorites`,`1`),t}function le(e){let t=ce(e).toString();return M.library+(t?`?${t}`:``)}function ue(e,t){if(!/^[a-zA-Z0-9_-]+$/.test(t)||t===`upcoming`)throw Error(`Invalid material ID`);return`${N(e).material}/${t}`}function de(e,t,n){let r=ce(t);return r.set(`origin`,`library`),`${n?ue(e,n):N(e).material}?${r}`}function fe(e,t=`home`){if(e.length>2048)return null;let[n,r=``,i]=(e||M[t]).split(`?`);if(i!==void 0)return null;let a=Object.keys(M).find(e=>M[e]===n),o=null,s=null,c=/^#\/blog\/articles\/([a-z0-9-]+)$/.exec(n);if(c&&(a=`blogArticle`),!a){let e=/^#\/months\/(\d{4}-(?:0[1-9]|1[0-2]))(.*)$/.exec(n);if(!e)return null;if(o=e[1],a=Object.keys(se).find(t=>se[t]===e[2]),!a){let t=/^\/material\/([a-zA-Z0-9_-]+)$/.exec(e[2]);t&&(a=`material`,s=t[1])}}if(!a)return null;let l=new URLSearchParams(r);if(a===`blog`||a===`blogArticle`){let e=l.get(`category`)??`all`;return l.size>1||[...l.keys()].some(e=>e!==`category`)||![`all`,`personal`,`economy`].includes(e)?null:{route:a,monthId:o,materialId:s,library:{query:``,month:``},origin:`month`,articleSlug:c?.[1],blogCategory:e}}if(a===`program`&&l.size)return l.size!==1||!/^20\d{2}$/.test(l.get(`year`)??``)?null:{route:a,monthId:o,materialId:s,library:{query:``,month:``},origin:`month`,programYear:Number(l.get(`year`))};if(a===`planner`&&l.has(`section`))return l.size!==1||l.get(`section`)!==`tasks`?null:{route:a,monthId:o,materialId:s,library:{query:``,month:``},origin:`month`,plannerSection:`tasks`};for(let e of l.keys())if(![`q`,`month`,`origin`,`format`,`formats`,`topic`,`rubric`,`author`,`favorites`].includes(e)||e!==`topic`&&l.getAll(e).length!==1)return null;let u=l.get(`origin`);if(u!==null&&(u!==`library`||a!==`material`)||l.size&&a!==`library`&&(a!==`material`||u!==`library`))return null;let d=l.get(`month`)??``;if(d&&!ae.test(d))return null;let f={query:l.get(`q`)??``,month:d};if(l.has(`format`)&&(f.format=l.get(`format`)),l.has(`rubric`)&&(f.rubric=l.get(`rubric`)),l.has(`formats`)){let e=l.get(`formats`).split(`,`);if(l.has(`format`)||e.length>4||new Set(e).size!==e.length||e.some(e=>![`article`,`video`,`quiz`,`collection`].includes(e)))return null;f.formats=e}if(l.has(`topic`)){let e=l.getAll(`topic`);if(e.length>12||e.some(e=>!e.trim()||e.length>80)||new Set(e).size!==e.length)return null;f.topics=e}if(l.has(`author`)&&(f.author=l.get(`author`)),l.has(`favorites`)){if(l.get(`favorites`)!==`1`)return null;f.favorites=!0}return{route:a,monthId:o,materialId:s,library:f,origin:u===`library`?`library`:`month`}}var pe=(e,t)=>`${e}/${t}`,me=e=>e.author?.split(/\s*,\s*/).filter(Boolean)??[],he=(e,t)=>e.topics??[t.theme??e.rubric].filter(Boolean),P=e=>e.toLocaleLowerCase(`ru`).replaceAll(`ё`,`е`);function ge(e,t,n){let r=P(n.trim());if(!r||[e.title,e.author??``].some(e=>P(e).includes(r)))return``;let i=e.paragraphs.find(e=>P(e).includes(r));if(i){let e=i.replace(/\s+/g,` `),t=Math.max(0,P(e).indexOf(r)-60),n=Math.min(e.length,t+Math.max(180,r.length+80));return`${t?`…`:``}${e.slice(t,n)}${n<e.length?`…`:``}`}return[...he(e,t),e.rubric,t.name,t.theme??``].find(e=>P(e).includes(r))??``}var F=n();function _e({paragraphs:e}){if(!e.length)return null;let t=e[0].split(`
`).filter(Boolean);return(0,F.jsx)(`div`,{className:`exercise-intro`,children:(0,F.jsxs)(`div`,{className:`exercise-intro-inner`,children:[t.length>1?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{className:`exercise-intro-meta`,children:t.slice(0,-1).join(` `)}),(0,F.jsx)(`h2`,{children:t.at(-1)})]}):(0,F.jsx)(`p`,{className:`exercise-intro-title`,children:e[0]}),e.slice(1).map((e,t)=>(0,F.jsx)(`p`,{className:t===0?`exercise-description`:`exercise-context`,children:e},t))]})})}var I={article:`Статья`,video:`Запись встречи`,quiz:`Тренажёр`,collection:`Подборка`},ve=`finhealth.exercise.v1`;function ye(e,t){return c(e)&&e.protocol===`finhealth.exercise.v1`&&e.channel===t&&(e.method===`resize`?typeof e.height==`number`&&Number.isFinite(e.height)&&e.height>=0&&e.height<=1e4:[`init`,`save`].includes(e.method)&&Number.isSafeInteger(e.requestId)&&e.requestId>0)}function be(e,t,n,r){if(!/^[a-z0-9-]+$/i.test(e))throw Error(`Invalid channel`);let i=e=>e.replace(/<\/script/gi,`<\\/script`);return`<!doctype html><html lang="ru" data-channel="${e}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${e}'; style-src 'unsafe-inline'; font-src data:; connect-src 'none'; img-src 'none'; form-action 'none'; base-uri 'none'"><style>${r}</style></head><body><main id="exercise"></main><script nonce="${e}">${i(t)}<\/script><script nonce="${e}">${i(n)}<\/script></body></html>`}var xe=`// Included in an isolated document. Authors use only window.FinHealth.
(() => {
  const channel = document.documentElement.dataset.channel;
  let sequence = 0;
  const pending = new Map();
  function request(method, payload) {
    const requestId = ++sequence;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error('Нет подтверждения сохранения. Повторите попытку.')); }, 10000);
      pending.set(requestId, { resolve, reject, timer });
      parent.postMessage({ protocol: 'finhealth.exercise.v1', channel, requestId, method, payload }, '*');
    });
  }
  addEventListener('message', event => {
    const data = event.data;
    if (event.source !== parent || data?.protocol !== 'finhealth.exercise.v1' || data.channel !== channel || data.method !== 'response') return;
    const task = pending.get(data.requestId);
    if (!task) return;
    clearTimeout(task.timer); pending.delete(data.requestId);
    if (data.ok) task.resolve(data.value); else task.reject(new Error(data.error || 'Не удалось сохранить.'));
  });
  let queue = Promise.resolve();
  function save(payload) {
    const snapshot = structuredClone(payload);
    const next = queue.catch(() => {}).then(() => request('save', snapshot));
    queue = next; return next;
  }
  window.FinHealth = Object.freeze({
    init: () => request('init'), save,
    complete: payload => save({ ...payload, status: 'completed' }),
    resize: height => parent.postMessage({ protocol: 'finhealth.exercise.v1', channel, method: 'resize', height }, '*'),
  });
})();
`,Se=`:root { font-family: var(--fh-font); color: var(--fh-ink); line-height: 1.6; font-size: var(--fh-text-body); color-scheme: light; background: transparent; }
* { box-sizing: border-box; }
body { margin: 0; background: transparent; }
/* Contain child margins and focus rings in the box measured for the host. */
#exercise { display: flow-root; padding: 6px; }
p { margin: 0 0 12px; overflow-wrap: anywhere; }
.instruction { white-space: pre-wrap; font-size: 18px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
textarea { display: block; width: 100%; resize: vertical; border: 1px solid var(--fh-secondary); border-radius: var(--fh-radius-field); padding: 12px; font: inherit; color: inherit; background: var(--fh-surface); margin-bottom: 16px; }
.check,.choice { display: flex; align-items: flex-start; gap: 12px; }
input { flex-shrink: 0; margin: 3px 0 0; accent-color: var(--fh-ink); width: 20px; height: 20px; }
.question-card { border: 1px solid var(--fh-line); border-radius: var(--fh-radius-content); padding: 24px; margin: 0 0 20px; background: var(--fh-surface); }
fieldset { min-width: 0; border: 0; padding: 0; margin: 0; }
legend { font-size: 18px; line-height: 1.5; font-weight: 650; padding: 0; margin-bottom: 20px; width: 100%; overflow-wrap: anywhere; }
.question-number { display: block; color: var(--fh-secondary); font-size: var(--fh-text-small); font-weight: 500; margin-bottom: 8px; }
.choice { border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); padding: 12px 14px; background: var(--fh-canvas); margin-bottom: 8px; font-weight: 400; cursor: pointer; }
.choice:hover { background: var(--fh-hover); }
.choice:has(input:checked) { border-color: var(--fh-ink); background: var(--fh-selected); }
.choice:has(input:focus-visible) { outline: 3px solid var(--fh-accent); outline-offset: 2px; }
.check { font-weight: 400; padding: 12px 0; }
button { background: var(--fh-ink); color: var(--fh-surface); border: 1px solid var(--fh-ink); border-radius: var(--fh-radius-pill); padding: 10px 20px; min-height: var(--fh-control-height); font: inherit; font-weight: 600; cursor: pointer; }
button:hover { background: var(--fh-action-hover); }
button.secondary { color: var(--fh-secondary); background: transparent; border-color: transparent; text-decoration: underline; text-underline-offset: 3px; }
button.secondary:hover { color: var(--fh-ink); background: var(--fh-hover); }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 20px; }
:focus-visible { outline: 3px solid var(--fh-accent); outline-offset: 3px; }
.save-status { color: var(--fh-secondary); font-size: var(--fh-text-small); }
.visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.quiz-summary { font-size: var(--fh-text-small); color: var(--fh-secondary); margin-bottom: 16px; }
.quiz-progress { display: block; appearance: none; border: 0; border-radius: 4px; overflow: hidden; height: 4px; width: 100%; margin-bottom: 8px; background: var(--fh-line); color: var(--fh-ink); }
.quiz-progress::-webkit-progress-bar { background: var(--fh-line); }
.quiz-progress::-webkit-progress-value { background: var(--fh-ink); }
.quiz-progress::-moz-progress-bar { background: var(--fh-ink); }
.actions + [role=status]:not(:empty):not(.visually-hidden) { margin: 16px 0 0; padding: 12px 16px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); background: var(--fh-canvas); }
.actions + [role=status]:empty { display: none; }
.correct { color: #25613a; }.wrong { color: #85372b; }
.question-card:last-child { margin-bottom: 0; }
[hidden] { display: none !important; }
@media (max-width: 500px) { .question-card { padding: 18px 14px; } legend { font-size: 17px; } .choice { padding: 12px; } }

.choice-text { flex: 1; min-width: 0; }
.choice.answer-correct, .choice.answer-correct:has(input:checked) { border-color: #79a58a; background: #edf6ef; color: #25613a; }
.choice.answer-wrong, .choice.answer-wrong:has(input:checked) { border-color: #ce9990; background: #fcf0ee; color: #85372b; }
[role=status] strong, [role=status] strong + span { display: block; }
[role=status] strong + span { margin-top: 4px; }
`,Ce=`// First-party renderer: content enters as plain text through the exercise SDK.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  const button = (text, parent, action) => { const node = el('button', text, parent); node.type = 'button'; node.onclick = action; return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const tasks = new Map(config.tasks.map(task => [task.id, task]));
  const categories = new Map(config.categories.map(category => [category.id, category.title]));
  const lines = [...Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => r * 5 + c)),
    ...Array.from({ length: 5 }, (_, c) => Array.from({ length: 5 }, (_, r) => r * 5 + c)), [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
  function fresh() {
    const card = config.tasks.map(task => task.id);
    for (let i = card.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [card[i], card[j]] = [card[j], card[i]]; }
    return { card, marks: [] };
  }
  let state = context.record ? structuredClone(context.record.state) : fresh();
  let selected = null; let origin = null; let revision = 0; let lastPayload;
  const winning = () => lines.filter(line => line.every(index => state.marks.includes(state.card[index])));
  const payload = () => ({ state: structuredClone(state), status: winning().length ? 'completed' : state.marks.length ? 'in_progress' : 'not_started', outcome: 'not_applicable' });
  el('h3', config.title).className = 'bingo-title';
  if (config.instructions[0]) el('p', config.instructions[0]).className = 'bingo-open-instruction';
  const instructions = el('details'); instructions.className = 'bingo-instructions';
  el('summary', 'Как играть', instructions);
  const list = el('ul', '', instructions); config.instructions.slice(1).forEach(text => el('li', text, list));
  const actions = el('div'); actions.className = 'actions bingo-controls';
  const newCard = button('Новая карточка', actions, () => confirmChange('new'));
  const reset = button('Сбросить отметки', actions, () => confirmChange('reset')); reset.className = 'secondary';
  button('Распечатать', actions, () => window.print()).className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'bingo-confirm'; confirmation.hidden = true;
  confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-labelledby', 'bingo-confirm-text');
  const confirmText = el('p', '', confirmation); confirmText.id = 'bingo-confirm-text';
  let pendingAction = null;
  button('Подтвердить', confirmation, () => {
    const action = pendingAction; confirmation.hidden = true; pendingAction = null; closeDetail(false);
    state = action === 'new' ? fresh() : { card: [...state.card], marks: [] }; renderGrid(); refresh(); persist();
    (action === 'new' ? newCard : reset).focus();
  });
  const cancel = button('Отмена', confirmation, () => {
    const action = pendingAction; confirmation.hidden = true; pendingAction = null; (action === 'new' ? newCard : reset).focus();
  }); cancel.className = 'secondary';
  function confirmChange(action) {
    pendingAction = action; confirmation.hidden = false;
    confirmText.textContent = action === 'new' ? 'Создать новую карточку? Текущая карточка и отметки будут заменены.' : 'Сбросить все отметки? Карточка останется прежней.';
    cancel.focus();
  }
  const stats = el('p'); stats.className = 'bingo-stats'; stats.setAttribute('role', 'status');
  const grid = el('div'); grid.className = 'bingo-grid'; grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Карточка бинго, 5 строк и 5 столбцов');
  const detail = el('section'); detail.className = 'bingo-detail'; detail.hidden = true; detail.setAttribute('aria-labelledby', 'bingo-detail-title');
  const detailCategory = el('p', '', detail); detailCategory.className = 'bingo-category';
  const detailTitle = el('h4', '', detail); detailTitle.id = 'bingo-detail-title'; detailTitle.tabIndex = -1;
  const detailActions = el('div', '', detail); detailActions.className = 'actions';
  const mark = button('', detailActions, () => { toggle(selected); mark.focus(); });
  button('Закрыть', detailActions, () => closeDetail(true)).className = 'secondary';
  function closeDetail(focus) { detail.hidden = true; selected = null; refresh(); if (focus) origin?.focus(); }
  function toggle(id) {
    state = { card: [...state.card], marks: state.marks.includes(id) ? state.marks.filter(item => item !== id) : [...state.marks, id] };
    refresh(); persist();
  }
  function renderGrid() {
    grid.replaceChildren();
    state.card.forEach((id, index) => {
      const task = tasks.get(id);
      const cell = button('', grid, () => {
        if (selected === id) { toggle(id); closeDetail(true); return; }
        selected = id; origin = cell; detailCategory.textContent = categories.get(task.categoryId); detailTitle.textContent = task.text;
        detail.hidden = false; refresh(); detailTitle.focus();
      });
      cell.className = 'bingo-cell'; cell.dataset.taskId = id;
      cell.setAttribute('aria-label', \`Строка \${Math.floor(index / 5) + 1}, столбец \${index % 5 + 1}. \${categories.get(task.categoryId)}. \${task.text}\`);
      cell.setAttribute('aria-controls', 'bingo-detail-title');
      el('span', String(index + 1), cell).className = 'bingo-ordinal';
      el('span', categories.get(task.categoryId), cell).className = 'bingo-category';
      el('span', task.text, cell).className = 'bingo-task';
      el('span', '', cell).className = 'bingo-mark';
    });
  }
  function refresh() {
    const wins = winning(); const winnerIds = new Set(wins.flat().map(index => state.card[index]));
    stats.textContent = \`Выполнено \${state.marks.length} из 25 · \${state.marks.length * 4}%\${wins.length ? \` · Бинго! Линий: \${wins.length}\` : ''}\`;
    for (const cell of grid.children) {
      const id = cell.dataset.taskId; const marked = state.marks.includes(id);
      cell.classList.toggle('bingo-completed', marked); cell.classList.toggle('bingo-winning', winnerIds.has(id));
      cell.setAttribute('aria-expanded', String(selected === id));
      cell.querySelector('.bingo-mark').textContent = winnerIds.has(id) ? '✓ Бинго' : marked ? '✓ Выполнено' : '';
      cell.setAttribute('aria-description', marked ? 'Выполнено. Откройте задание, чтобы снять отметку.' : 'Не выполнено. Откройте задание, чтобы отметить.');
    }
    if (selected) mark.textContent = state.marks.includes(selected) ? 'Снять отметку' : 'Отметить выполненным';
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!confirmation.hidden) cancel.click(); else if (!detail.hidden) closeDetail(true); } });
  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true; retry.className = 'bingo-retry';
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true;
    saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status'); saveStatus.textContent = 'Сохраняем…';
    try {
      const response = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      saveStatus.textContent = response.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = \`\${error.message} Карточка и отметки на месте.\`; retry.hidden = false;
    }
  }
  renderGrid(); refresh();
  if (!context.record) persist(); // Persist the permutation immediately, even with zero marks.
  else if (context.pending) {
    lastPayload = payload(); saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert');
    saveStatus.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false;
  }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2);
  resize(); // Offscreen iframe observers may be throttled; supply the initial measured height.
  new ResizeObserver(resize).observe(root);
})();
`,we=`.bingo-title { margin: 0 0 12px; }
.bingo-instructions { margin-bottom: 12px; }
.bingo-instructions summary { cursor: pointer; }
.bingo-instructions li { margin: 6px 0; }
.bingo-controls { flex-wrap: wrap; }
.bingo-confirm { padding: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); margin: 12px 0; }
.bingo-confirm button { margin: 0 8px 4px 0; }
.bingo-stats { font-weight: 600; }
.bingo-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.bingo-grid .bingo-cell { display: flex; flex-direction: column; align-items: stretch; gap: 6px; text-align: left; min-width: 0; min-height: 150px; padding: 8px; color: var(--fh-ink); background: var(--fh-surface); border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); overflow-wrap: anywhere; }
.bingo-category { display: block; color: var(--fh-secondary); font-size: 11px; font-weight: 500; }
.bingo-ordinal { font-size: 12px; font-weight: 700; color: var(--fh-secondary); }
.bingo-task { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; font-size: 13px; font-weight: 500; line-height: 1.4; }
.bingo-mark { margin-top: auto; font-size: 11px; font-weight: 700; }
.bingo-grid .bingo-completed { background: var(--fh-selected); border-color: var(--fh-ink); }
.bingo-grid .bingo-winning { box-shadow: inset 0 0 0 2px var(--fh-accent); }
.bingo-grid .bingo-cell[aria-expanded="true"] { outline: 2px solid var(--fh-ink); outline-offset: 1px; }
.bingo-cell:focus-visible, .bingo-detail h4:focus-visible { outline: 3px solid var(--fh-accent); outline-offset: 2px; }
.bingo-detail { padding: 16px; margin-top: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.bingo-detail h4 { margin: 8px 0 16px; font-size: 18px; line-height: 1.5; overflow-wrap: anywhere; }
[hidden] { display: none !important; }
@media (max-width: 400px) {
  .bingo-grid { gap: 3px; }
  .bingo-grid .bingo-cell { padding: 5px 3px; min-height: 115px; }
  .bingo-task { font-size: 12px; -webkit-line-clamp: 3; }
  .bingo-cell .bingo-category { display: none; }
  .bingo-mark { font-size: 11px; }
  .bingo-detail { padding: 12px; }
}
@media print {
  .bingo-controls, .bingo-confirm, .bingo-detail, .save-status, .bingo-retry { display: none !important; }
  .bingo-instructions, .bingo-open-instruction { display: none; }
  .bingo-cell .bingo-category { display: block; }
  .bingo-grid { gap: 4px; }
  .bingo-grid .bingo-cell { color: #000; background: #fff; min-height: 130px; break-inside: avoid; }
  .bingo-task { display: block; overflow: visible; font-size: 12px; }
  .bingo-grid .bingo-winning { box-shadow: none; border: 2px solid #000; }
  .bingo-grid .bingo-cell[aria-expanded="true"] { outline: none; }
}
`,Te=`// First-party renderer. Author content arrives only through the host's private config.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text = '', parent = root) => { const node = document.createElement(tag); node.textContent = text; parent.append(node); return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const config = context.config;
  const empty = mode => ({ mode, screen: 'intro', index: 0, answers: {}, dialogues: {}, leadValues: [], leadAutomatic: true, reflected: [], missing: [], rule: '' });
  let state = context.record?.state ?? empty('full');
  let revision = 0, lastPayload;
  root.classList.add('compass');
  const content = el('div');
  const status = el('p'); status.className = 'save-status'; status.setAttribute('role', 'status');
  const retry = el('button', 'Повторить сохранение'); retry.type = 'button'; retry.hidden = true;
  retry.onclick = () => persist(lastPayload);
  const counts = () => config.modes[state.mode];
  function payload() {
    return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.screen !== 'intro' || Object.keys(state.answers).length || Object.keys(state.dialogues).length || state.rule ? 'in_progress' : 'not_started', outcome: 'not_applicable' };
  }
  async function persist(value = payload()) {
    lastPayload = structuredClone(value);
    const current = ++revision;
    status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…'; retry.hidden = true;
    try {
      await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      status.textContent = 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.setAttribute('role', 'alert'); status.textContent = \`\${error.message} Ваш ввод на месте.\`; retry.hidden = false;
    }
  }
  function tally() {
    const result = {};
    const bump = (v, weight) => { result[v] = (result[v] ?? 0) + weight; };
    for (const [key, answer] of Object.entries(state.answers)) bump(config.scenarios[Number(key)].options[answer].value, config.weights.situation);
    for (const [key, answer] of Object.entries(state.dialogues)) {
      const d = config.conflicts[Number(key)];
      if (answer.a !== undefined) bump(d.valuesA[answer.a].v, config.weights.dialogue);
      if (answer.b !== undefined) bump(d.valuesB[answer.b].v, config.weights.dialogue);
    }
    return result;
  }
  // Stable sorting preserves the author's first-encounter order for equal weights.
  function sorted() { const weights = tally(); return Object.keys(weights).sort((a, b) => weights[b] - weights[a]); }
  function shownValues() { const ranked = sorted(); return ranked.concat(Object.keys(config.valueLabels).filter(v => !ranked.includes(v))).slice(0, 8); }
  const button = (label, action, parent = content, id) => {
    const node = el('button', label, parent); node.type = 'button'; if (id) node.id = id; node.onclick = action; return node;
  };
  function update(action, focusId) { action(); render(focusId); persist(); }
  function move(screen, index = 0) { update(() => { state.screen = screen; state.index = index; }); }
  function nav(previous, nextLabel, next, disabled = false) {
    const row = el('div', '', content); row.className = 'actions compass-nav';
    button('Назад', previous, row).className = 'secondary';
    button(nextLabel, next, row).disabled = disabled;
  }
  function heading(title, instruction) {
    const h = el('h2', title, content); h.tabIndex = -1; h.id = 'compass-heading';
    if (instruction) el('p', instruction, content).className = 'instruction';
  }
  function choices(label, options, selected, change, prefix) {
    const field = el('fieldset', '', content); el('legend', label, field);
    options.forEach((option, index) => {
      const wrap = el('label', '', field); wrap.className = 'choice';
      const radio = el('input', '', wrap); radio.type = 'radio'; radio.name = prefix; radio.id = \`\${prefix}-\${index}\`;
      radio.checked = selected === index; radio.value = String(index);
      el('span', option.text ?? option.label, wrap).className = 'choice-text';
      radio.onchange = () => update(() => change(index), radio.id);
    });
  }
  function valueChoices(label, key, max, values) {
    const field = el('fieldset', '', content); el('legend', label, field);
    values.forEach(value => {
      const wrap = el('label', '', field); wrap.className = 'choice compass-value';
      const input = el('input', '', wrap); input.type = max === 1 ? 'radio' : 'checkbox'; input.name = key; input.id = \`\${key}-\${value}\`;
      input.checked = state[key].includes(value); input.disabled = max > 1 && !input.checked && state[key].length >= max;
      el('span', config.valueLabels[value], wrap).className = 'choice-text';
      input.onchange = () => update(() => {
        if (key === 'leadValues') state.leadAutomatic = false;
        state[key] = max === 1 ? [value] : input.checked ? [...state[key], value] : state[key].filter(v => v !== value);
      }, input.id);
    });
  }
  function reset(mode = state.mode) {
    if (!Object.keys(state.answers).length && !Object.keys(state.dialogues).length && !state.rule) {
      update(() => { state = empty(mode); }); return;
    }
    const area = el('div', '', content); area.className = 'compass-confirm'; area.setAttribute('role', 'alertdialog'); area.setAttribute('aria-modal', 'false'); area.setAttribute('aria-labelledby', 'compass-reset-title');
    el('p', 'Начать заново? Все ответы и семейное правило будут удалены.', area).id = 'compass-reset-title';
    const cancel = button('Отмена', () => render(state.screen === 'intro' ? \`mode-\${state.mode}\` : 'compass-restart'), area);
    button('Удалить ответы и начать заново', () => update(() => { state = empty(mode); }), area);
    cancel.focus();
  }
  function render(focusId) {
    content.replaceChildren();
    const { situations, dialogues } = counts();
    const progress = el('progress', '', content); progress.className = 'quiz-progress'; progress.max = situations + dialogues + 1;
    progress.value = state.screen === 'result' ? progress.max : Object.keys(state.answers).length + Object.values(state.dialogues).filter(d => d.a !== undefined && d.b !== undefined).length;
    progress.setAttribute('aria-label', 'Пройдено шагов');
    if (state.screen === 'intro') {
      heading(config.text.introTitle, config.text.introBody);
      el('p', config.text.introQuestion, content).className = 'compass-callout';
      const field = el('fieldset', '', content); el('legend', 'Формат прохождения', field);
      for (const [mode, label, duration] of [['full', 'Полная версия', '20–25 мин'], ['short', 'Короткая версия', '10–12 мин']]) {
        const wrap = el('label', '', field); wrap.className = 'choice';
        const input = el('input', '', wrap); input.type = 'radio'; input.name = 'mode'; input.id = \`mode-\${mode}\`; input.checked = state.mode === mode;
        const c = config.modes[mode]; el('span', \`\${label} · \${c.situations} \${c.situations === 3 ? 'ситуации' : 'ситуаций'} · \${c.dialogues} диалога (\${duration})\`, wrap).className = 'choice-text';
        input.onchange = () => reset(mode);
      }
      button('Начать тренажёр', () => move('situations'));
    } else if (state.screen === 'situations') {
      const scenario = config.scenarios[state.index];
      el('p', \`Раунд 1 · Ситуация \${state.index + 1} из \${situations}\`, content).className = 'compass-step';
      heading(config.text.situationsTitle, config.text.situationsInstruction);
      choices(scenario.quote, scenario.options, state.answers[state.index], answer => { state.answers[state.index] = answer; }, 'situation');
      el('p', scenario.meta, content).className = 'compass-step';
      const answer = state.answers[state.index];
      if (answer !== undefined) { const reveal = el('p', scenario.options[answer].sub + config.text.choiceReveal, content); reveal.className = 'compass-callout'; reveal.setAttribute('role', 'status'); }
      nav(() => state.index ? move('situations', state.index - 1) : move('intro'), state.index === situations - 1 ? 'Перейти к раунду 2' : 'Следующая ситуация',
        () => state.index === situations - 1 ? move('dialogues') : move('situations', state.index + 1), answer === undefined);
    } else if (state.screen === 'dialogues') {
      const dialogue = config.conflicts[state.index], answer = state.dialogues[state.index] ?? {};
      el('p', \`Раунд 2 · Диалог \${state.index + 1} из \${dialogues}\`, content).className = 'compass-step';
      heading(config.text.dialoguesTitle, config.text.dialoguesInstruction);
      choices(dialogue.lineA, dialogue.valuesA, answer.a, a => { state.dialogues[state.index] = { ...answer, a }; }, 'dialogue-a');
      choices(dialogue.lineB, dialogue.valuesB, answer.b, b => { state.dialogues[state.index] = { ...answer, b }; }, 'dialogue-b');
      const complete = answer.a !== undefined && answer.b !== undefined;
      if (complete) { const reveal = el('p', dialogue.resolution, content); reveal.className = 'compass-callout'; reveal.setAttribute('role', 'status'); }
      nav(() => state.index ? move('dialogues', state.index - 1) : move('situations', situations - 1), state.index === dialogues - 1 ? 'Перейти к раунду 3' : 'Следующий диалог', () => {
        if (state.index < dialogues - 1) move('dialogues', state.index + 1);
        else update(() => { if (state.leadAutomatic) state.leadValues = sorted().slice(0, 3); state.screen = 'values'; state.index = 0; });
      }, !complete);
    } else if (state.screen === 'values') {
      heading(config.text.valuesTitle, config.text.valuesInstruction);
      const values = shownValues();
      // Keep previously chosen values reachable after revisiting and changing earlier answers.
      const reachable = [...new Set([...values, ...state.leadValues, ...state.reflected, ...state.missing])];
      valueChoices('Ведущие ценности · максимум три', 'leadValues', 3, reachable);
      el('p', config.text.mapHelp, content).className = 'compass-step';
      valueChoices(config.text.reflectedTitle, 'reflected', 1, reachable);
      valueChoices(config.text.missingTitle, 'missing', 1, reachable);
      nav(() => move('dialogues', dialogues - 1), 'Собрать компас', () => move('result'));
    } else {
      heading(config.text.resultTitle, config.text.resultBody);
      const weights = tally(), ranking = sorted(), max = Math.max(1, ...Object.values(weights));
      const list = el('dl', '', content); list.className = 'compass-tally';
      for (const value of ranking.slice(0, 6)) {
        el('dt', config.valueLabels[value], list); const item = el('dd', '', list);
        const bar = el('progress', '', item); bar.max = max; bar.value = weights[value]; bar.setAttribute('aria-label', config.valueLabels[value]);
        el('span', String(weights[value]), item);
      }
      const leading = state.leadValues.length ? state.leadValues : ranking.slice(0, 1);
      el('h3', 'Ведущие ценности', content); el('p', leading.map(v => config.valueLabels[v]).join(' · ') || '—', content);
      for (const [key, title] of [['reflected', config.text.reflectedTitle], ['missing', config.text.missingTitle]]) {
        if (state[key].length) { el('h3', title, content); el('p', state[key].map(v => config.valueLabels[v]).join(' · '), content); }
      }
      el('p', config.text.ruleInstruction, content).className = 'instruction';
      const label = el('label', 'Одно правило потребления для семьи', content); label.htmlFor = 'compass-rule';
      const input = el('textarea', '', content); input.id = 'compass-rule'; input.rows = 3; input.maxLength = 10000; input.placeholder = config.text.rulePlaceholder; input.value = state.rule;
      const printRule = el('p', state.rule, content); printRule.className = 'compass-print-rule';
      input.oninput = () => { state.rule = input.value; printRule.textContent = state.rule; persist(); };
      const examples = el('details', '', content); el('summary', 'Примеры правил', examples);
      for (const rule of config.ruleExamples) button(rule, () => { state.rule = rule; input.value = rule; printRule.textContent = rule; input.focus(); persist(); }, examples).className = 'compass-example';
      nav(() => move('values'), 'Распечатать компас', () => window.print());
    }
    if (state.screen !== 'intro') button('Пройти заново', () => reset(), content, 'compass-restart').className = 'secondary compass-restart';
    (document.getElementById(focusId || 'compass-heading'))?.focus({ preventScroll: true });
  }
  render();
  status.textContent = 'Ответы сохраняются до обновления страницы';
  if (context.pending) { status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; lastPayload = payload(); retry.hidden = false; }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2);
  resize(); // Offscreen iframe observers may be throttled; supply the initial measured height.
  new ResizeObserver(resize).observe(root);
})();
`,Ee=`.compass h2 { margin: 12px 0 16px; font-size: 22px; line-height: 1.35; overflow-wrap: anywhere; }
.compass h3 { margin: 20px 0 8px; font-size: 18px; }
.compass fieldset { margin: 20px 0; }
.compass legend { margin-bottom: 12px; }
.compass .compass-step { color: var(--fh-secondary); font-size: var(--fh-text-small); }
.compass .compass-callout { padding: 16px; border-radius: var(--fh-radius-field); background: var(--fh-canvas); border-left: 3px solid var(--fh-accent); }
.compass-nav { justify-content: space-between; }
.compass-restart { margin-top: 16px; }
.compass .save-status { margin: 12px 0 4px; }
.compass-tally { margin: 20px 0; }
.compass-tally dt { margin-top: 12px; font-weight: 600; overflow-wrap: anywhere; }
.compass-tally dd { display: flex; align-items: center; gap: 12px; margin: 4px 0 0; }
.compass-tally progress { flex: 1; min-width: 0; accent-color: var(--fh-ink); height: 12px; }
.compass summary { cursor: pointer; padding: 8px 0; }
.compass .compass-example { display: block; width: 100%; margin: 8px 0; text-align: left; white-space: normal; background: var(--fh-canvas); color: var(--fh-ink); border-color: var(--fh-line); border-radius: var(--fh-radius-field); overflow-wrap: anywhere; }
.compass-confirm { margin-top: 16px; padding: 16px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.compass-confirm button { margin: 4px 8px 4px 0; }
.compass-print-rule { display: none; }
@media (max-width: 500px) {
  .compass h2 { font-size: 20px; }
  .compass-nav { align-items: stretch; }
  .compass-nav button { flex: 1 1 100%; }
  .compass button { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
}
@media print {
  .compass button, .compass details, .compass textarea, .compass .save-status, .compass .quiz-progress, .compass-confirm { display: none !important; }
  .compass .compass-print-rule { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
  .compass { color: #000; }
}
`,De=`// Closed educational content is supplied as plain text by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag,text,parent=root) => {const node=document.createElement(tag); if(text)node.textContent=text; parent.append(node); return node;};
  const button = (text,parent,action) => {const node=el('button',text,parent);node.type='button';node.onclick=action;return node;};
  let context;
  try {context=await FinHealth.init();} catch(error) {el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  let state=context.record?structuredClone(context.record.state):{selected:config.biases[0].id,answers:{}};
  let revision=0;let lastPayload;let confirming=false;
  const tally=()=>{let total=0,correct=0;config.biases.forEach(b=>{const a=state.answers[b.id];if(a?.checked){total++;if(a.choice===b.testQuestions[0].correct)correct++;}});return {total,correct};};
  const payload=()=>{const t=tally();return {state:structuredClone(state),status:t.total===config.biases.length?'completed':Object.keys(state.answers).length?'in_progress':'not_started',outcome:'not_applicable',score:{earned:t.correct,possible:config.biases.length}};};
  el('h3',config.title);el('p',config.introduction);
  const stats=el('p');stats.className='cognitive-stats';stats.setAttribute('role','status');
  const nav=el('nav');nav.className='cognitive-themes';nav.setAttribute('aria-label','Темы тренажёра');
  const panel=el('section');panel.className='cognitive-panel';
  const reset=button('Начать заново',root,()=>{confirming=true;renderConfirm();});reset.className='secondary';
  const confirm=el('div');confirm.hidden=true;
  function renderConfirm(){confirm.replaceChildren();confirm.hidden=!confirming;if(!confirming)return;el('p','Начать заново? Все ответы и результаты проверки будут удалены.',confirm);button('Подтвердить',confirm,()=>{state={selected:config.biases[0].id,answers:{}};confirming=false;renderConfirm();render();persist();reset.focus();});button('Отмена',confirm,()=>{confirming=false;renderConfirm();reset.focus();}).focus();}
  const status=el('p');status.className='visually-hidden';status.setAttribute('role','status');
  const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
  async function persist(value=payload()) {lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;status.className='visually-hidden';status.setAttribute('role','status');status.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)status.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;status.className='';status.setAttribute('role','alert');status.textContent=\`\${error.message} Ответы на месте.\`;retry.hidden=false;}}
  function refreshStats(){const t=tally();stats.textContent=\`Правильных ответов: \${t.correct} · Всего пройдено: \${t.total} из \${config.biases.length} · Успешность: \${t.total?Math.round(t.correct/t.total*100):0}%\`;}
  function render(focus=false){
    refreshStats();nav.replaceChildren();
    config.biases.forEach(b=>{const item=button(\`\${b.icon}: \${b.name}\`,nav,()=>{state.selected=b.id;render(true);persist();});item.setAttribute('aria-current',String(b.id===state.selected));el('small',b.shortDesc,item);});
    panel.replaceChildren();const b=config.biases.find(b=>b.id===state.selected);const h=el('h4',\`\${b.icon}: \${b.name}\`,panel);h.tabIndex=-1;
    el('h5','Определение',panel);el('p',b.description,panel);el('h5','Как это работает',panel);el('p',b.howItWorks,panel);
    [['Реальные примеры',b.examples],['Как защитить себя',b.tips]].forEach(([title,items])=>{el('h5',title,panel);const ul=el('ul','',panel);items.forEach(v=>el('li',v,ul));});
    el('h5','Проверка понимания',panel);const q=b.testQuestions[0];const field=el('fieldset','',panel);el('legend',q.question,field);const feedback=el('p','',panel);feedback.setAttribute('role','status');
    q.options.forEach((text,i)=>{const label=el('label','',field);const input=el('input','',label);input.type='radio';input.name='cognitive-answer';input.value=String(i);input.checked=state.answers[b.id]?.choice===i;el('span',text,label);input.onchange=()=>{state.answers[b.id]={choice:i,checked:false};showFeedback();refreshStats();persist();};});
    const check=button('Проверить ответ',panel,()=>{const a=state.answers[b.id];if(!a){feedback.textContent='Выберите ответ';feedback.setAttribute('role','alert');return;}a.checked=true;showFeedback();refreshStats();persist();});
    function showFeedback(){const a=state.answers[b.id];check.disabled=!!a?.checked;feedback.textContent='';field.querySelectorAll('label').forEach((label,i)=>{label.classList.toggle('answer-correct',!!a?.checked&&i===q.correct);label.classList.toggle('answer-wrong',!!a?.checked&&i===a.choice&&i!==q.correct);});if(a?.checked){feedback.setAttribute('role','status');feedback.textContent=(a.choice===q.correct?config.feedback.correct:config.feedback.incorrect)+\` Верный ответ: \${q.options[q.correct]}\`;}}
    showFeedback();if(focus)h.focus();resize();
  }
  function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&confirming){confirming=false;renderConfirm();reset.focus();}});
  render();if(context.pending){lastPayload=payload();status.className='';status.setAttribute('role','alert');status.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  resize();new ResizeObserver(resize).observe(root);
})();
`,Oe=`.cognitive-themes { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; margin: 16px 0; }
.cognitive-themes button { text-align: left; min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.cognitive-themes small { display: block; margin-top: 6px; }
.cognitive-themes [aria-current="true"] { background: var(--fh-selected); color: var(--fh-ink); border: 2px solid var(--fh-ink); }
.cognitive-panel { margin: 16px 0; }
.cognitive-panel h4 { font-size: 20px; }
.cognitive-panel h5 { font-size: 16px; margin: 20px 0 8px; }
.cognitive-panel p, .cognitive-panel li { line-height: 1.55; }
.cognitive-panel fieldset { min-width: 0; padding: 12px; border: 1px solid var(--fh-line); }
.cognitive-panel label { display: flex; align-items: start; gap: 10px; padding: 12px 4px; cursor: pointer; }
.cognitive-panel input { flex-shrink: 0; margin-top: 4px; }
.cognitive-stats { font-weight: 600; }
[hidden] { display: none !important; }
@media(max-width:400px) { .cognitive-themes { grid-template-columns: 1fr; } }
.cognitive-panel .answer-correct { color: #25613a; background: #edf6ef; border: 1px solid #79a58a; }
.cognitive-panel .answer-wrong { color: #85372b; background: #fcf0ee; border: 1px solid #ce9990; }
`,ke=`// Closed educational content is supplied as plain text by the host.
(async()=>{
 const root=document.getElementById('exercise');
 const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
 const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const {config}=context;
 const shuffle=length=>{const a=Array.from({length},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const fresh=()=>({screen:'intro',order:shuffle(config.cases.length),optionOrders:config.cases.map(()=>shuffle(config.labels.length)),index:0,answers:{}});
 let state=context.record?structuredClone(context.record.state):fresh();let revision=0;let lastPayload;
 const tally=()=>{let correct=0;const mistakes={},totals={};config.cases.forEach(c=>{totals[c.correct]=(totals[c.correct]||0)+1;mistakes[c.correct]=0;});Object.entries(state.answers).forEach(([key,answer])=>{const c=config.cases[Number(key)];if(config.labels[answer]===c.correct)correct++;else mistakes[c.correct]++;});return {correct,mistakes,totals};};
 const payload=()=>({state:structuredClone(state),status:state.screen==='result'?'completed':state.screen==='cases'?'in_progress':'not_started',outcome:'not_applicable',score:{earned:tally().correct,possible:config.cases.length}});
 el('h3',config.title);const introduction=el('div');config.introduction.forEach(p=>el('p',p,introduction));
 const instructions=el('details');el('summary','Как проходить',instructions);const steps=el('ol','',instructions);config.instructions.forEach(p=>el('li',p,steps));
 const guide=el('details');guide.open=state.screen==='intro';el('summary','Краткая шпаргалка по темпераментам',guide);el('p',config.guideIntroduction,guide);const types=el('div','',guide);types.className='temperament-types';config.types.forEach(t=>{const section=el('section','',types);el('h4',t.label,section);el('p',t.subtitle,section);const ul=el('ul','',section);t.points.forEach(p=>el('li',p,ul));});
 const panel=el('section');panel.className='temperament-panel';
 const confirm=el('div');confirm.hidden=true;
 const reset=button('Пройти заново',root,()=>{confirm.replaceChildren();confirm.hidden=false;el('p','Пройти заново? Ответы и результат будут удалены, порядок кейсов и вариантов изменится.',confirm);button('Подтвердить',confirm,()=>{state=fresh();state.screen='cases';confirm.hidden=true;render(true);persist();});button('Отмена',confirm,()=>{confirm.hidden=true;reset.focus();}).focus();});reset.className='secondary';
 const status=el('p');status.className='visually-hidden';status.setAttribute('role','status');const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;status.className='visually-hidden';status.setAttribute('role','status');status.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)status.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;status.className='';status.setAttribute('role','alert');status.textContent=\`\${error.message} Ответы на месте.\`;retry.hidden=false;}}
 function render(focus=false){
  panel.replaceChildren();reset.hidden=state.screen==='intro';introduction.hidden=state.screen!=='intro';
  if(state.screen==='intro'){button('Начать кейсы',panel,()=>{state.screen='cases';guide.open=false;render(true);persist();});resize();return;}
  const key=state.order[state.index],c=config.cases[key],answer=state.answers[key];el('p',\`Кейс \${state.index+1} из \${config.cases.length}\`,panel);const title=el('h4',c.title,panel);title.tabIndex=-1;el('p',c.scenario,panel);el('p','На какой тип темперамента это больше всего похоже?',panel);
  const choices=el('div','',panel);choices.className='temperament-choices';choices.setAttribute('role','group');choices.setAttribute('aria-label','Варианты ответа');
  state.optionOrders[key].forEach(i=>{const choice=button(config.labels[i],choices,()=>{if(Object.hasOwn(state.answers,key))return;state.answers[key]=i;if(Object.keys(state.answers).length===config.cases.length)state.screen='result';render(false);persist();panel.querySelector('.temperament-feedback')?.focus();});choice.disabled=answer!==undefined;choice.setAttribute('aria-pressed',String(answer===i));});
  if(answer!==undefined){const feedback=el('div','',panel);feedback.className='temperament-feedback';feedback.tabIndex=-1;feedback.setAttribute('role','status');el('p',answer===config.labels.indexOf(c.correct)?'Ответ верный':'Есть ошибка',feedback);el('p',\`Верный ответ: \${c.correct}\`,feedback);el('h5','Почему',feedback);el('p',c.explanation,feedback);el('h5','Что помогает',feedback);el('p',c.tool,feedback);
   if(state.screen!=='result')button('Следующий кейс',panel,()=>{state.index++;render(true);persist();});
  }
  if(state.screen==='result'){const t=tally();el('h4','Результат тренировки',panel);el('p',\`\${t.correct} / \${config.cases.length}\`,panel);el('p',config.assessment.find(a=>Math.round(t.correct/config.cases.length*100)>=a.minPercent).text,panel);el('h5','Какие типы давались сложнее',panel);const ul=el('ul','',panel);config.labels.forEach(label=>el('li',\`\${label}: \${t.mistakes[label]} ошибок из \${t.totals[label]||0} кейсов\`,ul));config.resultSections.forEach(s=>{el('h5',s.title,panel);const list=el('ul','',panel);s.paragraphs.forEach(p=>el('li',p,list));});el('p',config.resultNote,panel);}
  if(focus)title.focus();resize();
 }
 function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!confirm.hidden){confirm.hidden=true;reset.focus();}});
 render();if(!context.record)persist();else if(context.pending){lastPayload=payload();status.className='';status.setAttribute('role','alert');status.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 resize();new ResizeObserver(resize).observe(root);
})();
`,Ae=`.temperament-types { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
.temperament-types section { min-width: 0; border: 1px solid var(--fh-line); padding: 12px; border-radius: var(--fh-radius-field); }
.temperament-panel { margin: 20px 0; }
.temperament-panel h4 { font-size: 20px; }
.temperament-panel h5 { font-size: 16px; margin: 20px 0 8px; }
.temperament-panel p, .temperament-panel li, .temperament-types li { line-height: 1.55; }
.temperament-choices { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
.temperament-choices button { min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.temperament-choices [aria-pressed="true"] { border: 2px solid var(--fh-ink); background: var(--fh-selected); color: var(--fh-ink); opacity: 1; }
.temperament-feedback { margin: 16px 0; padding: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.temperament-feedback:focus-visible { outline: 3px solid var(--fh-accent); }
[hidden] { display: none !important; }
@media(max-width:400px) { .temperament-types, .temperament-choices { grid-template-columns: 1fr; } }
`,je=`// Reusable renderer: all learning content arrives through the host configuration.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  el('h3',config.title);config.instructions.forEach(t=>el('p',t));

  const fresh=()=>({answers:Object.fromEntries(config.steps.map(s=>[s.id,''])),checked:[],reflection:''});
  let state=context.record?structuredClone(context.record.state):fresh();
  const numeric=value=>{const normalized=value.trim().replace(',','.');if(!/^\\d+(?:\\.\\d+)?$/.test(normalized))return null;const v=Number(normalized);return Number.isFinite(v)?v:null;};
  const correct=(value,step)=>{const v=numeric(value);return v!==null&&Math.abs(v-step.correct)<=step.tolerance+Number.EPSILON*Math.max(1,Math.abs(v),Math.abs(step.correct))*4;};
  const payload=()=>({state:structuredClone(state),status:config.steps.every(s=>state.checked.includes(s.id))?'completed':state.reflection.trim()||Object.values(state.answers).some(v=>v.trim())?'in_progress':'not_started',outcome:'not_applicable'});
  const scenario=el('section');scenario.className='july-scenario';config.scenario.forEach(t=>el('p',t,scenario));
  const inputs=new Map();const feedbacks=new Map();
  config.steps.forEach((step,index)=>{
    const section=el('section');section.className='july-step';el('h4',\`Шаг \${index+1}\`,section);
    const label=el('label',step.prompt,section);label.htmlFor=step.id;
    const instruction=el('p',step.instruction,section);instruction.id=step.id+'-instruction';
    const row=el('div','',section);row.className='july-input-row';
    const input=el('input','',row);input.id=step.id;input.type='text';input.inputMode='decimal';input.maxLength=100;input.setAttribute('aria-describedby',instruction.id+' '+step.id+'-feedback');inputs.set(step.id,input);
    el('span',step.unit,row);
    const feedback=el('p','',section);feedback.id=step.id+'-feedback';feedback.setAttribute('role','status');feedbacks.set(step.id,feedback);
    button('Проверить',row,()=>{
      if(numeric(input.value)===null){feedback.hidden=false;feedback.textContent='Введите число в поле выше.';input.setAttribute('aria-invalid','true');return;}
      input.removeAttribute('aria-invalid');if(!state.checked.includes(step.id))state.checked.push(step.id);showFeedback(step);persist();
    });
    input.oninput=()=>{state.answers[step.id]=input.value;state.checked=state.checked.filter(id=>id!==step.id);feedback.hidden=true;input.removeAttribute('aria-invalid');persist();};
  });
  function showFeedback(step){const node=feedbacks.get(step.id);node.hidden=!state.checked.includes(step.id);node.textContent=correct(state.answers[step.id],step)?'Верно! '+step.hint:'Не совсем. Попробуйте ещё раз. Подсказка: '+step.hint;}
  const reflection=el('section');reflection.className='july-step';el('h4',config.reflection.title,reflection);el('p',config.reflection.prompt,reflection);
  const label=el('label','Ваш личный пример',reflection);label.htmlFor='cost-reflection';
  const textarea=el('textarea','',reflection);textarea.id='cost-reflection';textarea.rows=4;if(config.reflection.placeholder)textarea.placeholder=config.reflection.placeholder;textarea.maxLength=10000;textarea.oninput=()=>{state.reflection=textarea.value;persist();};
  function restore(){config.steps.forEach(step=>{inputs.get(step.id).value=state.answers[step.id];inputs.get(step.id).removeAttribute('aria-invalid');showFeedback(step);});textarea.value=state.reflection;}

  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role','status');
  const retry = button('Повторить сохранение',root,()=>persist(lastPayload)); retry.hidden=true;
  let revision=0; let lastPayload;
  async function persist(value=payload()) {
    lastPayload=structuredClone(value); const current=++revision; retry.hidden=true;
    saveStatus.className='save-status visually-hidden'; saveStatus.setAttribute('role','status'); saveStatus.textContent='Сохраняем…';
    try { await (value.status==='completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if(current!==revision)return; saveStatus.textContent='Сохранено до обновления страницы';
    } catch(error) { if(current!==revision)return; saveStatus.className='save-status'; saveStatus.setAttribute('role','alert'); saveStatus.textContent=error.message+' Ответы на месте.'; retry.hidden=false; }
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();}); clear.className='secondary';
  const confirmation=el('div'); confirmation.className='july-confirm'; confirmation.hidden=true; confirmation.setAttribute('role','group'); confirmation.setAttribute('aria-label','Очистка ответов');
  el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();restore();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();}); cancel.className='secondary';
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  restore();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Me=`.july-scenario,.july-step { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); overflow-wrap:anywhere; }
.july-step h4 { margin:0 0 12px; font-size:18px; }
.july-step p { white-space:pre-wrap; }
.july-input-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.july-input-row input { width:120px; min-width:0; height:auto; min-height:var(--fh-control-height); margin:0; padding:8px 12px; border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); font:inherit; color:inherit; background:var(--fh-surface); }
.july-step textarea { width:100%; box-sizing:border-box; }
.july-step fieldset { min-width:0; margin:12px 0; padding:8px; border:1px solid var(--fh-line); }
.july-step legend { padding:0 4px; }
.july-choice { display:flex; align-items:flex-start; gap:8px; padding:8px 0; cursor:pointer; }
.july-choice input { flex-shrink:0; margin:3px 0 0; }
.july-step select { width:100%; max-width:300px; }
.july-answer { margin:12px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.july-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.july-confirm button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.july-step,.july-scenario {padding:10px;}.july-choice{padding:10px 0;}}
`,Ne=`// Reusable renderer: all learning content arrives through the host configuration.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  el('h3',config.title);config.instructions.forEach(t=>el('p',t));

  const fresh=()=>({answers:Object.fromEntries(config.exercises.map(e=>[e.id,Object.fromEntries(e.rows.map(r=>[r.id,[]]))])),revealed:[]});
  let state=context.record?structuredClone(context.record.state):fresh();
  const expanded=new Set(state.revealed);
  const payload=()=>({state:structuredClone(state),status:config.exercises.every(e=>state.revealed.includes(e.id)&&e.rows.every(r=>state.answers[e.id][r.id].length))?'completed':state.revealed.length||Object.values(state.answers).some(rows=>Object.values(rows).some(v=>v.length))?'in_progress':'not_started',outcome:'not_applicable'});
  const controls=[];const reveals=[];
  config.exercises.forEach((exercise,index)=>{
    const section=el('section');section.className='july-step';el('h4',\`\${index+1}. \${exercise.title}\`,section);el('p',exercise.skill,section);exercise.context.forEach(t=>el('p',t,section));if(!exercise.rows.some(row=>row.text===exercise.prompt))el('p',exercise.prompt,section);
    exercise.rows.forEach(row=>{
      const field=el('fieldset','',section);el('legend',row.text,field);
      if(exercise.kind==='select'){
        const select=el('select','',field);select.setAttribute('aria-label',row.text);el('option','—',select).value='';
        row.options.forEach(o=>el('option',o.label,select).value=o.value);
        select.onchange=()=>{state.answers[exercise.id][row.id]=select.value?[select.value]:[];persist();};controls.push({exercise,row,select});
      }else{
        row.options.forEach(option=>{
          const label=el('label','',field);label.className='july-choice';const input=el('input','',label);input.type=exercise.kind==='multiple'?'checkbox':'radio';input.name=exercise.id+'-'+row.id;input.value=option.value;el('span',option.label,label);
          input.onchange=()=>{let values=state.answers[exercise.id][row.id];state.answers[exercise.id][row.id]=exercise.kind==='multiple'?(input.checked?[...values.filter(v=>v!==option.value),option.value]:values.filter(v=>v!==option.value)):[option.value];persist();};controls.push({exercise,row,option,input});
        });
      }
    });
    const reveal=button('Проверить ответ',section,()=>{
      if(expanded.has(exercise.id)){expanded.delete(exercise.id);refreshReveal();return;}
      expanded.add(exercise.id);if(!state.revealed.includes(exercise.id))state.revealed.push(exercise.id);refreshReveal();persist();
    });
    const answer=el('div','',section);answer.id=exercise.id+'-answer';answer.className='july-answer';answer.hidden=true;exercise.answer.forEach(t=>el('p',t,answer));reveal.setAttribute('aria-controls',answer.id);reveals.push({exercise,reveal,answer});
    if(exercise.note)el('p',exercise.note,section);
  });
  function refreshReveal(){reveals.forEach(({exercise,reveal,answer})=>{const open=expanded.has(exercise.id);answer.hidden=!open;reveal.textContent=open?'Скрыть ответ':'Проверить ответ';reveal.setAttribute('aria-expanded',String(open));});}
  function restore(){controls.forEach(({exercise,row,select,option,input})=>{const values=state.answers[exercise.id][row.id];if(select)select.value=values[0]||'';else input.checked=values.includes(option.value);});refreshReveal();}

  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role','status');
  const retry = button('Повторить сохранение',root,()=>persist(lastPayload)); retry.hidden=true;
  let revision=0; let lastPayload;
  async function persist(value=payload()) {
    lastPayload=structuredClone(value); const current=++revision; retry.hidden=true;
    saveStatus.className='save-status visually-hidden'; saveStatus.setAttribute('role','status'); saveStatus.textContent='Сохраняем…';
    try { await (value.status==='completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if(current!==revision)return; saveStatus.textContent='Сохранено до обновления страницы';
    } catch(error) { if(current!==revision)return; saveStatus.className='save-status'; saveStatus.setAttribute('role','alert'); saveStatus.textContent=error.message+' Ответы на месте.'; retry.hidden=false; }
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();}); clear.className='secondary';
  const confirmation=el('div'); confirmation.className='july-confirm'; confirmation.hidden=true; confirmation.setAttribute('role','group'); confirmation.setAttribute('aria-label','Очистка ответов');
  el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();expanded.clear();restore();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();}); cancel.className='secondary';
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  restore();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Pe=`.july-scenario,.july-step { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); overflow-wrap:anywhere; }
.july-step h4 { margin:0 0 12px; font-size:18px; }
.july-step p { white-space:pre-wrap; }
.july-input-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.july-input-row input { width:100px; min-width:0; }
.july-step textarea { width:100%; box-sizing:border-box; }
.july-step fieldset { min-width:0; margin:12px 0; padding:8px; border:1px solid var(--fh-line); }
.july-step legend { padding:0 4px; }
.july-choice { display:flex; align-items:flex-start; gap:8px; padding:8px 0; cursor:pointer; }
.july-choice input { flex-shrink:0; margin:3px 0 0; }
.july-step select { width:100%; max-width:300px; min-height:var(--fh-control-height); padding:8px; border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); font:inherit; color:inherit; background:var(--fh-surface); }
.july-answer { margin:12px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.july-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.july-confirm button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.july-step,.july-scenario {padding:10px;}.july-choice{padding:10px 0;}}
`,Fe=`// Learning content is supplied separately by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const n = document.createElement(tag); if (text) n.textContent = text; parent.append(n); return n; };
  const button = (text, parent, action) => { const n = el('button', text, parent); n.type = 'button'; n.onclick = action; return n; };
  let context; try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  config.instructions.forEach(t => el('p', t));
  const fresh = () => ({ days: Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => ({ text: '', kind: '' }))), done: false });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const stats = () => { const entries = state.days.flat().filter(e => e.text.trim() && e.kind); const t = entries.filter(e => e.kind === 't').length; return { labelled: entries.length, t, percent: entries.length === 21 ? Math.round(t / 21 * 1000) / 10 : null }; };
  const payload = () => { const s = stats(); return { state: structuredClone(state), status: state.done ? 'completed' : state.days.flat().some(e => e.text.trim() || e.kind) ? 'in_progress' : 'not_started', outcome: 'not_applicable', ...(state.done ? { summary: \`Доля записей Т: \${String(s.percent).replace('.', ',')}% (\${s.t} из 21).\` } : {}) }; };
  const fields = [];
  state.days.forEach((day, d) => {
    const section = el('section'); section.className = 'diary-day'; el('h4', \`День \${d + 1}\`, section);
    day.forEach((entry, i) => {
      const row = el('div', '', section); row.className = 'diary-entry'; const id = \`diary-\${d}-\${i}\`;
      const label = el('label', \`Запись \${i + 1}\`, row); label.htmlFor = id;
      const input = el('textarea', '', row); input.id = id; input.maxLength = 1000; input.rows = 2;
      const selectLabel = el('label', 'Отметка', row); selectLabel.htmlFor = id + '-kind';
      const select = el('select', '', row); select.id = id + '-kind';
      for (const [value, title] of [['', 'Выберите Т или П'], ['t', config.marks.t], ['p', config.marks.p]]) { const option = el('option', title, select); option.value = value; }
      const change = () => { state.days[d][i] = { text: input.value, kind: select.value }; state.done = false; renderResult(); persist(); };
      input.oninput = change; select.onchange = change; fields.push({ input, select, d, i });
    });
  });
  const result = el('section'); result.className = 'diary-result';
  el('h4', 'Итог недели', result);
  const progress = el('p', '', result); progress.setAttribute('role', 'status');
  const percent = el('p', '', result);
  el('p', config.calculationNote, result); el('p', config.calculationExample, result);
  const finish = button('Завершить дневник', root, () => { if (stats().labelled !== 21) return; state.done = true; renderResult(); persist(); });
  function renderResult() {
    const s = stats(); progress.textContent = \`Заполнено и отмечено: \${s.labelled} из 21\`;
    percent.hidden = s.percent === null; percent.textContent = s.percent === null ? '' : \`Доля записей Т: \${String(s.percent).replace('.', ',')}% · \${s.t} ÷ 21 × 100\`;
    finish.disabled = s.labelled !== 21 || state.done; finish.textContent = state.done ? 'Дневник завершён' : 'Завершить дневник';
  }
  function restore() { fields.forEach(({ input, select, d, i }) => { input.value = state.days[d][i].text; select.value = state.days[d][i].kind; }); renderResult(); }
  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true;
    saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status'); saveStatus.textContent = 'Сохраняем…';
    try { const saved = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value)); if (current !== revision) return; saveStatus.textContent = saved.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы'; }
    catch (error) { if (current !== revision) return; saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = error.message + ' Записи на месте.'; retry.hidden = false; }
  }
  const clear = button('Очистить дневник', root, () => { confirmation.hidden = false; cancel.focus(); }); clear.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'diary-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Очистка дневника');
  el('p', 'Очистить дневник? Все записи и отметки будут удалены.', confirmation);
  button('Очистить', confirmation, () => { state = fresh(); restore(); confirmation.hidden = true; persist(); clear.focus(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; clear.focus(); }); cancel.className = 'secondary';
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  restore();
  if (context.pending) { lastPayload = payload(); saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); resize(); new ResizeObserver(resize).observe(root);
})();
`,Ie=`.diary-day { margin:12px 0; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); padding:14px; min-width:0; }
.diary-day h4 { margin:0 0 12px; font-size:18px; }
.diary-entry { margin:0 0 14px; }
.diary-entry:last-child { margin-bottom:0; }
.diary-entry textarea { min-height:72px; margin-bottom:8px; }
.diary-entry select { width:100%; min-height:var(--fh-control-height); border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); background:var(--fh-surface); color:inherit; padding:8px; font:inherit; }
.diary-result { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); }
.diary-result h4 { margin:0 0 8px; }
.diary-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.diary-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.diary-day,.diary-result{padding:10px;}}
`,Le=`// Content belongs to the host config; this module only renders and saves a session attempt.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  const fresh=()=>({answers:config.statements.map(()=>null),dominant:null,metaphor:null,selectedExercise:null,responses:Object.fromEntries(config.exercises.map(e=>[e.id,Object.fromEntries(e.fields.map(f=>[f.id,'']))])),reflection:Object.fromEntries(config.reflection.map(f=>[f.id,''])),done:false});
  let state=context.record?structuredClone(context.record.state):fresh();
  const result=()=>{
    if(state.answers.some(a=>a===null))return null;
    const total=state.answers.reduce((sum,a)=>sum+a,0);const highest=Math.max(...state.answers);
    return {total,range:config.ranges.find(r=>total>=r.min&&total<=r.max),candidates:config.statements.filter((_,i)=>state.answers[i]===highest).map(s=>s.id)};
  };
  const ready=()=>{const r=result();const e=config.exercises.find(e=>e.id===state.selectedExercise);return !!r&&r.candidates.includes(state.dominant)&&!!e&&e.fields.every(f=>state.responses[e.id][f.id].trim().length);};
  const payload=()=>({state:structuredClone(state),status:state.done?'completed':state.answers.some(a=>a!==null)||state.metaphor!==null||state.selectedExercise!==null||Object.values(state.responses).some(rows=>Object.values(rows).some(Boolean))||Object.values(state.reflection).some(Boolean)?'in_progress':'not_started',outcome:'not_applicable'});
  config.instructions.forEach(t=>el('p',t));
  const controls=[];config.statements.forEach((s,index)=>{
    const field=el('fieldset');field.className='code-card';el('legend',\`\${index+1}. \${s.text}\`,field);
    config.options.forEach(o=>{
      const label=el('label','',field);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name=s.id;input.value=String(o.value);el('span',o.label,label);
      input.onchange=()=>{state.answers[index]=o.value;state.done=false;const r=result();state.dominant=r?(r.candidates.length===1?r.candidates[0]:r.candidates.includes(state.dominant)?state.dominant:null):null;refresh();persist();};controls.push({input,index,value:o.value});
    });
  });
  const diagnostic=el('section');diagnostic.className='code-card';el('h4','Результат диагностики',diagnostic);
  const total=el('p','',diagnostic);total.setAttribute('role','status');
  const dominantText=el('p','',diagnostic);
  const ties=el('fieldset','',diagnostic);el('legend',config.tieInstruction,ties);const tieControls=[];
  config.statements.forEach(s=>{const label=el('label','',ties);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='dominant';input.value=s.id;el('span',s.dominant,label);input.onchange=()=>{state.dominant=s.id;edited();};tieControls.push({id:s.id,label,input});});
  const metaphor=el('details');el('summary',config.metaphor.prompt,metaphor);const metaphorControls=[];
  config.metaphor.options.forEach(o=>{const label=el('label','',metaphor);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='metaphor';input.value=o.id;el('span',o.label,label);input.onchange=()=>{state.metaphor=o.id;edited();};metaphorControls.push(input);});
  const selection=el('fieldset');selection.className='code-card';el('legend','Выберите одно упражнение',selection);
  const exerciseControls=[];const panels=[];const areas=[];
  const textarea=(field,parent,get,set)=>{const label=el('label','',parent);label.className='code-field';el('span',field.label,label);const area=el('textarea','',label);area.rows=3;area.maxLength=2000;area.oninput=()=>{set(area.value);edited();};areas.push({area,get});};
  config.exercises.forEach(e=>{
    const label=el('label','',selection);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='exercise';input.value=e.id;el('span',e.title,label);input.onchange=()=>{state.selectedExercise=e.id;edited();};exerciseControls.push(input);
    const panel=el('section');panel.className='code-card';el('h4',e.title,panel);e.instructions.forEach(t=>el('p',t,panel));const fields=el('div','',panel);fields.className=e.layout==='columns'?'code-columns':'';e.fields.forEach(f=>textarea(f,fields,()=>state.responses[e.id][f.id],v=>state.responses[e.id][f.id]=v));panels.push({id:e.id,panel});
  });
  const reflection=el('details');el('summary','Подводим итоги',reflection);config.reflection.forEach(f=>textarea(f,reflection,()=>state.reflection[f.id],v=>state.reflection[f.id]=v));
  const completion=el('p');completion.setAttribute('role','status');
  const complete=button('Завершить упражнение',root,()=>{if(!ready()){completion.textContent='Ответьте на пять утверждений, выберите доминанту и заполните выбранное упражнение.';return;}state.done=true;refresh();persist();});
  const saveStatus=el('p');saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');
  const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
  let lastPayload;let revision=0;
  async function persist(value=payload()){
    lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';
    try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current!==revision)return;saveStatus.textContent='Сохранено до обновления страницы';}
    catch(error){if(current!==revision)return;saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent=error.message+' Ответы на месте.';retry.hidden=false;}
  }
  function edited(){state.done=false;refresh();persist();}
  function refresh(){
    controls.forEach(({input,index,value})=>input.checked=state.answers[index]===value);
    const r=result();total.textContent=r?\`\${r.total} / 10 · \${r.range.label}\`:'Ответьте на все пять утверждений';
    ties.hidden=!r||r.candidates.length===1;tieControls.forEach(({id,label,input})=>{label.hidden=!r?.candidates.includes(id);input.checked=state.dominant===id;});
    dominantText.hidden=!state.dominant;dominantText.textContent=state.dominant?'Ведущая доминанта: '+config.statements.find(s=>s.id===state.dominant).dominant:'';
    metaphorControls.forEach(input=>input.checked=state.metaphor===input.value);exerciseControls.forEach(input=>input.checked=state.selectedExercise===input.value);panels.forEach(({id,panel})=>panel.hidden=id!==state.selectedExercise);
    completion.textContent=state.done?'Упражнение выполнено':'';complete.disabled=state.done;
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();});clear.className='secondary';
  const confirmation=el('div');confirmation.className='code-card';confirmation.hidden=true;confirmation.setAttribute('role','group');confirmation.setAttribute('aria-label','Очистка ответов');el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();areas.forEach(({area,get})=>area.value=get());refresh();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();});cancel.className='secondary';document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  areas.forEach(({area,get})=>area.value=get());refresh();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Re=`.code-card { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); min-width:0; overflow-wrap:anywhere; }
.code-card legend { padding:0 4px; max-width:100%; }
.code-card h4 { margin:0 0 12px; font-size:18px; }
.code-choice { display:flex; align-items:flex-start; gap:8px; padding:9px 0; cursor:pointer; }
.code-choice input { flex-shrink:0; margin:3px 0 0; }
.code-field { display:block; margin:12px 0; }
.code-field span { display:block; margin-bottom:6px; }
.code-field textarea { width:100%; box-sizing:border-box; min-width:0; }
#exercise p { white-space:pre-wrap; overflow-wrap:anywhere; }
#exercise details { margin:16px 0; }
#exercise summary { cursor:pointer; overflow-wrap:anywhere; }
.code-card button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.code-card{padding:10px;}}
.code-columns { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
@media(max-width:600px){.code-columns{grid-template-columns:minmax(0,1fr);}}
`,ze=`// Case content and assessment thresholds are supplied by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const n = document.createElement(tag); if (text) n.textContent = text; parent.append(n); return n; };
  const button = (text, parent, action) => { const n = el('button', text, parent); n.type = 'button'; n.onclick = action; return n; };
  let context; try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const fresh = () => ({ screen: 'question', index: 0, answers: config.cases.map(() => null) });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const result = () => { const earned = state.answers.reduce((sum, answer, i) => sum + Number(answer === config.cases[i].correct), 0); const tier = config.result.thresholds.findIndex(max => earned <= max); return { earned, possible: config.cases.length, percent: Math.round(earned / config.cases.length * 100), tier: tier === -1 ? config.result.thresholds.length : tier }; };
  const payload = () => { const r = result(); return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.answers.some(a => a !== null) ? 'in_progress' : 'not_started', outcome: 'not_applicable', score: { earned: r.earned, possible: r.possible }, ...(state.screen === 'result' ? { summary: \`\${r.earned} / \${r.possible} (\${r.percent}%)\` } : {}) }; };
  config.instructions.forEach(t => el('p', t));
  const panel = el('section'); panel.className = 'case-panel';
  const reset = button('Пройти заново', root, () => { confirmation.hidden = false; cancel.focus(); }); reset.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'case-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Повтор кейсов');
  el('p', 'Пройти заново? Ответы и результат будут удалены.', confirmation);
  button('Подтвердить', confirmation, () => { state = fresh(); confirmation.hidden = true; render(true); persist(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; reset.focus(); }); cancel.className = 'secondary';
  const status = el('p'); status.className = 'visually-hidden'; status.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true; status.className = 'visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…';
    try { await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value)); if (current === revision) status.textContent = 'Сохранено до обновления страницы'; }
    catch (error) { if (current !== revision) return; status.className = ''; status.setAttribute('role', 'alert'); status.textContent = error.message + ' Ответы на месте.'; retry.hidden = false; }
  }
  function render(focus = false) {
    panel.replaceChildren();
    reset.hidden = !state.answers.some(a => a !== null);
    if (state.screen === 'result') {
      const r = result(); const heading = el('h4', 'Результат', panel); heading.tabIndex = -1;
      el('p', \`\${r.earned} / \${r.possible} (\${r.percent}%)\`, panel); el('h5', config.result.titles[r.tier], panel); el('p', config.result.descriptions[r.tier], panel); el('p', config.resultNote, panel);
      if (focus) heading.focus(); resize(); return;
    }
    const c = config.cases[state.index]; const answer = state.answers[state.index];
    const heading = el('h4', c.title, panel); heading.tabIndex = -1; el('p', c.scenario, panel);
    const choices = el('div', '', panel); choices.className = 'case-choices'; choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Варианты ответа');
    c.options.forEach((option, i) => {
      const choice = button(option, choices, () => { if (state.answers[state.index] !== null) return; state.answers[state.index] = i; render(); persist(); panel.querySelector('.case-feedback')?.focus(); });
      choice.className = 'case-choice'; choice.disabled = answer !== null; choice.setAttribute('aria-pressed', String(answer === i));
      if (answer !== null && i === c.correct) choice.className += ' is-correct'; else if (answer === i) choice.className += ' is-wrong';
    });
    if (answer !== null) {
      const feedback = el('div', '', panel); feedback.className = 'case-feedback'; feedback.tabIndex = -1; feedback.setAttribute('role', 'status');
      el('p', answer === c.correct ? 'Ответ верный' : 'Есть ошибка', feedback); el('p', \`Верный ответ: \${c.options[c.correct]}\`, feedback); el('p', c.explanation, feedback);
      button(state.index === config.cases.length - 1 ? 'Показать результат' : 'Далее', panel, () => { if (state.index === config.cases.length - 1) state.screen = 'result'; else state.index++; render(true); persist(); });
    }
    if (focus) heading.focus(); resize();
  }
  function resize() { FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  render();
  if (context.pending) { lastPayload = payload(); status.className = ''; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  resize(); new ResizeObserver(resize).observe(root);
})();
`,Be=`.case-panel { padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); margin:12px 0; overflow-wrap:anywhere; }
.case-panel h4 { margin:0 0 12px; font-size:18px; }
.case-choices { display:grid; gap:8px; margin:12px 0; }
.case-choice { text-align:left; color:var(--fh-ink); background:var(--fh-surface); border-color:var(--fh-line); border-radius:var(--fh-radius-field); font-weight:400; }
.case-choice:hover { background:var(--fh-hover); }
.case-choice:disabled { cursor:default; opacity:1; }
.case-choice.is-correct { border-color:#79a58a; background:#edf6ef; color:#25613a; }
.case-choice.is-wrong { border-color:#ce9990; background:#fcf0ee; color:#85372b; }
.case-feedback { margin:14px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.case-confirm { padding:12px; border:1px solid var(--fh-line); margin:12px 0; }
.case-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.case-panel{padding:10px;}}
`,Ve=`(async()=>{
 const root=document.getElementById('exercise');const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const {config}=context;const fresh=()=>({step:0,recognition:Array.from({length:5},()=>({choice:null,checked:false})),decisions:Array.from({length:3},()=>({choice:null,checked:false})),reflection:{good:'',bad:'',trigger:null,alternative:'',checked:false},rule:{selected:null,custom:'',confirmed:false},done:false});let state=context.record?structuredClone(context.record.state):fresh();
 const tally=()=>{const quiz=(a,qs)=>a.reduce((sum,v,i)=>sum+(v.checked&&v.choice!==null?qs[i].options[v.choice].points:0),0);const blocks=[quiz(state.recognition,config.recognition),quiz(state.decisions,config.decisions),state.reflection.checked?(state.reflection.alternative.trim().length>20?2:1):0,state.rule.confirmed?2:0];return {blocks,total:blocks.reduce((s,n)=>s+n,0)};};
 const ready=()=>state.recognition.every(a=>a.checked)&&state.decisions.every(a=>a.checked)&&state.reflection.checked&&state.rule.confirmed;
 const payload=()=>({state:structuredClone(state),status:state.done?'completed':state.recognition.some(a=>a.choice!==null)||state.decisions.some(a=>a.choice!==null)||Object.values(state.reflection).some(v=>typeof v==='string'?v.length:v!==null&&v!==false)||state.rule.selected!==null||state.rule.custom.length?'in_progress':'not_started',outcome:'not_applicable',score:{earned:tally().total,possible:15}});
 el('p',config.introduction);
 const progress=el('p');progress.setAttribute('role','status');const panels=Array.from({length:5},()=>{const n=el('section');n.className='market-block';return n;});const questions=[];
 function changed(){state.done=false;if(state.step===4)state.step=0;refresh();persist();}
 function step(n){state.step=n;refresh();persist();panels[n].querySelector?.('h4')?.focus();}
 for(const [key,block] of [['recognition',0],['decisions',1]]){
  const panel=panels[block];const heading=el('h4',config.quizBlocks[block].title,panel);heading.tabIndex=-1;el('p',config.quizBlocks[block].introduction,panel);
  config[key].forEach((q,i)=>{
   const section=el('section','',panel);section.className='market-card';el('p',q.scene,section);const field=el('fieldset','',section);el('legend',\`\${i+1}. \${q.question}\`,field);const inputs=[];
   q.options.forEach((o,index)=>{const label=el('label','',field);label.className='market-choice';const input=el('input','',label);input.type='radio';input.name=\`\${key}-\${i}\`;input.value=String(index);el('span',o.label,label);input.onchange=()=>{state[key][i]={choice:index,checked:false};changed();};inputs.push(input);});
   const feedback=el('div','',section);feedback.setAttribute('role','status');feedback.className='market-feedback';const title=el('strong','',feedback);const text=el('p','',feedback);const error=el('p','',section);error.setAttribute('role','alert');
   const check=button('Проверить ответ',section,()=>{if(state[key][i].choice===null){error.textContent='Выберите ответ.';return;}error.textContent='';state[key][i].checked=true;changed();});
   const edit=button('Изменить ответ',section,()=>{state[key][i].checked=false;changed();inputs[state[key][i].choice??0].focus();});edit.className='secondary';questions.push({key,i,section,inputs,feedback,title,text,check,edit});
  });
 }
 const r=config.reflection;el('h4',r.title,panels[2]).tabIndex=-1;el('p',r.introduction,panels[2]);const hint=el('details','',panels[2]);el('summary','Где найти историю покупок',hint);el('p',r.hint,hint);
 const areas=[];const textarea=(labelText,parent,get,set,placeholder)=>{const label=el('label','',parent);label.className='market-field';el('span',labelText,label);const area=el('textarea','',label);area.rows=3;area.maxLength=2000;if(placeholder)area.placeholder=placeholder;area.oninput=()=>{set(area.value);changed();};areas.push({area,get});return area;};
 textarea(r.goodLabel,panels[2],()=>state.reflection.good,v=>{state.reflection.good=v;state.reflection.checked=false;},r.placeholder);textarea(r.badLabel,panels[2],()=>state.reflection.bad,v=>{state.reflection.bad=v;state.reflection.checked=false;},r.placeholder);
 const triggerLabel=el('label','',panels[2]);triggerLabel.className='market-field';el('span',r.triggerLabel,triggerLabel);const trigger=el('select','',triggerLabel);el('option','—',trigger).value='';r.triggers.forEach((t,i)=>el('option',t,trigger).value=String(i));trigger.onchange=()=>{state.reflection.trigger=trigger.value===''?null:Number(trigger.value);state.reflection.checked=false;changed();};textarea(r.alternativeLabel,panels[2],()=>state.reflection.alternative,v=>{state.reflection.alternative=v;state.reflection.checked=false;});
 const reflectionFeedback=el('div','',panels[2]);reflectionFeedback.setAttribute('role','status');reflectionFeedback.className='market-feedback';const reflectionTitle=el('strong','',reflectionFeedback);const reflectionText=el('p','',reflectionFeedback);const reflectionError=el('p','',panels[2]);reflectionError.setAttribute('role','alert');
 button('Завершить разбор',panels[2],()=>{if(!state.reflection.good.trim()&&!state.reflection.bad.trim()){reflectionError.textContent='Укажите хотя бы одну покупку для анализа.';return;}reflectionError.textContent='';state.reflection.checked=true;changed();});
 const rule=config.rule;el('h4',rule.title,panels[3]).tabIndex=-1;el('p',rule.introduction,panels[3]);const ruleField=el('fieldset','',panels[3]);el('legend',rule.question,ruleField);const ruleControls=[];
 rule.options.forEach(o=>{const label=el('label','',ruleField);label.className='market-choice';const input=el('input','',label);input.type='radio';input.name='rule';input.value=o.id;const content=el('span','',label);el('strong',o.title,content);el('span',o.text,content).className='market-rule-text';input.onchange=()=>{state.rule.selected=o.id;state.rule.confirmed=false;changed();};ruleControls.push(input);});
 const customWrap=el('div','',panels[3]);textarea(rule.customLabel,customWrap,()=>state.rule.custom,v=>{state.rule.custom=v;state.rule.confirmed=false;});const ruleError=el('p','',panels[3]);ruleError.setAttribute('role','alert');const confirm=button('Зафиксировать моё правило',panels[3],()=>{const selected=rule.options.find(o=>o.id===state.rule.selected);if(!selected||selected.custom&&!state.rule.custom.trim()){ruleError.textContent=selected?'Пожалуйста, напишите своё правило.':'Выберите правило.';return;}ruleError.textContent='';state.rule.confirmed=true;changed();});
 const nexts=[];for(let i=0;i<4;i++){const nav=el('div','',panels[i]);nav.className='market-nav';if(i)button('Назад',nav,()=>step(i-1)).className='secondary';const next=button(i===3?'Мой результат':'Продолжить',nav,()=>{if(i===3){if(!ready())return;state.done=true;state.step=4;refresh();resultTitle.focus();persist();}else step(i+1);});nexts.push(next);}
 const resultTitle=el('h4','',panels[4]);resultTitle.tabIndex=-1;const resultText=el('p','',panels[4]);const score=el('p','',panels[4]);const blockScores=el('ul','',panels[4]);const scores=Array.from({length:4},()=>el('li','',blockScores));const ruleText=el('p','',panels[4]);const tips=el('details','',panels[4]);el('summary','На следующую распродажу',tips);const list=el('ul','',tips);config.tips.forEach(t=>el('li',t,list));button('Вернуться к ответам',panels[4],()=>step(0)).className='secondary';
 const saveStatus=el('p');saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;let lastPayload;let revision=0;
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current!==revision)return;saveStatus.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent=error.message+' Ответы на месте.';retry.hidden=false;}}
 function refresh(){
  const t=tally();progress.textContent=\`\${state.step===4?'Завершено':\`Блок \${state.step+1} из 4\`} · \${t.total} / 15\`;panels.forEach((p,i)=>p.hidden=state.step!==i);
  questions.forEach(q=>{const a=state[q.key][q.i];q.section.hidden=q.i>0&&!state[q.key][q.i-1].checked;q.inputs.forEach((input,i)=>{input.checked=a.choice===i;input.disabled=a.checked;});q.feedback.hidden=!a.checked;q.check.hidden=a.checked;q.edit.hidden=!a.checked;if(a.checked){const f=config[q.key][q.i].options[a.choice].feedback;q.feedback.dataset.tone=f.tone;q.title.textContent=f.title;q.text.textContent=f.text;}});
  reflectionFeedback.hidden=!state.reflection.checked;if(state.reflection.checked){const f=t.blocks[2]===2?r.full:r.partial;reflectionFeedback.dataset.tone=f.tone;reflectionTitle.textContent=f.title;reflectionText.textContent=f.text;}
  ruleControls.forEach(input=>input.checked=state.rule.selected===input.value);customWrap.hidden=!rule.options.find(o=>o.id===state.rule.selected)?.custom;confirm.disabled=state.rule.confirmed;confirm.textContent=state.rule.confirmed?'Правило зафиксировано':'Зафиксировать моё правило';
  nexts[0].disabled=!state.recognition.every(a=>a.checked);nexts[1].disabled=!state.decisions.every(a=>a.checked);nexts[2].disabled=!state.reflection.checked;nexts[3].disabled=!ready();
  const result=config.results.find(r=>t.total>=r.min&&t.total<=r.max);resultTitle.textContent=result.title;resultText.textContent=result.text;score.textContent=\`\${t.total} / 15\`;scores.forEach((n,i)=>n.textContent=\`Блок \${i+1}: \${t.blocks[i]} / \${[5,6,2,2][i]}\`);const selected=rule.options.find(o=>o.id===state.rule.selected);ruleText.textContent=selected?(selected.custom?state.rule.custom.trim():selected.value):'';
 }
 const clear=button('Начать заново',root,()=>{confirmation.hidden=false;cancel.focus();});clear.className='secondary';const confirmation=el('div');confirmation.className='market-card';confirmation.hidden=true;confirmation.setAttribute('role','group');confirmation.setAttribute('aria-label','Сброс упражнения');el('p','Начать заново? Ответы и тексты будут удалены.',confirmation);button('Начать заново',confirmation,()=>{state=fresh();restore();confirmation.hidden=true;persist();clear.focus();});const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();});cancel.className='secondary';document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
 function restore(){areas.forEach(({area,get})=>area.value=get());trigger.value=state.reflection.trigger===null?'':String(state.reflection.trigger);refresh();}restore();
 if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,He=`.market-card { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); min-width:0; overflow-wrap:anywhere; }
.market-block h4 { font-size:18px; margin:16px 0; }
.market-card fieldset,.market-block fieldset { min-width:0; border:0; padding:0; margin:12px 0; }
.market-block legend { padding:0; }
.market-choice { display:flex; gap:8px; align-items:flex-start; padding:10px 0; cursor:pointer; }
.market-choice input { flex-shrink:0; margin:3px 0 0; }
.market-rule-text { display:block; margin-top:4px; }
.market-field { display:block; margin:16px 0; }
.market-field span { display:block; margin-bottom:6px; }
.market-field textarea,.market-field select { width:100%; box-sizing:border-box; min-width:0; }
.market-field select { font:inherit; padding:8px; color:inherit; border:1px solid var(--fh-line); background:var(--fh-surface); border-radius:var(--fh-radius-field); }
.market-feedback { margin:12px 0; padding:12px; background:var(--fh-selected); border-left:3px solid var(--fh-accent); }
.market-nav { display:flex; gap:8px; flex-wrap:wrap; margin:16px 0; }
.market-card button { margin:0 8px 4px 0; }
.market-block p { white-space:pre-wrap; overflow-wrap:anywhere; }
.market-block details { margin:16px 0; }
.market-block summary { cursor:pointer; overflow-wrap:anywhere; }
[hidden]{display:none!important;}
@media(max-width:400px){.market-card{padding:10px;}}
`,Ue=`// Author content is supplied by the host as plain text. The runtime has no storage or network access.
(async()=>{
 const root=document.getElementById('exercise');
 const el=(tag,text='',parent=root)=>{const n=document.createElement(tag);n.textContent=text;parent.append(n);return n;};
 const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const c=context.config,u=c.ui,steps=['intro','diag','profile','cases','casesEnd','plan','final'];
 const fresh=(reset=false)=>{const plan=structuredClone(reset?c.resetPlan:c.initialPlan);return {step:'intro',diag:Array(6).fill(null),cases:Array(6).fill(null),caseIdx:0,plan,amountInput:plan.sum?String(plan.sum):''};};
 let state=context.record?structuredClone(context.record.state):fresh(),revision=0,lastPayload,confirming=false;
 const score=()=>state.cases.reduce((n,a,i)=>n+(a!==null&&c.cases[i].options[a].ok?1:0),0);
 const ready=()=>state.plan.goal.trim()&&state.plan.sum>0&&state.plan.term>0;
 const payload=()=>({state:structuredClone(state),status:state.step==='final'?'completed':state.step!=='intro'||state.diag.some(a=>a!==null)||state.cases.some(a=>a!==null)?'in_progress':'not_started',outcome:'not_applicable',score:{earned:score(),possible:6}});
 const number=n=>Number(n).toLocaleString('ru-RU');
 const label=el('p');label.className='credit-step';label.setAttribute('role','status');
 const panel=el('section');panel.className='credit-panel';
 const reset=button('Пройти заново',root,()=>{confirming=true;showConfirm();});reset.className='secondary';
 const confirmation=el('div');confirmation.hidden=true;
 const saveStatus=el('p');saveStatus.className='visually-hidden';saveStatus.setAttribute('role','status');
 const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
 function showConfirm(){confirmation.replaceChildren();confirmation.hidden=!confirming;if(!confirming)return;el('p','Начать заново? Все ответы и план будут удалены.',confirmation);button('Подтвердить',confirmation,()=>{state=fresh(true);confirming=false;showConfirm();render(true);persist();});button('Отмена',confirmation,()=>{confirming=false;showConfirm();reset.focus();}).focus();}
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)saveStatus.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;saveStatus.className='';saveStatus.setAttribute('role','alert');saveStatus.textContent=\`\${error.message} Ответы и план на месте.\`;retry.hidden=false;}}
 const move=(step,index)=>{state.step=step;if(index!==undefined)state.caseIdx=index;render(true);persist();};
 function card(parent=panel){const n=el('div','',parent);n.className='credit-card';return n;}
 function actions(){const n=el('div','',panel);n.className='credit-actions';return n;}
 function title(text){const h=el('h4',text,panel);h.tabIndex=-1;return h;}
 function render(focus=false){
  label.textContent=\`Шаг \${steps.indexOf(state.step)+1} из 7\`;panel.replaceChildren();reset.hidden=state.step==='intro'&&!state.diag.some(a=>a!==null);
  let heading;
  if(state.step==='intro'){
   el('p',c.intro,panel);el('p',c.introNote,card());const n=button('Начать →',actions(),()=>move('diag'));if(focus)n.focus();
  }else if(state.step==='diag'){
   heading=title(u.diagTitle);el('p',u.diagIntro,panel);const progress=el('p','',panel);progress.setAttribute('role','status');
   const nextParent=el('div','',panel);nextParent.className='credit-diagnostic';
   let next;
   const update=()=>{const n=state.diag.filter(a=>a!==null).length;progress.textContent=\`\${n} из 6\`;next.disabled=n<6;};
   c.statements.forEach((text,i)=>{const field=el('fieldset','',nextParent);el('legend',\`\${i+1}. \${text}\`,field);const options=el('div','',field);options.className='credit-scale';c.scaleLabels.forEach((text,j)=>{const option=el('label','',options);const input=el('input','',option);input.type='radio';input.name=\`diagnostic-\${i}\`;input.value=String(j+1);input.checked=state.diag[i]===j+1;el('span',text,option);input.onchange=()=>{state.diag[i]=j+1;update();persist();};});});
   next=button('Посмотреть профиль →',actions(),()=>move('profile'));update();
  }else if(state.step==='profile'){
   heading=title(u.profileTitle);el('p',u.profileIntro,panel);const profile=state.diag.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v||a.i-b.i).map(x=>x.i);
   profile.slice(0,2).forEach(i=>{const t=c.traps[i],n=card();el('p',\`Ловушка \${String(i+1).padStart(2,'0')}\`,n);el('h5',t.name,n);el('p',t.latin,n);el('p',\`Как это у вас работает: \${t.how}.\`,n);el('p',\`Первый шаг: \${t.fix}\`,n);});
   const rest=el('details','',panel);el('summary','Остальные четыре ловушки',rest);el('p',\`\${u.restIntro} \${profile.slice(2).map(i=>c.traps[i].name).join(' · ')}. \${u.restOutro}\`,rest);
   const a=actions();button('← Вернуться к диагностике',a,()=>move('diag'));button('Перейти к кейсам →',a,()=>{state.cases=Array(6).fill(null);move('cases',0);});
  }else if(state.step==='cases'){
   const i=state.caseIdx,q=c.cases[i],answered=state.cases[i];el('p',\`Ситуация \${i+1} из 6 · Узнано: \${score()}\`,panel);heading=title(u.casesTitle);el('p',q.scene,card());
   const field=el('fieldset','',panel);el('legend',q.question,field);
   q.options.forEach((o,j)=>{const b=button(o.text,field,()=>{if(state.cases[i]!==null)return;state.cases[i]=j;render(true);persist();});b.className='credit-option';b.disabled=answered!==null;if(answered!==null){if(o.ok)b.classList.add('answer-correct');else if(j===answered)b.classList.add('answer-wrong');}});
   if(answered!==null){const feedback=card();feedback.setAttribute('role','status');el('p',\`\${q.options[answered].ok?u.correct:u.incorrect} \${q.explain}\`,feedback);el('p',q.tool,feedback);}
   const a=actions();if(i>0)button('← Назад',a,()=>move('cases',i-1));const next=button(i===5?'К итогу →':'Следующая ситуация →',a,()=>i===5?move('casesEnd'):move('cases',i+1));next.disabled=answered===null;
  }else if(state.step==='casesEnd'){
   heading=title('Итог блока «Кейсы»');const s=score();el('p',\`\${s} / 6 · Узнали ловушек\`,card());el('p',c.comments[s>=c.commentThresholds[1]?2:s>=c.commentThresholds[0]?1:0],panel);const a=actions();button('← Вернуться к кейсам',a,()=>move('cases',5));button('Собрать свой план →',a,()=>move('plan'));
  }else if(state.step==='plan'){
   heading=title(u.planTitle);el('p',u.planIntro,panel);const hint=el('details','',panel);el('summary','Как выбрать цель для тренировки',hint);el('p',u.planNote,hint);
   const n=card(),presets=el('div','',n);presets.className='credit-presets';el('p','Готовые тренировочные цели',presets);
   const field=(name,id,type)=>{const label=el('label','',n);label.className='credit-field';el('span',name,label);const input=el('input','',label);input.id=id;input.type=type;return input;};
   const goal=field('На что копите','credit-goal','text');goal.maxLength=80;goal.value=state.plan.goal;
   const sum=field('Сумма цели, ₽','credit-sum','number');sum.min='1';sum.max=String(c.maxSum);sum.step='1';sum.value=state.amountInput;el('p',u.sumHint,n).className='credit-hint';
   const terms=el('fieldset','',n);el('legend','Срок',terms);const termInputs=[];
   c.terms.forEach(t=>{const label=el('label','',terms);const input=el('input','',label);input.type='radio';input.name='credit-term';input.value=String(t);input.checked=state.plan.term===t;termInputs.push(input);el('span',\`\${t} мес\`,label);input.onchange=()=>{state.plan.term=t;update();persist();};});el('p',u.termHint,n).className='credit-hint';
   const autoLabel=el('label','',n);autoLabel.className='credit-auto';const auto=el('input','',autoLabel);auto.type='checkbox';auto.checked=state.plan.autoTransfer;el('span',u.autoLabel,autoLabel);el('p',u.autoNote,n);
   const calc=el('div','',panel);calc.className='credit-calculation';calc.setAttribute('aria-live','polite');const error=el('p','',panel);error.id='credit-sum-error';error.setAttribute('role','alert');sum.setAttribute('aria-describedby','credit-sum-error');
   const a=actions();button('← Назад',a,()=>move('casesEnd'));const next=button('Собрать карточку плана →',a,()=>{if(!ready()||!sum.validity.valid){error.textContent='Заполните цель, сумму и срок';return;}move('final');});
   function update(){calc.replaceChildren();const amount=Number(state.amountInput),amountValid=state.amountInput.trim()&&Number.isFinite(amount)&&Number.isInteger(amount)&&amount>0&&amount<=c.maxSum&&amount===state.plan.sum&&sum.validity.valid;const valid=ready()&&amountValid;next.disabled=!valid;sum.setAttribute('aria-invalid',String(!amountValid));error.textContent=amountValid?'':\`Введите целую сумму от 1 до \${number(c.maxSum)} ₽.\`;if(!valid){el('p','Ежемесячный шаг —',calc);return;}const step=Math.round(state.plan.sum/state.plan.term);el('p',\`Ежемесячный шаг: \${number(step)} ₽\`,calc);el('p',\`\${number(state.plan.sum)} ₽ за \${state.plan.term} мес\`,calc);const light=c.lights.filter(l=>step>l.above).at(-1);if(light){el('p',light.label,calc);el('p',light.note,calc);}if(state.plan.sum>=c.dreamy.sum&&state.plan.term>=c.dreamy.term)el('p',c.dreamy.note,calc);}
   goal.oninput=()=>{state.plan.goal=goal.value;update();persist();};sum.oninput=()=>{state.amountInput=sum.value.slice(0,100);const v=Number(state.amountInput);if(state.amountInput.trim()&&Number.isFinite(v)&&Number.isInteger(v)&&v>0&&v<=c.maxSum)state.plan.sum=v;update();persist();};auto.onchange=()=>{state.plan.autoTransfer=auto.checked;persist();};
   c.presets.forEach(p=>button(\`\${p.label} · \${number(p.sum)} ₽ · \${p.term} мес\`,presets,()=>{state.plan.goal=p.goal;state.plan.sum=p.sum;state.amountInput=String(p.sum);state.plan.term=p.term;goal.value=p.goal;sum.value=state.amountInput;termInputs.forEach(i=>i.checked=Number(i.value)===p.term);update();persist();}));update();
  }else{
   heading=title(u.finalTitle);el('p',u.finalIntro,panel);const p=state.plan,step=Math.round(p.sum/p.term),n=card();el('h5',p.goal,n);
   const dl=el('dl','',n);[['Сумма',\`\${number(p.sum)} ₽\`],['Срок',\`\${p.term} мес\`],['Ежемесячный шаг',\`\${number(step)} ₽\`],['Механизм',p.autoTransfer?'Автоперевод':'Ручной перевод']].forEach(([k,v])=>{el('dt',k,dl);el('dd',v,dl);});
   el('h5',p.autoTransfer?u.autoTitle:u.manualTitle,n);el('p',p.autoTransfer?u.autoFeedback:u.manualFeedback,n);el('h5',u.actionsTitle,n);const ul=el('ul','',n);[u.action1,u.action2,p.autoTransfer?u.actionAuto:u.actionManual].forEach(t=>el('li',t.replaceAll('{goal}',p.goal).replaceAll('{step}',number(step)),ul));el('p',u.finalFoot,n);button('← Изменить план',actions(),()=>move('plan'));
  }
  if(focus&&heading)heading.focus();resize();
 }
 function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&confirming){confirming=false;showConfirm();reset.focus();}});
 render();if(context.pending){lastPayload=payload();saveStatus.className='';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 new ResizeObserver(resize).observe(root);resize();
})();
`,We=`.credit-step { font-weight: 600; }
.credit-panel h4 { font-size: 22px; margin: 16px 0; }
.credit-panel h5 { font-size: 18px; margin: 12px 0; }
.credit-panel p,.credit-panel li { line-height: 1.55; overflow-wrap: anywhere; }
.credit-card { border: 1px solid var(--fh-line); background: var(--fh-surface); border-radius: 14px; padding: 16px; margin: 16px 0; min-width: 0; }
.credit-panel fieldset { min-width: 0; border: 1px solid var(--fh-line); padding: 12px; margin: 12px 0; }
.credit-panel legend { line-height: 1.5; padding: 0 4px; }
.credit-scale { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 8px; }
.credit-scale label { display: flex; align-items: flex-start; gap: 6px; padding: 10px 4px; min-width: 0; overflow-wrap: anywhere; border-radius: 6px; }
.credit-scale label:has(input:checked) { background: var(--fh-selected); outline: 2px solid var(--fh-ink); }
.credit-panel input[type=radio],.credit-panel input[type=checkbox] { flex-shrink: 0; width: 18px; height: 18px; margin: 3px 0; }
.credit-actions { display: flex; gap: 10px; flex-wrap: wrap; margin: 16px 0; }
.credit-option { display: block; width: 100%; text-align: left; white-space: normal; overflow-wrap: anywhere; margin: 8px 0; }
.credit-option:disabled { opacity: 1; }
.credit-option.answer-correct { color: #25613a; background: #edf6ef; border: 1px solid #79a58a; }
.credit-option.answer-wrong { color: #85372b; background: #fcf0ee; border: 1px solid #ce9990; }
.credit-field { display: grid; gap: 6px; margin: 16px 0; }
.credit-field input { width: 100%; box-sizing: border-box; min-width: 0; font: inherit; padding: 10px; }
.credit-panel fieldset label { margin-right: 12px; }
.credit-auto { display: flex; gap: 10px; align-items: start; }
.credit-presets { display: flex; gap: 8px; flex-wrap: wrap; }
.credit-presets p { flex-basis: 100%; margin: 0; }
.credit-hint { font-size: 14px; color: var(--fh-muted); }
.credit-calculation { border-top: 1px solid var(--fh-line); margin: 16px 0; }
.credit-panel dl { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 8px; }
.credit-panel dd { margin: 0; font-weight: 600; overflow-wrap: anywhere; }
[hidden] { display: none !important; }
@media(max-width:600px) { .credit-scale { grid-template-columns: 1fr; } .credit-scale label { padding: 10px; } }
`,Ge=`// Generic yes/no self-assessment. Content and interpretation come from the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  const button = (text, parent, action) => { const node = el('button', text, parent); node.type = 'button'; node.onclick = action; return node; };
  let context;
  try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const fresh = () => ({ screen: 'question', index: 0, answers: config.questions.map(() => null) });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const payload = () => {
    const earned = state.answers.filter(answer => answer === 'yes').length;
    return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.answers.some(answer => answer !== null) ? 'in_progress' : 'not_started',
      outcome: 'not_applicable', score: { earned, possible: config.questions.length },
      ...(state.screen === 'result' ? { summary: \`\${config.labels.yes}: \${earned} / \${config.questions.length}\`.slice(0, 1000) } : {}) };
  };
  config.instructions.forEach(instruction => el('p', instruction));
  const panel = el('section'); panel.className = 'assessment-panel';
  const reset = button('Пройти заново', root, () => { confirmation.hidden = false; cancel.focus(); resize(); }); reset.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'assessment-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Повтор самооценки');
  el('p', 'Пройти заново? Ответы и результат будут удалены.', confirmation);
  button('Подтвердить', confirmation, () => { state = fresh(); confirmation.hidden = true; render(true); persist(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; reset.focus(); resize(); }); cancel.className = 'secondary';
  const status = el('p'); status.className = 'visually-hidden'; status.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision;
    retry.hidden = true; status.className = 'visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…';
    try {
      await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current === revision) status.textContent = 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.className = ''; status.setAttribute('role', 'alert'); status.textContent = error.message + ' Ответы на месте.'; retry.hidden = false;
    }
    resize();
  }
  function render(focus = false) {
    panel.replaceChildren(); reset.hidden = !state.answers.some(answer => answer !== null);
    if (state.screen === 'result') {
      const earned = state.answers.filter(answer => answer === 'yes').length;
      const heading = el('h4', 'Результат', panel); heading.tabIndex = -1;
      el('p', \`\${config.labels.yes}: \${earned} / \${config.questions.length}\`, panel);
      const band = config.resultBands?.find(band => earned >= band.min && earned <= band.max);
      if (band) { el('h5', band.title, panel); el('p', band.description, panel); }
      if (config.resultNote) el('p', config.resultNote, panel);
      button('Изменить ответы', panel, () => { state.screen = 'question'; state.index = 0; render(true); persist(); }).className = 'secondary';
      if (focus) heading.focus(); resize(); return;
    }
    el('p', \`Вопрос \${state.index + 1} из \${config.questions.length}\`, panel).className = 'assessment-progress';
    const heading = el('h4', config.questions[state.index].text, panel); heading.tabIndex = -1;
    const choices = el('div', '', panel); choices.className = 'assessment-choices'; choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Ответ');
    const choiceButtons = [];
    ['yes', 'no'].forEach(answer => {
      const choice = button(config.labels[answer], choices, () => {
        state.answers[state.index] = answer; state.screen = 'question';
        reset.hidden = false;
        choiceButtons.forEach(node => node.setAttribute('aria-pressed', String(node === choice)));
        next.disabled = false; persist();
      });
      choice.className = 'assessment-choice'; choice.setAttribute('aria-pressed', String(state.answers[state.index] === answer)); choiceButtons.push(choice);
    });
    const actions = el('div', '', panel); actions.className = 'assessment-actions';
    if (state.index > 0) button('Назад', actions, () => { state.index--; render(true); persist(); }).className = 'secondary';
    const last = state.index === config.questions.length - 1;
    const next = button(last ? 'Посмотреть результат' : 'Далее', actions, () => {
      if (state.answers[state.index] === null || (last && state.answers.some(answer => answer === null))) return;
      if (last) state.screen = 'result'; else state.index++;
      render(true); persist();
    }); next.disabled = state.answers[state.index] === null;
    if (focus) heading.focus(); resize();
  }
  function resize() { FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  render();
  if (context.pending) { lastPayload = payload(); status.className = ''; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  resize(); new ResizeObserver(resize).observe(root);
})();
`,Ke=`.assessment-panel { padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); margin:12px 0; overflow-wrap:anywhere; }
.assessment-panel h4 { margin:0 0 12px; font-size:18px; }
.assessment-panel h5 { font-size:16px; margin:16px 0 8px; }
.assessment-progress { color:var(--fh-muted); font-size:14px; }
.assessment-choices { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }
.assessment-choice { min-width:90px; background:var(--fh-surface); color:var(--fh-ink); border-color:var(--fh-line); }
.assessment-choice:hover { background:var(--fh-hover); }
.assessment-choice[aria-pressed="true"] { background:var(--fh-selected); border-color:var(--fh-accent); color:var(--fh-ink); }
.assessment-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
.assessment-confirm { padding:12px; border:1px solid var(--fh-line); margin:12px 0; }
.assessment-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.assessment-panel{padding:10px;}}
`,qe=`/* Accepted G3 foundation. Source values for the app and Storybook. */
@font-face { font-family: "FinHealth Manrope"; src: url("./assets/fonts/Manrope.ttf") format("truetype"); font-style: normal; font-weight: 200 800; font-display: swap; }
:root {
  --fh-font: "FinHealth Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --fh-ink: #112d4e;
  --fh-secondary: #52657b;
  --fh-canvas: #f7f9fb;
  --fh-surface: #fff;
  --fh-line: #d7e0e7;
  --fh-accent: #e3a940;
  --fh-action-hover: #203e60;
  --fh-selected: #e8eef4;
  --fh-hover: #eef2f6;
  --fh-control-selected: #e1e9f1;
  --fh-control-selected-ink: #112d4e;
  --fh-control-selected-border: #6e849b;
  --fh-control-thumb: #778390;
  --fh-on-dark: #cad7e3;
  --fh-caption-on-dark: #bdcbd8;
  --fh-demo-ink: #43566d;
  --fh-demo-surface: #e9eef3;
  /* Finance categories: Radix Green / Tomato / Blue, with darker text for small amounts. */
  --fh-income: #30a46c;
  --fh-income-surface: #c4e8d1;
  --fh-income-hover: #adddc0;
  --fh-income-border: #8eceaa;
  --fh-income-text: #0b5c36;
  --fh-expense: #e54d2e;
  --fh-expense-surface: #ffcdc2;
  --fh-expense-hover: #fdbdaf;
  --fh-expense-border: #f5a898;
  --fh-expense-text: #8e2515;
  --fh-capital: #0090ff;
  --fh-capital-surface: #c2e5ff;
  --fh-capital-hover: #acd8fc;
  --fh-capital-border: #8ec8f6;
  --fh-capital-text: #075699;
  --fh-planner-card: #f4f8fc;
  --fh-planner-soft: #eef2f6;
  --fh-planner-selected: #e8eef4;
  --fh-planner-secondary: #40556b;
  --fh-planner-warning: #ffebbc;
  --fh-planner-danger: #fbd9d3;
  --fh-text-small: 14px;
  --fh-text-body: 16px;
  --fh-text-lead: 20px;
  --fh-text-section: 26px;
  --fh-text-title: 42px;
  --fh-text-title-mobile: 32px;
  --fh-space-1: 4px;
  --fh-space-2: 8px;
  --fh-space-3: 12px;
  --fh-space-4: 16px;
  --fh-space-6: 24px;
  --fh-space-8: 32px;
  --fh-space-10: 40px;
  --fh-radius-field: 12px;
  --fh-radius-content: 20px;
  --fh-radius-cover: 24px;
  --fh-radius-pill: 999px;
  --fh-control-height: 48px;
  --fh-motion-navigation: 220ms;
  --fh-motion-feedback: 150ms;
}
/* Manrope has no italic face in this file; retain authored emphasis with an oblique. */
em { font-synthesis: style; }
.fh-theme { font-family: var(--fh-font); color: var(--fh-ink); background: var(--fh-canvas); }
@media (prefers-reduced-motion: reduce) {
  :root { --fh-motion-navigation: 0ms; --fh-motion-feedback: 0ms; }
}
`;function Je({definition:e,record:t,save:n,title:s,pending:c=!1,storage:u=`session`}){let d=(0,j.useRef)(null),p=(0,j.useRef)({definition:e,record:t,save:n,storage:u,pending:c});(0,j.useEffect)(()=>{p.current={definition:e,record:t,save:n,storage:u,pending:c}},[e,t,n,u,c]);let[_,y]=(0,j.useState)(``),[b,x]=(0,j.useState)(220),[w,T]=(0,j.useState)(``),[E,D]=(0,j.useState)(0),te=JSON.stringify({key:e.key,manifest:e.manifest,config:e.config}),M=m(e.manifest,S)||m(e.manifest,r);return(0,j.useEffect)(()=>{let t=crypto.randomUUID(),n=!0,s=0,c=Promise.resolve();function u(e){if(e.source!==d.current?.contentWindow||e.origin!==`null`||!ye(e.data,t))return;let r=e.data;if(r.method===`resize`){x(Math.max(120,Math.ceil(r.height)));return}let i=r.requestId;i<=s||(s=i,c=c.then(async()=>{if(!n)return;let{definition:e,record:a,save:o,storage:s,pending:c}=p.current,u=e=>{n&&d.current?.contentWindow?.postMessage({protocol:ve,channel:t,requestId:i,method:`response`,...e},`*`)};try{if(a&&!m(a.manifest,e.manifest))throw Error(`Версия упражнения изменилась. Сохранённый ответ не перезаписан.`);r.method===`init`?(a&&k(e,l(a)),u({ok:!0,value:{manifest:e.manifest,config:e.config,record:a,storage:s,pending:c,mode:`attempt`}}),T(``)):u({ok:!0,value:await o(e,k(e,r.payload))})}catch(e){let t=e instanceof Error?e.message:`Не удалось сохранить упражнение.`;u({ok:!1,error:t}),r.method===`init`&&T(t)}}))}window.addEventListener(`message`,u);let _=[{manifest:S,script:Ce,styles:we},{manifest:r,script:Te,styles:Ee},{manifest:C,script:De,styles:Oe},{manifest:f,script:ke,styles:Ae},{manifest:a,script:je,styles:Me},{manifest:i,script:ze,styles:Be},{manifest:h,script:Ve,styles:He},{manifest:O,script:Ue,styles:We},{manifest:v,script:Ge,styles:Ke},{manifest:o,script:Ne,styles:Pe},{manifest:g,script:Fe,styles:Ie},{manifest:ee,script:Le,styles:Re}].find(t=>m(e.manifest,t.manifest));return A(async()=>{let{default:e}=await import(`./Manrope-133UG_k2.js`);return{default:e}},[]).then(({default:e})=>{if(!n)return;let r=qe.replace(`./assets/fonts/Manrope.ttf`,e);y(be(t,xe,_?.script??`// Two first-party modules. All content is text; no content HTML is evaluated.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config, manifest, record, storage } = context;
  let state = record?.state ?? (manifest.id === 'finhealth-note' ? { note: '', done: false } : { answers: {} });
  let revision = 0;
  let lastPayload;
  const status = el('p'); status.className = 'save-status visually-hidden'; status.setAttribute('role', 'status');
  const retry = el('button', 'Повторить сохранение'); retry.type = 'button'; retry.hidden = true;
  retry.onclick = () => persist(lastPayload);
  function payload() {
    if (manifest.id === 'finhealth-note') return { state, status: state.done ? 'completed' : state.note ? 'in_progress' : 'not_started', outcome: 'not_applicable' };
    const checked = config.questions.filter(q => state.answers[q.id]?.checked);
    const correct = checked.filter(q => state.answers[q.id].selected === q.correctOptionId).length;
    return { state, status: checked.length === config.questions.length ? 'completed' : Object.keys(state.answers).length ? 'in_progress' : 'not_started',
      outcome: 'not_applicable', score: { earned: correct, possible: config.questions.length } };
  }
  async function persist(value = payload()) {
    lastPayload = structuredClone(value);
    const current = ++revision;
    status.className = 'save-status visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…'; retry.hidden = true;
    try {
      const response = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      status.textContent = response.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.className = 'save-status'; status.setAttribute('role', 'alert'); status.textContent = \`\${error.message} Ваш ввод на месте.\`; retry.hidden = false;
    }
  }
  status.textContent = storage === 'browser' ? 'Ответ сохраняется в этом браузере' : 'Ответ сохраняется до обновления страницы';
  if (context.pending) { status.className = 'save-status'; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; lastPayload = payload(); retry.hidden = false; }
  if (manifest.id === 'finhealth-note') {
    for (const text of config.instructions) el('p', text).className = 'instruction';
    const label = el('label', 'Мой ответ или заметка'); label.htmlFor = 'note';
    const input = el('textarea'); input.id = 'note'; input.rows = 3; input.maxLength = 10000; input.value = state.note;
    input.oninput = () => { state = { ...state, note: input.value }; persist(); };
    const checkLabel = el('label'); checkLabel.className = 'check';
    const check = el('input', '', checkLabel); check.type = 'checkbox'; check.checked = state.done;
    el('span', 'Задание выполнено', checkLabel);
    check.onchange = () => { state = { ...state, done: check.checked }; persist(); };
  } else {
    const progress = el('progress'); progress.className = 'quiz-progress'; progress.max = config.questions.length; progress.setAttribute('aria-label', 'Проверено вопросов');
    const summary = el('p'); summary.className = 'quiz-summary'; summary.setAttribute('role', 'status');
    function refreshSummary() {
      const result = payload();
      const checked = Object.values(state.answers).filter(a => a.checked).length;
      progress.value = checked;
      summary.textContent = result.status === 'completed' ? \`Тренажёр выполнен · правильных ответов \${result.score.earned} из \${result.score.possible}\` : \`Проверено \${checked} из \${config.questions.length}\`;
    }
    refreshSummary();
    config.questions.forEach((question, index) => {
      const card = el('div'); card.className = 'question-card';
      const field = el('fieldset', '', card);
      const legend = el('legend', '', field);
      el('span', \`Вопрос \${index + 1} из \${config.questions.length}\`, legend).className = 'question-number';
      el('span', question.prompt, legend);
      const radios = [];
      for (const option of question.options) {
        const label = el('label', '', field); label.className = 'choice';
        const radio = el('input', '', label); radio.type = 'radio'; radio.name = question.id; radio.value = option.id; radio.checked = state.answers[question.id]?.selected === option.id;
        radios.push(radio); el('span', option.text, label).className = 'choice-text';
        radio.onchange = () => {
          const checked = state.answers[question.id]?.checked;
          state = { answers: { ...state.answers, [question.id]: { selected: option.id, checked: false } } };
          feedback.textContent = checked ? 'Ответ изменён. Проверьте его снова.' : ''; feedback.className = '';
          showFeedback(); refreshSummary(); persist();
        };
      }
      const actions = el('div', '', field); actions.className = 'actions';
      const check = el('button', 'Проверить', actions); check.type = 'button';
      const reset = el('button', 'Сбросить', actions); reset.type = 'button'; reset.className = 'secondary'; reset.hidden = !state.answers[question.id]?.checked;
      const feedback = el('p', '', field); feedback.id = \`feedback-\${index}\`; feedback.setAttribute('role', 'status'); field.setAttribute('aria-describedby', feedback.id);
      function showFeedback() {
        const answer = state.answers[question.id];
        reset.hidden = !answer?.checked;
        for (const radio of radios) {
          const label = radio.parentElement;
          label.classList.toggle('answer-correct', Boolean(answer?.checked && radio.value === question.correctOptionId));
          label.classList.toggle('answer-wrong', Boolean(answer?.checked && radio.checked && radio.value !== question.correctOptionId));
        }
        if (!answer?.checked) return;
        const correct = answer.selected === question.correctOptionId;
        feedback.className = 'visually-hidden';
        feedback.replaceChildren();
        el('strong', correct ? '✓ Верно' : '✕ Пока неверно', feedback);
        if (!correct) el('span', \`Правильный ответ: \${question.options.find(o => o.id === question.correctOptionId).text}\`, feedback);
      }
      showFeedback();
      check.onclick = () => {
        const answer = state.answers[question.id];
        if (!answer) { feedback.textContent = 'Выберите вариант перед проверкой.'; return; }
        state = { answers: { ...state.answers, [question.id]: { ...answer, checked: true } } };
        showFeedback(); refreshSummary(); persist();
      };
      reset.onclick = () => {
        const answers = { ...state.answers }; delete answers[question.id]; state = { answers };
        radios.forEach(radio => { radio.checked = false; }); reset.hidden = true;
        feedback.className = ''; feedback.textContent = ''; showFeedback();
        radios[0].focus(); refreshSummary(); persist();
      };
    });
  }
  // Measure a margin-containing content box, never document scrollHeight (which includes iframe height).
  new ResizeObserver(() => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2)).observe(root);
})();
`,`${r}\n${Se}\n${_?.styles??``}`))}).catch(()=>{n&&T(`Не удалось подготовить оформление упражнения. Повторите запуск.`)}),()=>{n=!1,window.removeEventListener(`message`,u)}},[te,E]),(0,F.jsxs)(`div`,{className:`exercise-module`,children:[w?(0,F.jsx)(`p`,{role:`alert`,children:w}):null,(0,F.jsx)(`iframe`,{ref:d,srcDoc:_||void 0,title:s,"data-exercise-key":e.key,sandbox:M?`allow-scripts allow-modals`:`allow-scripts`,referrerPolicy:`no-referrer`,style:{width:`100%`,height:b,border:0,display:`block`,background:`transparent`}}),w?(0,F.jsx)(`button`,{type:`button`,onClick:()=>D(e=>e+1),children:`Повторить запуск упражнения`}):null]})}function L({className:e=``,variant:t=`primary`,type:n=`button`,...r}){return(0,F.jsx)(`button`,{...r,type:n,className:`fh-button fh-button--${t} ${e}`})}function R({className:e=``,...t}){return(0,F.jsx)(`a`,{...t,className:`fh-button fh-button--primary ${e}`})}var Ye=e=>e?.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase();function Xe(e,t,n=[]){if(t==null)throw Error(`[lucide]: iconNode is required when icon name is used`);return{name:Ye(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}var Ze=e=>{let t=``,n=!1;for(let r of e){if(r===`-`||r===`_`||r<=` `){n=t.length>0;continue}t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1}return t},Qe=e=>{let t=Ze(e);return t.charAt(0).toUpperCase()+t.slice(1)},z=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),B={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`};function $e(e){return e!=null}function et(e,t={}){let n=t.attributeNames??{},r=e=>n[e]??e,i=e.size??e.width??B.width,a=e.size??e.height??B.height,o=e.aliases?.filter(e=>typeof e==`string`&&e.trim()!==``).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],c=t.className?.split(` `).filter(Boolean)??[],l=t.includeDefaultClasses===!1?z(...c):z(`lucide`,...s,...c),u=t.absoluteStrokeWidth?Number(t.strokeWidth??B[`stroke-width`])*Number(e.size??e.width??B.width)/Number(t.size??t.width??B.width):t.strokeWidth??B[`stroke-width`];return[`svg`,{...Object.entries(B).reduce((e,[t,n])=>(e[r(t)]=n,e),{}),...`color`in t&&t.color&&{[r(`stroke`)]:t.color},...`size`in t&&$e(t.size)&&{[r(`width`)]:t.size,[r(`height`)]:t.size},...`width`in t&&$e(t.width)&&{[r(`width`)]:t.width},...`height`in t&&$e(t.height)&&{[r(`height`)]:t.height},[r(`stroke-width`)]:u,...l&&{[r(`class`)]:l},[r(`viewBox`)]:`0 0 ${i} ${a}`,...t.hasA11yProp===!1?{[r(`aria-hidden`)]:`true`}:{},...`attributes`in t&&t.attributes},e.node.map(e=>{let[n,i,a]=e,o=t.nonScalingStroke?{[r(`vector-effect`)]:`non-scaling-stroke`,...i}:i;return a?[n,o,a]:[n,o]})]}function tt(e,t={}){return et(e,{...t,attributeNames:{...t.attributeNames,class:`className`,"stroke-width":`strokeWidth`,"stroke-linecap":`strokeLinecap`,"stroke-linejoin":`strokeLinejoin`,"vector-effect":`vectorEffect`}})}var nt=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},rt=(0,j.createContext)({}),it=()=>(0,j.useContext)(rt),at=(0,j.forwardRef)(({color:e,size:t,width:n,height:r,strokeWidth:i,absoluteStrokeWidth:a,nonScalingStroke:o,className:s=``,children:c,iconNode:l=[],icon:u={node:l,aliases:[],size:24},...d},f)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,nonScalingStroke:g=!1,color:_=`currentColor`,className:v=``}=it()??{},y=!!c||nt(d),[b,x,S=[]]=tt(u,{color:e??_,width:n??t??p,height:r??t??p,strokeWidth:i??m,absoluteStrokeWidth:a??h,nonScalingStroke:o??g,className:z(v,s),hasA11yProp:y,attributes:d});return(0,j.createElement)(b,{ref:f,...x},[...S.map(([e,t])=>(0,j.createElement)(e,t)),...Array.isArray(c)?c:[c]])});function V(e,t=[],n=[]){let r=typeof e==`string`?Xe(e,t,n):e,i=(0,j.forwardRef)(({className:e,...t},n)=>(0,j.createElement)(at,{ref:n,icon:r,className:e,...t}));return r.name&&(i.displayName=Qe(r.name)),i}var ot={name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]};ot.node;var st=V(ot),ct={name:`arrow-up-right`,size:24,node:[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]};ct.node;var lt=V(ct),ut={name:`book-open`,size:24,node:[[`path`,{d:`M12 5v16`,key:`1f6ucr`}],[`path`,{d:`M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,key:`1fyvmf`}]]};ut.node;var dt=V(ut),ft={name:`calendar-days`,size:24,node:[[`path`,{d:`M8 2v3`,key:`1ioesn`}],[`path`,{d:`M16 2v3`,key:`otl347`}],[`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,key:`h1oib`}],[`path`,{d:`M3 9h18`,key:`1pudct`}],[`path`,{d:`M8 13h.01`,key:`1sbv64`}],[`path`,{d:`M12 13h.01`,key:`y0uutt`}],[`path`,{d:`M16 13h.01`,key:`wip0gl`}],[`path`,{d:`M8 17h.01`,key:`p3bg7i`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}],[`path`,{d:`M16 17h.01`,key:`ql8jdd`}]]};ft.node;var H=V(ft),pt={name:`check`,size:24,node:[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]};pt.node;var mt=V(pt),ht={name:`chevron-down`,size:24,node:[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]};ht.node;var gt=V(ht),_t={name:`circle-question-mark`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`help-circle`,`circle-help`]};_t.node;var vt=V(_t),yt={name:`external-link`,size:24,node:[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]};yt.node;var bt=V(yt),xt={name:`file-text`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]};xt.node;var St=V(xt),Ct={name:`layers`,size:24,node:[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]],aliases:[`layers-3`]};Ct.node;var wt=V(Ct),Tt={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};Tt.node;var Et=V(Tt),Dt={name:`list-checks`,size:24,node:[[`path`,{d:`M13 5h8`,key:`a7qcls`}],[`path`,{d:`M13 12h8`,key:`h98zly`}],[`path`,{d:`M13 19h8`,key:`c3s6r1`}],[`path`,{d:`m3 17 2 2 4-4`,key:`1jhpwq`}],[`path`,{d:`m3 7 2 2 4-4`,key:`1obspn`}]]};Dt.node;var U=V(Dt),Ot={name:`minus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]};Ot.node;var kt=V(Ot),At={name:`plus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]};At.node;var W=V(At),jt={name:`star`,size:24,node:[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]};jt.node;var Mt=V(jt),Nt={name:`user-round`,size:24,node:[[`circle`,{cx:`12`,cy:`8`,r:`5`,key:`1hypcn`}],[`path`,{d:`M20 21a8 8 0 0 0-16 0`,key:`rfgkzh`}]],aliases:[`user-2`]};Nt.node;var Pt=V(Nt),Ft={name:`video`,size:24,node:[[`path`,{d:`m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5`,key:`ftymec`}],[`rect`,{x:`2`,y:`6`,width:`14`,height:`12`,rx:`2`,key:`158x01`}]]};Ft.node;var It=V(Ft),Lt={name:`x`,size:24,node:[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]};Lt.node;var Rt=V(Lt);function G({tone:e=`status`,className:t=``,...n}){return(0,F.jsx)(`p`,{...n,role:e===`error`?`alert`:`status`,className:`fh-message fh-message--${e} ${t}`})}function K({label:e,labelAction:t,hint:n,error:r,optional:i,wrapperClassName:a=``,id:o,className:s=``,...c}){let l=(0,j.useId)(),u=o??l,d=[c[`aria-describedby`],n?`${u}-hint`:null,r?`${u}-error`:null].filter(Boolean).join(` `)||void 0,f=(0,F.jsxs)(`label`,{className:`fh-field-label`,htmlFor:u,children:[e,i?(0,F.jsx)(`span`,{className:`muted`,children:`Необязательно`}):null]});return(0,F.jsxs)(`div`,{className:`fh-field ${a}`,children:[t?(0,F.jsxs)(`div`,{className:`fh-field-heading`,children:[f,t]}):f,(0,F.jsx)(`textarea`,{...c,id:u,className:`fh-textarea ${s}`,"aria-invalid":r?!0:c[`aria-invalid`],"aria-describedby":d}),n?(0,F.jsx)(`p`,{className:`fh-field-hint`,id:`${u}-hint`,children:n}):null,r?(0,F.jsx)(G,{tone:`error`,id:`${u}-error`,children:r}):null]})}function zt({legend:e,options:t,value:n,onChange:r,disabled:i=!1}){let a=(0,j.useId)();return(0,F.jsxs)(`fieldset`,{className:`fh-choice-group`,disabled:i,children:[(0,F.jsx)(`legend`,{children:e}),(0,F.jsx)(`div`,{className:`fh-choice-options`,children:t.map(e=>(0,F.jsxs)(`label`,{children:[(0,F.jsx)(`input`,{type:`radio`,name:a,value:e.value,checked:n===e.value,onChange:()=>r(e.value)}),e.label]},e.value))})]})}function Bt({children:e,wrapperClassName:t=``,...n}){return(0,F.jsxs)(`label`,{className:`fh-checkbox ${t}`,children:[(0,F.jsx)(`input`,{...n,type:`checkbox`}),e]})}function q({label:e,children:t,trigger:n,activation:r=`hover-focus`}){let i=(0,j.useId)(),a=(0,j.useRef)(null),o=(0,j.useRef)(null),s=(0,j.useRef)(!1),c=(0,j.useRef)(!1),l=(0,j.useRef)(void 0),[u,d]=(0,j.useState)(!1),[f,p]=(0,j.useState)({left:16,top:16});function m(){clearTimeout(l.current)}function h(){if(m(),!(s.current||!o.current||o.current.matches(`:popover-open`))){s.current=!0;try{o.current.showPopover()}finally{s.current=!1}}}function g(){m(),l.current=setTimeout(()=>{!c.current&&!a.current?.matches(`:focus`)&&!o.current?.contains(document.activeElement)&&o.current?.hidePopover()},180)}(0,j.useEffect)(()=>()=>clearTimeout(l.current),[]);function _(){if(!a.current||!o.current)return;let e=a.current.getBoundingClientRect(),t=o.current.getBoundingClientRect();p({left:Math.max(16,Math.min(e.left,window.innerWidth-t.width-16)),top:Math.max(16,e.bottom+8+t.height>window.innerHeight-16?e.top-t.height-8:e.bottom+8)})}return(0,j.useEffect)(()=>{if(!u)return;function e(e){e.target instanceof Node&&o.current?.contains(e.target)||o.current?.hidePopover()}function t(e){e.key===`Escape`&&o.current?.matches(`:popover-open`)&&(e.preventDefault(),e.stopPropagation(),c.current=!1,o.current.hidePopover())}return window.addEventListener(`keydown`,t,!0),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`keydown`,t,!0),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[u]),(0,F.jsxs)(`div`,{className:`fh-context-hint`,onPointerEnter:e=>{r===`hover-focus`&&e.pointerType===`mouse`&&h()},onPointerLeave:e=>{r===`hover-focus`&&e.pointerType===`mouse`&&g()},onFocus:e=>{if(r!==`hover-focus`||!e.target.matches(`:focus-visible`))return;let t=e.currentTarget;queueMicrotask(()=>{t.contains(document.activeElement)&&h()})},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||g()},children:[(0,F.jsx)(`button`,{ref:a,type:`button`,className:n?`fh-context-trigger`:`fh-context-icon`,"aria-label":e,"aria-expanded":u,"aria-describedby":u?i:void 0,popoverTarget:i,onClick:e=>{e.preventDefault(),m(),c.current&&o.current?.matches(`:popover-open`)?(c.current=!1,o.current.hidePopover()):(c.current=!0,h())},children:n??(0,F.jsx)(vt,{size:16,"aria-hidden":`true`})}),(0,F.jsx)(`div`,{ref:o,id:i,popover:`auto`,className:`fh-context-panel`,style:f,onPointerEnter:m,onPointerLeave:e=>{e.pointerType===`mouse`&&g()},onToggle:e=>{let t=e.newState===`open`;t?_():c.current=!1,d(t)},children:t})]})}var Vt=`button, input, select, textarea, a[href], summary, [tabindex]`,Ht=e=>e.tabIndex>=0&&!e.matches(`:disabled`)&&e.getClientRects().length>0&&getComputedStyle(e).visibility!==`hidden`,Ut=0,Wt=``;function Gt({title:e,subtitle:t,children:n,onRequestClose:r,size:i=`form`,className:a=``,closeLabel:o=`Закрыть`,initialFocusRef:s,returnFocusRef:c,headerActions:l,footer:u,recovery:d,describedBy:f}){let p=(0,j.useRef)(null),m=(0,j.useId)(),h=(0,j.useRef)(typeof document>`u`?null:document.activeElement),g=(0,j.useRef)({initialFocusRef:s,returnFocusRef:c});return g.current={initialFocusRef:s,returnFocusRef:c},(0,j.useLayoutEffect)(()=>{let e=p.current;Ut++===0&&(Wt=document.body.style.overflow,document.body.style.overflow=`hidden`),e.showModal();let t=Array.from(e.querySelectorAll(Vt)).filter(Ht);return(g.current.initialFocusRef?.current??t.find(e=>e.autofocus)??t.find(e=>e.matches(`input, select, textarea`))??t.find(e=>!e.closest(`.fh-modal-header`))??e.querySelector(`h2`))?.focus({preventScroll:!0}),()=>{e.close(),--Ut===0&&(document.body.style.overflow=Wt);let t=g.current.returnFocusRef?.current??h.current,n=Array.from(document.querySelectorAll(`dialog[open]`)).at(-1);(!n||t&&n.contains(t))&&t?.isConnected&&!t.matches(`:disabled`)&&t.focus({preventScroll:!0}),requestAnimationFrame(()=>{document.querySelector(`dialog[open]`)||(!document.activeElement||document.activeElement===document.body)&&(t?.isConnected&&!t.matches(`:disabled`)?t.focus({preventScroll:!0}):document.querySelector(`#screen-title, main h1`)?.focus({preventScroll:!0}))})}},[]),(0,F.jsxs)(`dialog`,{ref:p,className:`fh-modal fh-modal--${i} ${a}`,"aria-labelledby":m,"aria-describedby":f,onCancel:e=>{e.preventDefault(),e.stopPropagation(),r()},onKeyDown:e=>{if(e.defaultPrevented||e.target.closest(`dialog`)!==e.currentTarget)return;let t=e.currentTarget.querySelector(`:popover-open`);if(e.key===`Escape`&&t){e.preventDefault(),e.stopPropagation(),t.hidePopover();return}if(e.key!==`Tab`)return;let n=Array.from(e.currentTarget.querySelectorAll(Vt)).filter(Ht),r=n[0],i=n.at(-1);if(!r){e.preventDefault();return}e.shiftKey&&(document.activeElement===r||!n.includes(document.activeElement))?(e.preventDefault(),i?.focus()):!e.shiftKey&&(document.activeElement===i||!n.includes(document.activeElement))&&(e.preventDefault(),r.focus())},children:[(0,F.jsxs)(`header`,{className:`fh-modal-header`,children:[(0,F.jsxs)(`div`,{children:[t?(0,F.jsx)(`span`,{className:`ux-muted`,children:t}):null,(0,F.jsx)(`h2`,{id:m,tabIndex:-1,children:e})]}),(0,F.jsxs)(`div`,{className:`fh-modal-header-actions`,children:[l,(0,F.jsx)(L,{variant:`secondary`,className:`fh-modal-close`,"aria-label":o,onClick:r,children:(0,F.jsx)(Rt,{size:20})})]})]}),n,u?(0,F.jsx)(J,{children:u}):null,d?(0,F.jsx)(`div`,{className:`fh-modal-recovery`,children:d}):null]})}function Kt({className:e=``,...t}){return(0,F.jsx)(`div`,{...t,className:`fh-form-body ${e}`})}function J({className:e=``,...t}){return(0,F.jsx)(`footer`,{...t,className:`fh-form-actions ${e}`})}function qt({label:e,title:t,description:n,action:r,tone:i=`blue`,headingLevel:a=2,titleId:o}){let s=a===1?`h1`:a===3?`h3`:`h2`,c=Array.isArray(n)?n:n?[n]:[];return(0,F.jsxs)(`header`,{className:`fh-gradient-intro fh-gradient-intro--${i}`,children:[e||r?(0,F.jsxs)(`div`,{className:`fh-gradient-intro__top`,children:[e?(0,F.jsx)(`p`,{className:`fh-gradient-intro__label`,children:e}):null,r?(0,F.jsx)(`div`,{className:`fh-gradient-intro__action`,children:r}):null]}):null,(0,F.jsx)(s,{className:`fh-gradient-intro__title`,id:o,tabIndex:o===`screen-title`?-1:void 0,children:t}),c.map((e,t)=>(0,F.jsx)(`p`,{className:`fh-gradient-intro__description`,children:e},t))]})}function Jt({text:e,marks:t=[]}){return te(e,t).map((e,t)=>{let n=e.text;return e.bold&&(n=(0,F.jsx)(`strong`,{children:n})),e.italic&&(n=(0,F.jsx)(`em`,{children:n})),e.underline&&(n=(0,F.jsx)(`u`,{children:n})),e.tone&&(n=(0,F.jsx)(`span`,{className:`reading-accent reading-accent--${e.tone}`,children:n})),(0,F.jsx)(j.Fragment,{children:n},t)})}var Yt={article:dt,video:It,quiz:U,collection:wt};function Y({format:e,size:t=18}){let n=Yt[e];return(0,F.jsx)(n,{size:t,"aria-hidden":`true`})}function Xt({kind:e}){return(0,F.jsx)(e===`attachment`?St:bt,{size:17,"aria-hidden":`true`,style:{verticalAlign:`text-bottom`,flexShrink:0}})}function Zt({paragraphs:e,layout:t,marks:n=[],resources:r=[],assignment:i=!1,headingLevel:a=i?3:2,titleId:o,introLabel:s,action:c,children:l}){let d=a===1?`h2`:a===3?`h4`:`h3`,f=(0,j.useId)();function p(t,r=e[t],i=e[t].indexOf(r)){let a=n.filter(e=>e.paragraph===t&&e.to>i&&e.from<i+r.length).map(e=>({...e,from:Math.max(0,e.from-i),to:Math.min(r.length,e.to-i)}));return(0,F.jsx)(Jt,{text:r,marks:a})}function m(t){let n=0;return e[t].split(`
`).flatMap(e=>{let t=n;return n+=e.length+1,e.trim()?[{text:e,offset:t}]:[]})}function h(e){return m(e).map((t,n)=>(0,F.jsx)(`li`,{children:p(e,t.text,t.offset)},`${e}-${n}`))}function g(t,n,o=0){let s=e.slice(t.from,t.to+1);if(t.kind===`heading`){let e=`h${Math.min(6,a+1+o)}`;return(0,F.jsx)(e,{className:`reading-heading`,children:p(t.from)},n)}if(t.kind===`group`)return(0,F.jsx)(`section`,{className:`reading-group reading-group--${t.variant} reading-group--${t.tone??(i?`gold`:`blue`)}`,children:t.children.map((e,n)=>g(e,n,o+ +(t.children[0].kind===`heading`&&n>0)))},n);if(t.kind===`items`){let e=t.ordered?`ol`:`ul`;return(0,F.jsx)(e,{className:`reading-list reading-list--structured`,start:t.ordered?t.start:void 0,children:t.children.map((e,t)=>(0,F.jsx)(`li`,{children:g(e,t,o)},t))},n)}if(t.kind===`table`){let e=`${f}-table-${t.from}`,r=(e,t,n)=>(0,F.jsx)(`tr`,{children:e.map((e,n)=>t?(0,F.jsx)(`th`,{scope:`col`,children:e===null?null:p(e)},n):(0,F.jsx)(`td`,{children:e===null?null:p(e)},n))},n);return(0,F.jsx)(`div`,{className:`reading-table-scroll`,role:`region`,"aria-labelledby":e,tabIndex:0,children:(0,F.jsxs)(`table`,{className:`reading-table`,children:[(0,F.jsx)(`caption`,{id:e,className:`reading-sr-only`,children:`Таблица`}),t.header?(0,F.jsx)(`thead`,{children:r(t.rows[0],!0,0)}):null,(0,F.jsx)(`tbody`,{children:t.rows.slice(+!!t.header).map((e,t)=>r(e,!1,t))})]})},n)}return t.kind===`list`?(0,F.jsx)(`ul`,{className:`reading-list`,children:s.flatMap((e,n)=>h(t.from+n))},n):t.kind===`callout`?(0,F.jsx)(`aside`,{className:`reading-callout reading-section--${t.tone??`blue`}`,children:s.map((e,n)=>(0,F.jsx)(`p`,{children:p(t.from+n)},n))},n):t.kind===`steps`?(0,F.jsx)(`ol`,{className:`reading-steps`,children:s.flatMap((e,n)=>{let r=t.from+n,i=m(r);return i.filter((e,t)=>t%2==0).map((e,t)=>{let n=e.text.match(/^(\d+|\p{Extended_Pictographic}\uFE0F?)\s*/u),a=n?e.text.slice(n[0].length):e.text;return(0,F.jsxs)(`li`,{children:[n?(0,F.jsx)(`span`,{className:`reading-step-badge`,children:n[1]}):null,(0,F.jsx)(d,{children:p(r,a,e.offset+(n?.[0].length??0))}),(0,F.jsx)(`p`,{children:p(r,i[t*2+1].text,i[t*2+1].offset)})]},`${r}-${t}`)})})},n):t.kind===`section`?(0,F.jsxs)(`section`,{className:`reading-section reading-section--${t.tone??`blue`}`,children:[(0,F.jsx)(d,{children:p(t.from)}),s.slice(1).map((e,n)=>{let i=t.from+n+1;if(i===t.list)return(0,F.jsx)(`ul`,{className:`reading-list`,children:h(i)},i);let a=i===t.link?.paragraph?r.find(e=>e.id===t.link?.resourceId):void 0;return(0,F.jsx)(`p`,{children:a?.url?(0,F.jsxs)(`a`,{href:a.url,target:`_blank`,rel:`noreferrer`,children:[(0,F.jsx)(Xt,{kind:a.kind}),` `,p(i)]}):p(i)},i)})]},n):(0,F.jsx)(`div`,{className:`reading-${t.kind}`,children:s.map((e,n)=>(0,F.jsx)(`p`,{children:p(t.from+n)},n))},n)}let _=[];for(let e of t)e.kind===`intro`?_.push({intro:e,blocks:[]}):(_.length||_.push({blocks:[]}),_[_.length-1].blocks.push(e));return(0,F.jsx)(`div`,{className:`reading-content${i?` reading-content--assignment`:``}`,children:_.map((t,n)=>{let r=t.intro,d=r?u(e[r.from]):[],f=s??(r?d.filter((e,t)=>t!==r.titleLine).map(e=>e.trim().replace(/[·\s]+$/u,``)).filter(Boolean).join(` · `):``),m=n===_.length-1?l:void 0;return(0,F.jsxs)(`section`,{className:`reading-card`,children:[r?(0,F.jsx)(qt,{label:f,title:p(r.from,d[r.titleLine]),description:e.slice(r.from+1,r.to+1).map((e,t)=>p(r.from+t+1)),tone:i?`sand`:`blue`,headingLevel:n>0&&a===1?2:a,titleId:n===0?o:void 0,action:n===0?c:void 0}):null,t.blocks.length||m?(0,F.jsxs)(`div`,{className:`reading-card__body`,children:[t.blocks.map((e,t)=>g(e,t)),m]}):null]},n)})})}function Qt(e){let t=(0,j.useRef)(null);function n(){t.current&&(t.current.style.height=`auto`,t.current.style.height=`${t.current.scrollHeight+2}px`)}return(0,j.useLayoutEffect)(n,[e.value]),(0,j.useLayoutEffect)(()=>{let e=0,r=!0,i=0,a=()=>{r&&n()},o=new ResizeObserver(t=>{let n=t[0].contentRect.width;e!==n&&(e=n,cancelAnimationFrame(i),i=requestAnimationFrame(a))});return t.current&&o.observe(t.current),document.fonts.ready.then(a),document.fonts.addEventListener(`loadingdone`,a),()=>{r=!1,cancelAnimationFrame(i),o.disconnect(),document.fonts.removeEventListener(`loadingdone`,a)}},[]),(0,F.jsx)(K,{...e,ref:t,rows:2,className:`planner-textarea`})}function $t(e){let t=document.getElementById(e);t?.focus({preventScroll:!0}),t?.scrollIntoView({block:`start`})}function en({assignment:e,content:t,links:n}){let r=t.materials.filter(t=>e.materialIds.includes(t.id));if(!r.length)return e.category?(0,F.jsx)(`span`,{className:`assignment-sources`,children:e.category}):null;let i=r.length===1?I[r[0].format]:`Материалы: ${r.length}`,a=`${e.category?`${e.category} · `:``}${i}`;return(0,F.jsx)(`div`,{className:`assignment-sources`,children:(0,F.jsx)(q,{label:`${a}. Материалы задания «${e.title}»`,trigger:(0,F.jsxs)(F.Fragment,{children:[a,(0,F.jsx)(gt,{size:12,"aria-hidden":`true`})]}),children:(0,F.jsx)(`ul`,{children:r.map(e=>(0,F.jsx)(`li`,{children:(0,F.jsx)(`a`,{href:`${n.month}/material/${e.id}`,children:e.title})},e.id))})})})}function tn({assignment:e,content:t,session:n,dispatch:r,links:i,saveExercise:a,exerciseStorage:o,inPlanner:s=!1}){let c=E(e),l=n.exerciseResults[c.key]?.status===`completed`,u=n.planner.assignmentIds.includes(e.id),f=d(e.readingLayout,e.instructions)&&e.readingLayout[0].kind===`intro`?e.readingLayout:void 0,p=(0,F.jsxs)(L,{variant:`text`,onClick:()=>r({type:`plan-assignment`,id:e.id,added:!u}),children:[f?(0,F.jsx)(u?kt:W,{size:14,"aria-hidden":`true`}):null,u?`Убрать из моих дел`:`В мои дела`]}),m=(0,F.jsxs)(F.Fragment,{children:[s?(0,F.jsx)(en,{assignment:e,content:t,links:i}):null,e.programLinks?.length?(0,F.jsx)(`nav`,{className:`screen-actions`,"aria-label":`Шаги задания «${e.title}»`,children:e.programLinks.map(e=>(0,F.jsxs)(`a`,{href:N(e.monthId)[e.destination],children:[e.label,` →`]},`${e.monthId}/${e.destination}`))}):null,(0,F.jsx)(Je,{pending:!!n.exerciseDrafts[c.key],definition:c,record:n.exerciseDrafts[c.key]??n.exerciseResults[c.key],title:`Упражнение: ${e.title}`,storage:b(c)?o:`session`,save:a??(async(e,t)=>(r({type:`save-exercise`,definition:e,payload:t}),{storage:`session`}))}),s?null:(0,F.jsx)(`a`,{href:i.planner,children:`Открыть мои дела →`})]});return(0,F.jsx)(`article`,{className:`planner-task${s?``:` lesson-assignment`}${f?` planner-task--adapted`:``}${l?` planner-task--done`:``}`,"aria-labelledby":`title-${e.id}`,children:f?(0,F.jsx)(Zt,{paragraphs:e.instructions,layout:f,marks:e.readingMarks,assignment:!0,introLabel:`📌 ${t.month} · Задание`,headingLevel:s?3:2,titleId:`title-${e.id}`,action:p,children:m}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`div`,{className:`assignment-heading`,children:[(0,F.jsx)(`h3`,{id:`title-${e.id}`,children:e.title}),p]}),m]})})}function nn(e){let{session:t,content:n,dispatch:r,links:i}=e,a=t.planner,o=n.assignments??[],s=a.assignmentIds.map(e=>o.find(t=>t.id===e)).filter(e=>!!e),c=s.filter(e=>t.exerciseResults[p(`assignment`,e.id)]?.status===`completed`).length+a.tasks.filter(e=>e.done).length,l=s.length+a.tasks.length,u=a.taskDraft??``,[d,f]=(0,j.useState)(``),[m,h]=(0,j.useState)(``),[g,_]=(0,j.useState)(null),[v,y]=(0,j.useState)(!1),b=a.tasks.find(e=>e.id===g),x=(0,j.useId)(),S=(0,j.useRef)(null),C=(0,j.useRef)(null),w=(0,j.useRef)(new Map);function T(){if(b)try{e.removePersonalTask?e.removePersonalTask(b.id):r({type:`remove-personal-task`,id:b.id});let t=a.tasks.findIndex(e=>e.id===b.id),n=a.tasks[t+1]??a.tasks[t-1];S.current=n?w.current.get(n.id)??C.current:C.current,_(null),y(!1),h(`Дело удалено`)}catch{y(!0)}}function E(e){if(e.preventDefault(),!u.trim()){f(`Напишите, что хотите сделать.`),C.current?.focus();return}if(a.tasks.length>=200){f(`Уже добавлено 200 своих дел. Удалите ненужные, чтобы добавить новое.`);return}r({type:`add-personal-task`,id:crypto.randomUUID(),title:u}),f(``),h(`Дело добавлено.`)}return(0,F.jsxs)(`main`,{className:`product-main hub-page planner-page`,children:[(0,F.jsx)(`a`,{className:`back-link`,href:e.backLink?.href??i.month,children:e.backLink?.label??`← К месяцу`}),(0,F.jsxs)(`header`,{className:`planner-heading`,children:[(0,F.jsx)(`p`,{className:`eyebrow`,children:n.month}),(0,F.jsxs)(`div`,{className:`planner-title-line`,children:[(0,F.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:`Мои дела`}),(0,F.jsxs)(q,{label:`О моих делах`,children:[(0,F.jsx)(`p`,{children:`Выбирайте задания клуба и добавляйте свои дела.`}),(0,F.jsx)(`p`,{children:`Ответы не отправляются в клуб и не проверяются экспертом.`})]})]})]}),(0,F.jsx)(L,{variant:`text`,className:`planner-jump`,onClick:()=>$t(`my-plan`),children:`К списку дел ↓`}),(0,F.jsx)(`section`,{className:`hub-panel planner-focus`,children:(0,F.jsx)(Qt,{label:`Основная цель и приоритеты`,id:`planner-goal`,maxLength:1e4,value:a.goal,placeholder:`Что хочу изменить или сделать в этом месяце`,onChange:e=>r({type:`edit-planner`,field:`goal`,value:e.target.value})})}),(0,F.jsxs)(`div`,{className:`planner-grid planner-context`,children:[(0,F.jsx)(`section`,{className:`hub-panel`,children:(0,F.jsx)(Qt,{label:`Важные даты`,id:`planner-dates`,maxLength:1e4,value:a.dates,placeholder:`Платежи, встречи, личные сроки`,onChange:e=>r({type:`edit-planner`,field:`dates`,value:e.target.value})})}),(0,F.jsx)(`section`,{className:`hub-panel`,children:(0,F.jsx)(Qt,{label:`Идеи и мысли`,id:`planner-ideas`,maxLength:1e4,value:a.ideas,placeholder:`Что хочется попробовать или обдумать`,onChange:e=>r({type:`edit-planner`,field:`ideas`,value:e.target.value})})})]}),(0,F.jsxs)(`div`,{className:`planner-grid planner-work`,children:[(0,F.jsxs)(`section`,{className:`hub-panel planner-catalog`,"aria-labelledby":`club-tasks`,children:[(0,F.jsxs)(`div`,{className:`planner-title-line`,children:[(0,F.jsx)(`h2`,{id:`club-tasks`,children:`Из клуба`}),(0,F.jsxs)(q,{label:`О заданиях в моих делах`,children:[(0,F.jsx)(`p`,{children:`Добавляйте в свои дела то, что подходит вам сейчас.`}),(0,F.jsx)(`p`,{children:`Ответ и отметка общие для всех материалов этого месяца, связанных с заданием. Если убрать задание из моих дел, они сохранятся.`})]})]}),o.length?(0,F.jsx)(`ul`,{className:`planner-list`,children:o.map(e=>{let o=a.assignmentIds.includes(e.id);return(0,F.jsx)(`li`,{children:(0,F.jsxs)(`article`,{className:`planner-catalog-row`,children:[(0,F.jsxs)(`div`,{className:`planner-catalog-copy`,children:[(0,F.jsx)(`h3`,{children:e.title}),(0,F.jsx)(en,{assignment:e,content:n,links:i}),t.exerciseResults[p(`assignment`,e.id)]?.status===`completed`?(0,F.jsx)(`span`,{className:`planner-completed`,children:`Выполнено`}):null]}),(0,F.jsx)(L,{className:`planner-catalog-add`,disabled:o,onClick:()=>{r({type:`plan-assignment`,id:e.id,added:!0}),h(`Добавлено в мои дела: ${e.title}`)},children:o?`В моих делах`:(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(W,{size:14,"aria-hidden":`true`}),`В мои дела`]})})]})},e.id)})}):(0,F.jsx)(`p`,{children:`Задания клуба пока не добавлены. Можно начать со своих дел.`})]}),(0,F.jsxs)(`section`,{className:`hub-panel planner-own`,"aria-labelledby":`my-plan`,children:[(0,F.jsxs)(`div`,{className:`planner-section-heading`,children:[(0,F.jsx)(`h2`,{id:`my-plan`,tabIndex:-1,children:`Мои дела`}),l?(0,F.jsxs)(`span`,{className:`planner-count`,children:[c,` из `,l,` выполнено`]}):null]}),(0,F.jsx)(L,{variant:`text`,className:`planner-jump`,onClick:()=>$t(`screen-title`),children:`К цели и заметкам ↑`}),(0,F.jsxs)(`form`,{className:`planner-add`,onSubmit:E,children:[(0,F.jsx)(`label`,{htmlFor:`personal-task-title`,children:`Своё дело`}),(0,F.jsx)(`input`,{ref:C,id:`personal-task-title`,className:`planner-input`,value:u,maxLength:300,placeholder:`Что хочу сделать`,"aria-invalid":!!d,"aria-describedby":d?`personal-task-error`:void 0,onChange:e=>{r({type:`edit-planner`,field:`taskDraft`,value:e.target.value}),f(``)}}),(0,F.jsx)(L,{type:`submit`,children:`Добавить дело`}),d?(0,F.jsx)(`p`,{id:`personal-task-error`,role:`alert`,children:d}):null]}),(0,F.jsx)(`p`,{className:`planner-announcement`,role:`status`,children:m}),l?null:(0,F.jsx)(`p`,{className:`planner-empty`,children:`Дел пока нет.`}),s.map(t=>(0,F.jsx)(tn,{...e,assignment:t,inPlanner:!0},t.id)),a.tasks.map(e=>(0,F.jsxs)(`article`,{className:`planner-task${e.done?` planner-task--done`:``}`,"aria-label":`Своё дело: ${e.title}`,tabIndex:-1,ref:t=>{t?w.current.set(e.id,t):w.current.delete(e.id)},children:[(0,F.jsx)(`p`,{className:`eyebrow`,children:`Моё дело`}),(0,F.jsx)(`h3`,{children:e.title}),(0,F.jsx)(K,{id:`personal-${e.id}`,label:`Заметка к делу`,rows:2,maxLength:1e4,value:e.note,onChange:t=>r({type:`edit-personal-task`,id:e.id,patch:{note:t.target.value}})}),(0,F.jsx)(Bt,{checked:e.done,onChange:t=>r({type:`edit-personal-task`,id:e.id,patch:{done:t.target.checked}}),children:`Дело выполнено`}),(0,F.jsx)(L,{variant:`text`,onClick:t=>{S.current=t.currentTarget,_(e.id),y(!1),h(``)},children:`Удалить своё дело`})]},e.id))]})]}),(0,F.jsxs)(`section`,{className:`hub-panel planner-totals`,"aria-labelledby":`planner-totals`,children:[(0,F.jsx)(`h2`,{id:`planner-totals`,children:`Личные итоги месяца`}),(0,F.jsxs)(`h3`,{className:`planner-money-heading`,children:[`Деньги `,(0,F.jsx)(`span`,{className:`planner-manual-label`,children:`Вручную`})]}),(0,F.jsx)(`div`,{className:`planner-amounts`,children:[{field:`earned`,label:`Заработано`},{field:`spent`,label:`Потрачено`},{field:`invested`,label:`Отложено / инвестировано`}].map(({field:e,label:t})=>(0,F.jsxs)(`label`,{htmlFor:`planner-${e}`,children:[t,(0,F.jsx)(`input`,{className:`planner-input`,id:`planner-${e}`,inputMode:`decimal`,maxLength:50,value:a[e],placeholder:`Сумма`,onChange:t=>r({type:`edit-planner`,field:e,value:t.target.value})})]},e))}),(0,F.jsx)(zt,{legend:`Моя финансовая удовлетворённость`,value:a.satisfaction,options:[`1`,`2`,`3`,`4`,`5`].map(e=>({value:e,label:e})),onChange:e=>r({type:`edit-planner`,field:`satisfaction`,value:e})}),(0,F.jsxs)(`div`,{className:`planner-rating-hint`,children:[(0,F.jsx)(`span`,{className:`muted`,children:`1 — совсем не доволен · 5 — полностью доволен`}),a.satisfaction?(0,F.jsx)(L,{variant:`text`,onClick:()=>r({type:`edit-planner`,field:`satisfaction`,value:``}),children:`Снять оценку`}):null]})]}),(0,F.jsx)(`div`,{className:`screen-actions`,children:(0,F.jsx)(R,{href:e.backLink?.href??i.month,children:e.backLink?.label??`Вернуться к месяцу`})}),b?(0,F.jsxs)(Gt,{title:`Удалить дело?`,size:`compact`,describedBy:x,returnFocusRef:S,onRequestClose:()=>_(null),children:[(0,F.jsxs)(Kt,{children:[(0,F.jsxs)(`div`,{id:x,className:`planner-delete-description`,children:[(0,F.jsxs)(`p`,{children:[`«`,b.title,`»`]}),(0,F.jsx)(`p`,{children:b.note?`Заметка и отметка выполнения тоже будут удалены.`:`Отметка выполнения тоже будет удалена.`})]}),v?(0,F.jsx)(G,{tone:`error`,children:`Не удалось удалить дело`}):null]}),(0,F.jsxs)(J,{children:[(0,F.jsx)(L,{variant:`secondary`,autoFocus:!0,onClick:()=>_(null),children:`Оставить дело`}),(0,F.jsx)(L,{variant:`secondary`,className:`ux-danger-text`,onClick:T,children:v?`Повторить`:`Удалить дело`})]})]}):null]})}function rn(e,t){if(t?.state===`upcoming`||t?.state===`live`)return t.joinUrl?{kind:`live`,url:t.joinUrl}:{kind:`unavailable`};if(t?.state===`recording-pending`)return{kind:`pending`};let n=e.recording;return n?.status===`available`&&n.embedUrl?{kind:`recording`,embedUrl:n.embedUrl}:n&&n.status!==`unavailable`&&e.originalUrl?{kind:`original`,url:e.originalUrl}:{kind:n||t?.state===`recorded`?`unavailable`:`none`}}var an=`finhealth.material-favorites.v1`,on={read:()=>localStorage.getItem(an),write:e=>localStorage.setItem(an,e)};function sn(){let e=null;return{read:()=>e,write:t=>{e=t}}}function cn(e){if(e===null)return[];let t=JSON.parse(e);if(t?.version!==1||!Array.isArray(t.ids)||t.ids.length>1e4||t.ids.some(e=>typeof e!=`string`||!/^\d{4}-(0[1-9]|1[0-2])\/[a-zA-Z0-9_-]+$/.test(e))||new Set(t.ids).size!==t.ids.length)throw Error(`Invalid favorites`);return t.ids}function ln(e){let t={ids:[],error:``},n=new Set,r=()=>n.forEach(e=>e());function i(){try{t={ids:cn(e.read()),error:``}}catch{t={...t,error:`Не удалось прочитать избранное. Прежние записи не перезаписаны. Проверьте доступ к хранилищу браузера и повторите.`}}r()}return i(),{getSnapshot:()=>t,subscribe:e=>(n.add(e),()=>{n.delete(e)}),reload:i,toggle(n){try{let r=cn(e.read()),i=r.includes(n)?r.filter(e=>e!==n):[...r,n],a=JSON.stringify({version:1,ids:i});cn(a),e.write(a),t={ids:i,error:``}}catch{t={...t,error:`Не удалось изменить избранное. Прежние звёзды сохранены. Проверьте хранилище браузера и повторите нажатие.`}}return r(),!t.error}}}var un=ln(sn()),dn=(0,j.createContext)(un),fn=(0,j.createContext)(``);function pn({persist:e,children:t}){let[n]=(0,j.useState)(()=>ln(e?on:sn()));return(0,j.useEffect)(()=>{if(!e)return;let t=e=>{(e.key===`finhealth.material-favorites.v1`||e.key===null)&&n.reload()};return window.addEventListener(`storage`,t),()=>window.removeEventListener(`storage`,t)},[e,n]),(0,F.jsx)(dn.Provider,{value:n,children:t})}function mn({id:e,children:t}){return(0,F.jsx)(fn.Provider,{value:e,children:t})}function hn(){let e=(0,j.useContext)(dn);return{...(0,j.useSyncExternalStore)(e.subscribe,e.getSnapshot),store:e}}function gn(){let{error:e,store:t}=hn();return e?(0,F.jsxs)(`p`,{className:`material-favorite-error`,role:`alert`,children:[e,` `,(0,F.jsx)(`button`,{type:`button`,onClick:t.reload,children:`Повторить чтение`})]}):null}function _n({materialId:e,title:t,monthId:n,onChange:r}){let i=(0,j.useContext)(fn),{ids:a,store:o}=hn(),s=pe(n??i,e),c=a.includes(s);return(0,F.jsx)(`button`,{type:`button`,className:`material-favorite${c?` is-favorite`:``}`,"aria-pressed":c,"aria-label":`${c?`Убрать из избранного`:`В избранное`}: ${t}`,title:c?`Убрать из избранного`:`В избранное`,onClick:()=>{o.toggle(s)&&r?.()},children:(0,F.jsx)(Mt,{size:22,"aria-hidden":`true`,fill:c?`currentColor`:`none`})})}function vn({material:e,content:t,links:n,backLink:r,titleInIntro:i=!1}){return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`div`,{className:`study-toolbar`,children:[(0,F.jsx)(`a`,{className:`back-link`,href:r?.href??n.month,children:r?.label??`← К месяцу`}),(0,F.jsx)(_n,{materialId:e.id,title:e.title})]}),i?null:(0,F.jsxs)(`div`,{className:`study-title`,children:[(0,F.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:e.title}),e.quiz?(0,F.jsx)(q,{label:`Как пройти тренажёр`,children:(0,F.jsx)(`p`,{children:`Выберите и проверьте каждый ответ. Ошибки не мешают завершению. Изменение ответа снимает его проверку.`})}):null]}),(0,F.jsxs)(`p`,{className:`muted study-meta`,children:[(0,F.jsx)(Y,{format:e.format}),` `,[I[e.format],e.author,t.month,e.minutes&&`${e.minutes} минут`].filter(Boolean).join(` · `)]}),!e.recording&&e.originalUrl&&!d(e.readingLayout,e.paragraphs,e.resources.map(e=>e.id))?(0,F.jsx)(`p`,{children:(0,F.jsx)(`a`,{href:e.originalUrl,target:`_blank`,rel:`noreferrer`,children:`Открыть оригинальный урок ↗`})}):null]})}function yn(e){let{material:t,content:n}=e,r=n.assignments?.filter(e=>e.materialIds.includes(t.id))??[],i=r.length===1&&d(r[0].readingLayout,r[0].instructions)&&r[0].readingLayout[0].kind===`intro`;return r.length?(0,F.jsxs)(`section`,{className:`material-note`,children:[i?null:(0,F.jsxs)(`div`,{className:`compact-title`,children:[(0,F.jsx)(`h2`,{children:`Задания`}),(0,F.jsxs)(q,{label:`О заданиях`,children:[(0,F.jsx)(`p`,{children:`Ответы не отправляются на проверку.`}),(0,F.jsx)(`p`,{children:`Ответ и выполнение общие для всех связанных материалов месяца. Удаление из плана их не стирает.`})]})]}),r.map(t=>(0,F.jsx)(tn,{...e,assignment:t},t.id))]}):null}function bn({material:e,compact:t=!1,exclude:n=[]}){let r=e.resources.filter(r=>!n.includes(r.id)&&(!t||r.status!==`unavailable`&&(r.url!==e.originalUrl||r.kind===`attachment`)));return r.length?(0,F.jsxs)(`section`,{className:`material-resources`,children:[(0,F.jsx)(`h2`,{children:`Связанные материалы`}),(0,F.jsx)(`ul`,{children:r.map(e=>(0,F.jsxs)(`li`,{children:[(0,F.jsxs)(`div`,{children:[t?(0,F.jsxs)(`div`,{className:`compact-title`,children:[(0,F.jsx)(`h3`,{children:e.title}),e.description?(0,F.jsx)(q,{label:`О материале «${e.title}»`,children:(0,F.jsx)(`p`,{children:e.description})}):null]}):(0,F.jsx)(`h3`,{children:e.title}),!t&&e.description?(0,F.jsx)(`p`,{children:e.description}):null,e.status===`available`?null:(0,F.jsx)(`p`,{className:`muted`,children:e.status===`unavailable`?`Недоступно`:`Доступно через оригинал`})]}),e.url&&(!t||e.status!==`unavailable`)?(0,F.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,children:[(0,F.jsx)(Xt,{kind:e.kind}),` `,e.kind===`attachment`&&e.status===`available`?e.url.endsWith(`.pdf`)?`Открыть PDF`:`Скачать файл`:`К источнику`,` ↗`]}):null]},e.id))})]}):null}function xn({material:e,event:t,adapted:n=!1}){let r=rn(e,t);if(r.kind===`none`)return null;let i=t?.title&&t.title!==e.title?t.title:r.kind===`live`?`Встреча`:`Запись встречи`;return(0,F.jsxs)(`section`,{className:`recording`,"aria-label":i,children:[(0,F.jsx)(`h2`,{children:i}),t?(0,F.jsxs)(`div`,{className:`meeting-meta`,children:[(0,F.jsxs)(`p`,{children:[(0,F.jsx)(H,{size:17,"aria-hidden":`true`}),t.date]}),(0,F.jsxs)(`p`,{children:[(0,F.jsx)(Pt,{size:17,"aria-hidden":`true`}),t.host]})]}):null,r.kind===`recording`?(0,F.jsx)(`iframe`,{src:r.embedUrl,title:`Запись: ${e.title}`,allow:`autoplay; fullscreen; picture-in-picture; encrypted-media`,allowFullScreen:!0}):r.kind===`live`?(0,F.jsx)(R,{href:r.url,target:`_blank`,rel:`noreferrer`,children:`Подключиться к встрече ↗`}):r.kind===`pending`?(0,F.jsx)(`p`,{role:`status`,children:`Запись готовится`}):r.kind===`original`?(0,F.jsx)(R,{href:r.url,target:`_blank`,rel:`noreferrer`,children:`Смотреть запись в оригинале ↗`}):(0,F.jsx)(`p`,{className:`muted`,children:`Запись пока недоступна.`}),n?e.resources.filter(e=>e.kind===`attachment`&&e.status!==`unavailable`&&e.url).map(e=>(0,F.jsxs)(`a`,{className:`recording-attachment`,href:e.url,target:`_blank`,rel:`noreferrer`,children:[(0,F.jsx)(St,{size:22,"aria-hidden":`true`}),(0,F.jsx)(`span`,{children:e.title}),(0,F.jsxs)(`span`,{className:`muted`,children:[e.status===`original`?`В исходном уроке`:e.url.endsWith(`.pdf`)?`PDF`:`Файл`,` ↗`]})]},e.id)):null]})}function Sn(e){let{material:t,session:n,dispatch:r,links:i}=e,a=!!n.materials[t.id]?.viewed,o=d(t.readingLayout,t.paragraphs,t.resources.map(e=>e.id))?t.readingLayout:void 0,s=o?.[0],c=s?.kind===`intro`&&u(t.paragraphs[s.from])[s.titleLine].localeCompare(t.title,`ru`,{sensitivity:`base`})===0,l=e.content.events?.find(e=>e.materialId===t.id),f=o?.flatMap(e=>e.kind===`section`&&e.link?[e.link.resourceId]:[])??[],p=o&&rn(t,l).kind!==`none`?t.resources.filter(e=>e.kind===`attachment`&&e.status!==`unavailable`&&e.url).map(e=>e.id):[];return(0,F.jsxs)(`main`,{className:`product-main reading-page${o?` adapted-material`:``}`,children:[(0,F.jsx)(vn,{...e,titleInIntro:c}),o?null:(0,F.jsx)(xn,{material:t,event:l},t.id),t.contentStatus===`unavailable`?(0,F.jsx)(`p`,{role:`status`,children:`Учебное содержание в исходной странице отсутствует.`}):null,o?(0,F.jsx)(Zt,{paragraphs:t.paragraphs,layout:o,marks:t.readingMarks,resources:t.resources,headingLevel:c?1:2,titleId:c?`screen-title`:void 0}):(0,F.jsx)(`div`,{className:`material-body`,children:t.paragraphs.map((e,t)=>(0,F.jsx)(`p`,{className:`user-text`,children:e},t))}),o?(0,F.jsx)(xn,{material:t,event:l,adapted:!0},t.id):null,(0,F.jsx)(bn,{material:t,compact:!!o,exclude:[...f,...p]}),(0,F.jsx)(yn,{...e}),(0,F.jsxs)(`div`,{className:`screen-actions`,children:[t.contentStatus===`unavailable`?null:(0,F.jsx)(L,{disabled:a,onClick:()=>r({type:`view-material`,materialId:t.id}),children:a?`Просмотрено`:`Отметить как просмотренное`}),(0,F.jsxs)(`a`,{href:e.backLink?.href??i.month,children:[e.backLink?`К результатам поиска`:`К материалам месяца`,` →`]})]}),(0,F.jsx)(`span`,{className:`visually-hidden`,role:`status`,children:a?`Просмотр отмечен.`:``})]})}function Cn(e){let{material:t,session:n,dispatch:r,links:i}=e,a=y(t);return(0,F.jsxs)(`main`,{className:`product-main reading-page quiz-page`,children:[(0,F.jsx)(vn,{...e}),(0,F.jsx)(_e,{paragraphs:t.paragraphs}),(0,F.jsx)(Je,{pending:!!n.exerciseDrafts[a.key],definition:a,record:n.exerciseDrafts[a.key]??n.exerciseResults[a.key],title:`Тренажёр: ${t.title}`,save:e.saveExercise??(async(e,t)=>(r({type:`save-exercise`,definition:e,payload:t}),{storage:`session`}))}),(0,F.jsx)(bn,{material:t}),(0,F.jsx)(yn,{...e}),(0,F.jsxs)(`div`,{className:`screen-actions`,children:[(0,F.jsx)(R,{href:i.month,children:`К месяцу`}),(0,F.jsx)(`a`,{href:i.reflection,children:`Личный вывод`})]})]})}function X({name:e}){let t={arrow:(0,F.jsx)(F.Fragment,{children:(0,F.jsx)(`path`,{d:`M4 12h15M13 6l6 6-6 6`})}),chevron:(0,F.jsx)(`path`,{d:`m6 9 6 6 6-6`}),file:(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`path`,{d:`M6 3h8l4 4v14H6z`}),(0,F.jsx)(`path`,{d:`M14 3v5h4`})]}),download:(0,F.jsx)(F.Fragment,{children:(0,F.jsx)(`path`,{d:`M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4`})})};return(0,F.jsx)(`svg`,{className:`icon icon--${e}`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,focusable:`false`,children:t[e]})}function Z({children:e,message:t}){let[n,r]=(0,j.useState)(!1),i=(0,j.useId)();return(0,F.jsxs)(`div`,{className:`boundary`,children:[(0,F.jsx)(L,{variant:`text`,onClick:()=>r(e=>!e),"aria-expanded":n,"aria-controls":n?i:void 0,children:e}),n?(0,F.jsx)(G,{id:i,children:t}):null]})}function wn({label:e,labelAction:t,hint:n,error:r,wrapperClassName:i=``,id:a,className:o=``,...s}){let c=(0,j.useId)(),l=a??c,u=[s[`aria-describedby`],n?`${l}-hint`:null,r?`${l}-error`:null].filter(Boolean).join(` `)||void 0;return(0,F.jsxs)(`div`,{className:`fh-field ${i}`,children:[(0,F.jsxs)(`div`,{className:`fh-field-heading`,children:[(0,F.jsx)(`label`,{className:`fh-field-label`,htmlFor:l,children:e}),t]}),(0,F.jsx)(`input`,{...s,id:l,className:`fh-input ${o}`,"aria-describedby":u,"aria-invalid":r?!0:s[`aria-invalid`]}),n?(0,F.jsx)(`p`,{className:`fh-field-hint`,id:`${l}-hint`,children:n}):null,r?(0,F.jsx)(G,{tone:`error`,id:`${l}-error`,children:r}):null]})}function Tn({month:e,value:t,onChange:n,onSubmit:r,onClose:i,error:a}){return(0,F.jsx)(Gt,{title:`Новое дело · ${e.toLocaleLowerCase(`ru`)}`,size:`compact`,onRequestClose:i,children:(0,F.jsxs)(`form`,{onSubmit:r,noValidate:!0,children:[(0,F.jsx)(Kt,{children:(0,F.jsx)(wn,{label:`Что хочу сделать`,autoFocus:!0,maxLength:300,value:t,onChange:e=>n(e.target.value),error:a||void 0})}),(0,F.jsxs)(J,{children:[(0,F.jsx)(L,{variant:`secondary`,onClick:i,children:`Отменить`}),(0,F.jsx)(L,{type:`submit`,children:`Добавить дело`})]})]})})}function En({children:e,href:t,onClick:n}){let r=(0,F.jsxs)(F.Fragment,{children:[e,(0,F.jsx)(st,{size:14,"aria-hidden":`true`})]});return t?(0,F.jsx)(`a`,{className:`widget-page-link`,href:t,children:r}):(0,F.jsx)(`button`,{type:`button`,className:`widget-page-link`,onClick:n,children:r})}var Dn={calendar:`finhealth.widget-expanded.v1.calendar`,planner:`finhealth.widget-expanded.v1.planner`},On=()=>typeof window>`u`?void 0:window.localStorage;function kn(e,t=On){let n=e!==`calendar`;try{let r=t()?.getItem(Dn[e]);return r===`true`||r!==`false`&&n}catch{return n}}function An(e,t,n=On){try{let r=n();return r?(r.setItem(Dn[e],String(t)),!0):!1}catch{return!1}}function jn(e,t=!0){let[n,r]=(0,j.useState)(()=>t?kn(e):!1),[i,a]=(0,j.useState)(!1);function o(){let i=!n;r(i),a(t&&!An(e,i))}return{isOpen:n,toggle:o,storageError:i}}function Mn({text:e}){let[t,n]=(0,j.useState)(!1),r=e.length>200;return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{className:`planner-widget-text`,children:r&&!t?`${e.slice(0,180).trimEnd()}…`:e}),r?(0,F.jsx)(`button`,{type:`button`,className:`planner-widget-link`,"aria-expanded":t,onClick:()=>n(e=>!e),children:t?`Свернуть`:`Показать полностью`}):null]})}function Nn({assignment:e,session:t,dispatch:n,saveExercise:r,plannerHref:i}){let a=E(e),o=t.exerciseResults[a.key],c=t.exerciseDrafts[a.key],[l,u]=(0,j.useState)(!1),[d,f]=(0,j.useState)(null),p=m(a.manifest,s)&&(!o||m(o.manifest,a.manifest))&&(!c||m(c.manifest,a.manifest)),h=o?.status===`completed`;async function g(e){u(!0);try{let t=w({..._(c??o),done:e});r?await r(a,t):n({type:`save-exercise`,definition:a,payload:t}),f(null)}catch{f(e)}finally{u(!1)}}return(0,F.jsxs)(`li`,{className:`planner-widget-club-task`,children:[(0,F.jsxs)(`div`,{className:`planner-widget-task${h?` is-done`:``}`,children:[p?(0,F.jsx)(`input`,{type:`checkbox`,"aria-label":e.title,checked:h,disabled:l,onChange:e=>void g(e.target.checked)}):h?(0,F.jsx)(mt,{size:17,"aria-label":`Выполнено`}):null,(0,F.jsx)(`a`,{href:i,children:e.title})]}),l?(0,F.jsx)(`p`,{className:`planner-widget-notice`,role:`status`,children:`Сохраняем отметку…`}):p&&(d!==null||c)?(0,F.jsxs)(`p`,{className:`planner-widget-error`,role:`alert`,children:[`Изменения задания не сохранены. `,(0,F.jsx)(`button`,{type:`button`,onClick:()=>void g(d??_(c).done),children:`Повторить сохранение`})]}):null]})}function Pn({content:e,session:t,dispatch:n,plannerHref:r,saveExercise:i,className:a=``,variant:o=`full`}){let s=(0,j.useId)(),{isOpen:c,toggle:l,storageError:u}=jn(`planner`),d=o===`calendar`,f=o!==`full`,p=t.planner,m=e.assignments??[],h=p.assignmentIds.flatMap(e=>{let t=m.find(t=>t.id===e);return t?[t]:[]}),[g]=(0,j.useState)(()=>m.filter(e=>!p.assignmentIds.includes(e.id)).slice(0,2).map(e=>e.id)),_=m.filter(e=>g.includes(e.id)),[v,y]=(0,j.useState)(!1),[b,x]=(0,j.useState)(!1),[S,C]=(0,j.useState)(``),[w,T]=(0,j.useState)(``),D=h.length+p.tasks.length,ee=h.filter(e=>t.exerciseResults[E(e).key]?.status===`completed`).length+p.tasks.filter(e=>e.done).length,O=d||v?h:h.slice(0,3),k=d||v?p.tasks:p.tasks.slice(0,Math.max(0,3-O.length)),A=[[`earned`,`Заработано`],[`spent`,`Потрачено`],[`invested`,`Отложено / инвестировано`]].filter(([e])=>p[e].trim()),te=A.length>0||!!p.satisfaction;function M(e){if(e.preventDefault(),!p.taskDraft?.trim()){C(`Напишите, что хотите сделать.`);return}if(p.tasks.length>=200){C(`Уже добавлено 200 своих дел. Удалите ненужные, чтобы добавить новое.`);return}n({type:`add-personal-task`,id:crypto.randomUUID(),title:p.taskDraft}),y(!0),x(!1),C(``),T(`Дело добавлено.`)}let ne=(0,F.jsxs)(`a`,{className:`planner-widget-link`,href:r,children:[`Все дела`,(0,F.jsx)(lt,{size:15,"aria-hidden":`true`})]});return(0,F.jsxs)(`section`,{className:`planner-widget${d?` planner-widget-in-calendar`:``} ${a}`,"aria-labelledby":`${s}-title`,children:[(0,F.jsx)(`header`,{className:`planner-widget-header`,children:(0,F.jsx)(`h2`,{className:`widget-heading`,id:`${s}-title`,children:f?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(U,{className:`widget-heading-icon`,size:20,"aria-hidden":`true`}),`Мои дела`]}):(0,F.jsxs)(`button`,{type:`button`,className:`widget-toggle`,"aria-expanded":c,"aria-controls":`${s}-body`,onClick:l,children:[(0,F.jsx)(U,{className:`widget-heading-icon`,size:20,"aria-hidden":`true`}),(0,F.jsx)(`span`,{children:`Мои дела`}),(0,F.jsx)(gt,{className:`widget-toggle-chevron`,size:18,"aria-hidden":`true`})]})})}),d?(0,F.jsx)(`p`,{className:`planner-widget-month planner-widget-calendar-month`,children:e.month}):null,!f&&u?(0,F.jsx)(`p`,{className:`widget-storage-error`,role:`status`,children:`Не удалось запомнить вид списка дел. Попробуйте переключить ещё раз.`}):null,(0,F.jsxs)(`div`,{id:`${s}-body`,className:`widget-disclosure-body`,hidden:!f&&!c,children:[d?null:(0,F.jsxs)(`div`,{className:`planner-widget-meta`,children:[(0,F.jsxs)(`div`,{className:`planner-widget-title`,children:[(0,F.jsx)(`p`,{className:`planner-widget-month`,children:e.month}),f?null:(0,F.jsx)(q,{label:`О моих делах`,children:(0,F.jsx)(`p`,{children:`Добавляйте свои дела и выбирайте задания клуба. Бинго и тренажёры выполняются внутри задания.`})})]}),ne]}),!f&&p.goal.trim()?(0,F.jsxs)(`div`,{className:`planner-widget-goal`,children:[(0,F.jsx)(`h3`,{children:`Цель месяца`}),(0,F.jsx)(Mn,{text:p.goal})]}):null,!f&&(p.dates.trim()||p.ideas.trim())?(0,F.jsxs)(`div`,{className:`planner-widget-context`,children:[p.dates.trim()?(0,F.jsxs)(`div`,{children:[(0,F.jsxs)(`h3`,{children:[(0,F.jsx)(H,{size:14,"aria-hidden":`true`}),`Важные даты`]}),(0,F.jsx)(Mn,{text:p.dates})]}):null,p.ideas.trim()?(0,F.jsxs)(`div`,{children:[(0,F.jsxs)(`h3`,{children:[(0,F.jsx)(Et,{size:14,"aria-hidden":`true`}),`Мысли`]}),(0,F.jsx)(Mn,{text:p.ideas})]}):null]}):null,(0,F.jsxs)(`div`,{className:`planner-widget-work`,children:[(0,F.jsxs)(`div`,{className:`planner-widget-section-title`,children:[f?null:(0,F.jsx)(`h3`,{children:`Мои дела`}),D?(0,F.jsxs)(`span`,{children:[ee,` из `,D,` выполнено`]}):null]}),D?(0,F.jsxs)(`ul`,{className:`planner-widget-tasks`,children:[O.map(e=>(0,F.jsx)(Nn,{assignment:e,session:t,dispatch:n,saveExercise:i,plannerHref:r},e.id)),k.map(e=>(0,F.jsx)(`li`,{children:(0,F.jsxs)(`label`,{className:`planner-widget-task${e.done?` is-done`:``}`,children:[(0,F.jsx)(`input`,{type:`checkbox`,checked:e.done,onChange:t=>n({type:`edit-personal-task`,id:e.id,patch:{done:t.target.checked}})}),(0,F.jsx)(`span`,{children:e.title})]})},e.id))]}):(0,F.jsx)(`p`,{className:`planner-widget-empty`,children:d?(0,F.jsx)(`a`,{href:`${r}?section=tasks`,children:`Дел пока нет.`}):`Дел пока нет.`}),!d&&D>3&&(!f||!v)?(0,F.jsx)(`button`,{type:`button`,className:`planner-widget-link`,"aria-expanded":v,onClick:()=>y(e=>!e),children:v?`Свернуть список`:`Ещё ${D-3}`}):null]}),!f&&_.length?(0,F.jsxs)(`div`,{className:`planner-widget-suggestions`,children:[(0,F.jsx)(`h3`,{children:`Можно взять из клуба`}),_.map(e=>{let t=p.assignmentIds.includes(e.id);return(0,F.jsxs)(`button`,{type:`button`,disabled:t,"aria-label":`${t?`В моих делах`:`В мои дела`}: ${e.title}`,onClick:()=>{n({type:`plan-assignment`,id:e.id,added:!0}),y(!0),T(`Добавлено в мои дела: ${e.title}`)},children:[(0,F.jsx)(`span`,{children:e.title}),(0,F.jsxs)(`span`,{className:`planner-widget-offer-action`,children:[t?(0,F.jsx)(mt,{size:14,"aria-hidden":`true`}):(0,F.jsx)(W,{size:14,"aria-hidden":`true`}),t?`В моих делах`:`В мои дела`]})]},e.id)})]}):null,!f&&te?(0,F.jsxs)(`section`,{className:`planner-widget-totals`,"aria-labelledby":`${s}-totals`,children:[(0,F.jsx)(`h3`,{id:`${s}-totals`,children:`Личные итоги месяца`}),A.length?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`p`,{className:`planner-money-heading`,children:[`Деньги `,(0,F.jsx)(`span`,{className:`planner-manual-label`,children:`Вручную`})]}),(0,F.jsx)(`dl`,{children:A.map(([e,t])=>(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`dt`,{children:t}),(0,F.jsx)(`dd`,{children:p[e]})]},e))})]}):null,p.satisfaction?(0,F.jsxs)(`p`,{className:`planner-widget-rating`,children:[`Финансовая удовлетворённость `,(0,F.jsxs)(`strong`,{children:[p.satisfaction,` из 5`]})]}):null]}):null,f?null:(0,F.jsxs)(`form`,{className:`planner-widget-add`,onSubmit:M,noValidate:!0,children:[(0,F.jsx)(`label`,{htmlFor:`${s}-task`,children:`Своё дело`}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`input`,{id:`${s}-task`,maxLength:300,value:p.taskDraft??``,placeholder:`Что хочу сделать`,"aria-invalid":!!S,"aria-describedby":S?`${s}-error`:void 0,onChange:e=>{n({type:`edit-planner`,field:`taskDraft`,value:e.target.value}),C(``)}}),(0,F.jsx)(`button`,{type:`submit`,"aria-label":`Добавить дело`,disabled:!p.taskDraft?.trim(),children:(0,F.jsx)(W,{size:18,"aria-hidden":`true`})})]}),S?(0,F.jsx)(`p`,{className:`planner-widget-error`,id:`${s}-error`,role:`alert`,children:S}):null]}),d?(0,F.jsxs)(`div`,{className:`planner-widget-actions`,children:[(0,F.jsxs)(L,{variant:`text`,onClick:()=>{C(``),x(!0)},children:[(0,F.jsx)(W,{size:16,"aria-hidden":`true`}),`Добавить дело`]}),(0,F.jsx)(En,{href:`${r}?section=tasks`,children:`Все дела`})]}):null,(0,F.jsx)(`p`,{className:`visually-hidden`,role:`status`,children:w})]}),d&&b?(0,F.jsx)(Tn,{month:e.month,value:p.taskDraft??``,onChange:e=>{n({type:`edit-planner`,field:`taskDraft`,value:e}),C(``)},onSubmit:M,onClose:()=>x(!1),error:S}):null]})}function Fn({text:e,query:t=``}){let n=P(t.trim());if(!n)return e;let r=P(e),i=[],a=0;for(let t=r.indexOf(n);t!==-1;t=r.indexOf(n,a))i.push(e.slice(a,t),(0,F.jsx)(`mark`,{children:e.slice(t,t+n.length)},t)),a=t+n.length;return i.push(e.slice(a)),i}function In({material:e,session:t,content:n,href:r,library:i=!1,month:a,hideFormat:o=!1,continueReading:s=!1,query:c,snippet:l,onFavoriteChange:u}){let d=(0,j.useId)(),f=i?`h2`:`h3`,p=i?void 0:n.events?.find(t=>t.materialId===e.id)?.date,m=T(t,e),h=e.contentStatus===`unavailable`?`Материал отсутствует`:m?e.format===`quiz`?`Тренажёр выполнен`:`Просмотрено`:s?`Продолжить`:null,g=i?[!o&&I[e.format],e.minutes?`${e.minutes} мин`:null,a]:[I[e.format],e.author,p];return(0,F.jsxs)(`div`,{className:`material-with-favorite`,children:[(0,F.jsxs)(`a`,{className:`material-row${i?` material-row--library`:``}`,href:r,"aria-labelledby":`${d}-title`,"aria-describedby":`${d}-details${i&&h?` ${d}-status`:``}`,children:[(0,F.jsx)(`span`,{className:`material-row-format`,children:(0,F.jsx)(Y,{format:e.format})}),(0,F.jsxs)(`div`,{className:`material-row-copy`,children:[(0,F.jsx)(f,{id:`${d}-title`,children:(0,F.jsx)(Fn,{text:e.title,query:c})}),i&&e.author?(0,F.jsx)(`p`,{className:`material-row-author`,children:(0,F.jsx)(Fn,{text:e.author,query:c})}):null,i&&l?(0,F.jsx)(`p`,{className:`material-row-snippet`,children:(0,F.jsx)(Fn,{text:l,query:c})}):null,i?null:(0,F.jsxs)(`p`,{id:`${d}-details`,className:`material-row-meta`,children:[g.filter(Boolean).join(` · `),h?(0,F.jsxs)(F.Fragment,{children:[` · `,(0,F.jsx)(`span`,{className:`material-row-completed`,children:h})]}):null]})]}),i?(0,F.jsxs)(`div`,{className:`material-row-side`,children:[(0,F.jsx)(`p`,{id:`${d}-details`,className:`material-row-meta`,children:g.filter(Boolean).join(` · `)}),h?(0,F.jsx)(`span`,{id:`${d}-status`,className:`material-row-status`,children:h}):null]}):null,(0,F.jsx)(X,{name:`arrow`})]}),(0,F.jsx)(_n,{materialId:e.id,title:e.title,monthId:fe(r)?.monthId??void 0,onChange:u})]})}function Ln({content:e}){return(0,F.jsxs)(`section`,{className:`month-news`,children:[(0,F.jsxs)(`div`,{className:`compact-title`,children:[(0,F.jsx)(`h2`,{children:`Новости`}),e.newsStatus===`unavailable`?(0,F.jsx)(q,{label:`О выпуске новостей`,children:(0,F.jsx)(`p`,{children:e.news})}):null]}),(0,F.jsx)(`p`,{className:`muted`,children:e.newsStatus===`unavailable`?`Выпуск этого месяца недоступен.`:e.news})]})}var Rn=[{key:`consumption`,wide:`/FinHealth-demo/assets/hero-wide-DxglV9zy.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-abmDUc0X.webp`,square:`/FinHealth-demo/assets/program-square-DSmffvXZ.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-CkLPO4lR.webp`},{key:`psychology`,wide:`/FinHealth-demo/assets/hero-wide-BNCrl7Po.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-Rqjc1q_s.webp`,square:`/FinHealth-demo/assets/program-square-BLoJYEc7.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-B_td8y-L.webp`},{key:`budget`,wide:`/FinHealth-demo/assets/hero-wide-lkyqJgV8.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-DMt2rDtQ.webp`,square:`/FinHealth-demo/assets/program-square-D7GSO86y.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-B-TDClBG.webp`},{key:`shopping`,wide:`/FinHealth-demo/assets/hero-wide-D1t8hVzX.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-D6BhScnY.webp`,square:`/FinHealth-demo/assets/program-square-D0USFJ6i.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-Bc3SzZ86.webp`},{key:`ecology`,wide:`/FinHealth-demo/assets/hero-wide-CTSsor2h.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-B33wdNK3.webp`,square:`/FinHealth-demo/assets/program-square-BvoXdI1u.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BF0BAWeT.webp`},{key:`marketplaces`,wide:`/FinHealth-demo/assets/hero-wide-BlSv2sDB.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-C_ayEsTf.webp`,square:`/FinHealth-demo/assets/program-square-728y6RWf.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BKhhwmEQ.webp`},{key:`quality`,wide:`/FinHealth-demo/assets/hero-wide-eFZvtDH4.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-Cgbgh5KU.webp`,square:`/FinHealth-demo/assets/program-square-CWVG6N-f.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-lzFcvq5m.webp`},{key:`family`,wide:`/FinHealth-demo/assets/hero-wide-Ba9q5fD2.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-wNiynAd5.webp`,square:`/FinHealth-demo/assets/program-square-vwghiM2C.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-Ct3q6Ew6.webp`},{key:`sharing`,wide:`/FinHealth-demo/assets/hero-wide-Ce_K2CJh.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-BQCXzEme.webp`,square:`/FinHealth-demo/assets/program-square-BAq_zC4w.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BcaNzxIB.webp`}];function zn(e,t){let n=t?t.theme===e?t.key:void 0:e?.startsWith(`Культура шеринга`)?`sharing`:void 0;return Rn.find(e=>e.key===n)}function Bn(e,t){return!!zn(e,t)}function Vn({theme:e,binding:t,format:n,priority:r=!1}){let i=zn(e,t);if(!i)return null;let{wide:a,landscape:o,square:s,portrait:c}=i,l=n===`wide`?[a,2160,720]:n===`landscape`||n===`card`?[o,1600,900]:[s,1200,1200];return(0,F.jsxs)(`picture`,{className:`month-artwork month-artwork--${n}`,"data-artwork":i.key,"aria-hidden":`true`,children:[n!==`square`&&n!==`card`?(0,F.jsx)(`source`,{media:`(max-width: 600px)`,srcSet:c,width:1080,height:1440}):null,(0,F.jsx)(`img`,{src:l[0],width:l[1],height:l[2],alt:``,decoding:`async`,loading:r?`eager`:`lazy`,fetchPriority:r?`high`:`auto`})]})}var Hn=()=>window.matchMedia(`(max-width: 1050px)`).matches;function Un(e){let t=window.matchMedia(`(max-width: 1050px)`);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)}function Wn({session:e,content:t,links:n,currentMonthLink:r,dispatch:i,saveExercise:a}){let o=(0,j.useId)(),s=(0,j.useSyncExternalStore)(Un,Hn,()=>!1),c=x(e,t),l=t.rubrics??[...new Set(t.materials.map(e=>e.rubric))],u=t.events?.filter(e=>!t.materials.some(t=>t.id===e.materialId))??[],d=t.newsStatus!==`unavailable`&&!!t.news,f=(0,F.jsxs)(`header`,{className:`club-month-hero${Bn(t.theme,t.artwork)?` club-month-hero--illustrated`:``}`,children:[(0,F.jsxs)(`div`,{className:`club-month-heading`,children:[(0,F.jsx)(`p`,{className:`eyebrow`,children:t.month}),(0,F.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:t.theme}),t.question.trim()?(0,F.jsx)(`p`,{className:`club-month-question`,children:t.question}):null]}),Bn(t.theme,t.artwork)?(0,F.jsx)(Vn,{binding:t.artwork,theme:t.theme,format:`landscape`,priority:!0}):null,t.introduction.trim()?(0,F.jsx)(`div`,{className:`club-month-introduction`,children:t.introduction.trim().split(/\n\s*\n/).map((e,t)=>(0,F.jsx)(`p`,{children:e},t))}):null]},`hero`),p=(0,F.jsxs)(`section`,{className:`club-month-materials`,"aria-label":`Материалы месяца`,children:[l.map((r,i)=>(0,F.jsxs)(`section`,{className:`club-month-panel club-month-rubric`,"aria-labelledby":`${o}-rubric-${i}`,children:[(0,F.jsx)(`h2`,{id:`${o}-rubric-${i}`,children:r}),(0,F.jsx)(`ul`,{className:`material-list`,children:t.materials.filter(e=>e.rubric===r).map(r=>(0,F.jsx)(`li`,{children:(0,F.jsx)(In,{material:r,session:e,content:t,continueReading:c?.kind===`material`&&c.materialId===r.id,href:`${n.month}/material/${r.id}`})},r.id))})]},r)),!t.materials.some(e=>e.quiz)&&(t.practice.light.length>0||t.practice.advanced.length>0)?(0,F.jsxs)(`a`,{className:`club-month-panel club-month-extra`,href:n.practice,children:[(0,F.jsx)(`span`,{className:`material-row-format`,children:(0,F.jsx)(Y,{format:`quiz`})}),(0,F.jsxs)(`span`,{children:[t.practice.title,(0,F.jsx)(`span`,{className:`muted`,children:D(e,t)?`Практика выполнена`:c?.kind===`practice`?`Продолжить`:`Тренажёр`})]}),(0,F.jsx)(X,{name:`arrow`})]}):null,t.upcoming?(0,F.jsxs)(`a`,{className:`club-month-panel club-month-extra`,href:n.scheduled,children:[(0,F.jsx)(`span`,{className:`material-row-format`,children:(0,F.jsx)(H,{size:18,"aria-hidden":`true`})}),(0,F.jsxs)(`span`,{children:[t.upcoming.title,(0,F.jsxs)(`span`,{className:`muted`,children:[`Откроется `,t.upcoming.opens]})]}),(0,F.jsx)(X,{name:`arrow`})]}):null]},`materials`),m=(0,F.jsx)(Pn,{content:t,session:e,dispatch:i,saveExercise:a,plannerHref:n.planner},`planner`),h=e.reflectionSaved?(0,F.jsxs)(`section`,{className:`club-month-panel club-month-reflection`,"aria-labelledby":`${o}-reflection`,children:[(0,F.jsx)(`h2`,{id:`${o}-reflection`,children:`Мой вывод`}),(0,F.jsx)(`p`,{className:`user-text`,children:e.reflectionSaved}),(0,F.jsxs)(`a`,{className:`club-month-text-link`,href:n.reflection,children:[`Изменить вывод`,(0,F.jsx)(X,{name:`arrow`})]})]},`reflection`):(0,F.jsxs)(`a`,{className:`club-month-panel club-month-reflection-empty`,href:n.reflection,children:[`Записать вывод`,(0,F.jsx)(X,{name:`arrow`})]},`reflection`),g=u.length||t.event||d?(0,F.jsxs)(`div`,{className:`club-month-extras`,children:[u.map(e=>(0,F.jsxs)(`section`,{className:`club-month-panel`,children:[(0,F.jsx)(`h2`,{children:e.title}),(0,F.jsxs)(`p`,{className:`muted`,children:[e.date,` · `,e.host]})]},e.materialId)),t.event?(0,F.jsxs)(`section`,{className:`club-month-panel`,children:[(0,F.jsx)(`h2`,{children:t.event.recorded?`Встреча месяца`:`Ближайшая встреча`}),(0,F.jsx)(`h3`,{children:t.event.title}),(0,F.jsxs)(`p`,{className:`muted`,children:[t.event.date,` · `,t.event.host]}),(0,F.jsx)(Z,{message:`Карточка эфира ещё не реализована.`,children:`О встрече`})]}):null,d?(0,F.jsx)(Ln,{content:t}):null]},`extras`):null;return(0,F.jsxs)(`main`,{className:`product-main month-page club-month`,children:[n.month===r?null:(0,F.jsx)(`nav`,{className:`month-breadcrumbs`,"aria-label":`Навигация месяца`,children:(0,F.jsx)(`a`,{href:r,children:`К текущему месяцу →`})}),(0,F.jsx)(`div`,{className:`club-month-grid`,children:s?(0,F.jsxs)(F.Fragment,{children:[f,p,m,h,g]}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`div`,{className:`club-month-column club-month-column-main`,children:[f,p]}),(0,F.jsxs)(`div`,{className:`club-month-column club-month-column-side`,children:[m,h,g]})]})})]})}function Q({children:e,eyebrow:t,help:n}){return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{className:`eyebrow`,children:t}),(0,F.jsxs)(`div`,{className:`study-title`,children:[(0,F.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:e}),n]})]})}function $({links:e}){return(0,F.jsx)(`a`,{className:`back-link`,href:e.month,children:`← К месяцу`})}function Gn({links:e}){return(0,F.jsx)(`div`,{className:`file-links`,children:(0,F.jsxs)(`a`,{href:e.planner,children:[(0,F.jsx)(X,{name:`file`}),(0,F.jsx)(`span`,{children:`Открыть мои дела`}),(0,F.jsx)(X,{name:`arrow`})]})})}function Kn(e){let t=e.content.materials.find(t=>t.id===e.materialId)??e.content.materials[0];return t.quiz?(0,F.jsx)(Cn,{...e,material:t}):(0,F.jsx)(Sn,{...e,material:t})}function qn({content:e,links:t}){return e.upcoming?(0,F.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,F.jsx)($,{links:t}),(0,F.jsx)(Q,{eyebrow:`Будущий материал`,children:e.upcoming.title}),(0,F.jsxs)(`p`,{className:`muted`,children:[`Откроется `,e.upcoming.opens]}),(0,F.jsxs)(`div`,{className:`screen-actions`,children:[(0,F.jsx)(R,{href:t.material,children:`Открыть доступный материал`}),(0,F.jsx)(`a`,{href:t.practice,children:`К практике месяца →`})]})]}):(0,F.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,F.jsx)($,{links:t}),(0,F.jsx)(Q,{eyebrow:e.month,children:`Будущий материал не объявлен`})]})}function Jn(e){let t=e.content.materials.find(e=>e.quiz);return t?(0,F.jsx)(Cn,{...e,material:t}):!e.content.practice.light.length&&!e.content.practice.advanced.length?(0,F.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,F.jsx)($,{links:e.links}),(0,F.jsx)(Q,{eyebrow:e.content.month,children:`Практика в материалах месяца`}),(0,F.jsx)(`p`,{children:`Отдельное упражнение здесь не опубликовано. Задания и ссылки на оригинальные тренажёры находятся в материалах.`})]}):(0,F.jsx)(Yn,{...e})}function Yn({session:e,content:t,dispatch:n,savePractice:r,links:i}){let a=e.practiceDraft;return(0,F.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,F.jsx)($,{links:i}),(0,F.jsx)(Q,{eyebrow:`${t.month} · тренажёр месяца`,help:(0,F.jsx)(q,{label:`О тренажёре`,children:(0,F.jsx)(`p`,{children:`Выберите вариант, выполните шаги и сохраните отметку выполнения. Заметка — для вас, без проверки экспертом.`})}),children:t.practice.title}),(0,F.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),r()},children:[(0,F.jsx)(zt,{legend:`Какой вариант вам подходит?`,value:a.level,options:[{value:`light`,label:`Лёгкий · один вопрос`},{value:`advanced`,label:`Расширенный · общий план`}],onChange:e=>n({type:`edit-practice`,patch:{level:e}})}),(0,F.jsx)(`ol`,{className:`practice-instructions`,children:t.practice[a.level].map(e=>(0,F.jsx)(`li`,{children:e},e))}),(0,F.jsx)(Gn,{links:i}),(0,F.jsx)(K,{id:`practice-note`,label:`Мой результат`,rows:4,value:a.note,onChange:e=>n({type:`edit-practice`,patch:{note:e.target.value}})}),(0,F.jsx)(Bt,{checked:a.done,onChange:e=>n({type:`edit-practice`,patch:{done:e.target.checked}}),children:`Практика выполнена`}),e.practiceStatus===`save-error`?(0,F.jsx)(G,{tone:`error`,children:`Не удалось сохранить результат. Ваш ввод на месте. Попробуйте ещё раз.`}):null,(0,F.jsxs)(`div`,{className:`screen-actions`,children:[(0,F.jsx)(L,{type:`submit`,children:e.practiceStatus===`save-error`?`Повторить сохранение`:`Сохранить результат`}),(0,F.jsx)(`a`,{href:i.reflection,children:`Сформулировать вывод →`})]}),e.practiceStatus===`saved`?(0,F.jsx)(G,{children:e.practiceSaved?.done?`Результат сохранён.`:`Черновик сохранён. Практика пока не выполнена.`}):null]}),(0,F.jsx)(Z,{message:`Вопросы появятся в карточке эфира. Этот экран ещё не реализован; ваша заметка никуда не отправлена.`,children:`Задать вопрос эксперту`})]})}function Xn({session:e,dispatch:t,saveReflection:n,links:r}){let i=e.reflectionStatus===`validation-error`;return(0,F.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,F.jsx)($,{links:r}),(0,F.jsx)(Q,{eyebrow:`Личный итог месяца`,help:(0,F.jsx)(q,{label:`О личном выводе`,children:(0,F.jsx)(`p`,{children:`Достаточно одной мысли или правила для себя. Здесь нет правильного ответа или оценки.`})}),children:`Что вы заберёте из этого месяца?`}),(0,F.jsxs)(`form`,{noValidate:!0,onSubmit:e=>{e.preventDefault(),n()},children:[(0,F.jsx)(K,{id:`reflection-text`,label:`Моё правило на следующий месяц`,rows:5,value:e.reflectionDraft,error:i?`Запишите вывод или вернитесь к месяцу.`:void 0,onChange:e=>t({type:`edit-reflection`,text:e.target.value})}),e.reflectionStatus===`save-error`?(0,F.jsx)(G,{tone:`error`,children:`Не удалось сохранить вывод. Текст остался на месте. Попробуйте ещё раз.`}):null,(0,F.jsxs)(`div`,{className:`screen-actions`,children:[(0,F.jsx)(L,{type:`submit`,children:e.reflectionStatus===`save-error`?`Повторить сохранение`:`Сохранить вывод`}),(0,F.jsx)(`a`,{href:r.month,children:`Вернуться к месяцу`})]})]})]})}var Zn={month:Wn,material:Kn,scheduled:qn,practice:Jn,reflection:Xn,planner:nn};export{ie as $,It as A,H as B,Gt as C,K as D,zt as E,wt as F,R as G,lt as H,St as I,me as J,L as K,vt as L,W as M,kt as N,G as O,U as P,P as Q,gt as R,Kt as S,Bt as T,st as U,dt as V,V as W,he as X,pe as Y,ge as Z,pn as _,In as a,oe as at,Y as b,jn as c,ne as ct,wn as d,re as et,Z as f,mn as g,_n as h,Bn as i,N as it,Mt as j,Rt as k,En as l,gn as m,Zn as n,le as nt,Ln as o,fe as ot,X as p,I as q,Vn as r,ue as rt,Pn as s,M as st,Kn as t,de as tt,Tn as u,hn as v,q as w,J as x,tn as y,mt as z};