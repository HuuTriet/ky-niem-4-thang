/* ============================================================
   APP — dựng câu chuyện từ CONFIG + toàn bộ tương tác.
   Parallax bằng transform trong 1 vòng rAF; video tự chạy
   (muted + playsinline) đúng chính sách trình duyệt di động.
   ============================================================ */
(function () {
  'use strict';
  const RAW = window.CONFIG || {};

  /* ---------- Thay {{HER_NAME}} / {{HIS_NAME}} ---------- */
  const NAMES = {
    '{{HER_NAME}}': RAW.herName || 'em',
    '{{HIS_NAME}}': RAW.hisName || 'anh',
    '{{HER_NICK}}': RAW.herNick || RAW.herName || 'em',
    '{{HIS_NICK}}': RAW.hisNick || RAW.hisName || 'anh',
  };
  function fill(v) {
    if (typeof v === 'string') { let s = v; for (const k in NAMES) s = s.split(k).join(NAMES[k]); return s; }
    if (Array.isArray(v)) return v.map(fill);
    if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = fill(v[k]); return o; }
    return v;
  }
  const C = fill(RAW);

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1) HERO
     ============================================================ */
  if (C.hisName) $('#hisName').textContent = C.hisName;
  if (C.herName) $('#herName').textContent = C.herName;
  const H = C.hero || {};
  if (H.kicker) $('#heroKicker').textContent = H.kicker;
  if (H.title) $('#heroTitle').textContent = H.title;
  if (H.subtitle) $('#heroSub').textContent = H.subtitle;
  if (C.counterLabel) $('#counterLabel').textContent = C.counterLabel;

  const heroVideo = $('#heroVideo');
  if (H.fallbackPhoto) heroVideo.style.backgroundImage = 'url("' + H.fallbackPhoto + '")';
  if (H.video) { heroVideo.src = H.video; }
  else if (H.fallbackPhoto) { heroVideo.removeAttribute('autoplay'); }

  /* ---------- Đếm ngày yêu ---------- */
  const start = C.startDate ? new Date(C.startDate + 'T00:00:00') : null;
  function tick() {
    if (!start || isNaN(start)) return;
    let ms = Date.now() - start.getTime();
    if (ms < 0) ms = 0;
    $('#cDays').textContent = Math.floor(ms / 864e5);
    $('#cHours').textContent = Math.floor((ms % 864e5) / 36e5);
    $('#cMins').textContent = Math.floor((ms % 36e5) / 6e4);
    $('#cSecs').textContent = Math.floor((ms % 6e4) / 1e3);
  }
  tick(); setInterval(tick, 1000);

  /* ============================================================
     2) DỰNG CÁC CHƯƠNG TỪ CONFIG.STORY
     ============================================================ */
  const mount = $('#storyMount');
  const parallaxEls = [];   // {img, holder}
  const esc = (t) => String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  (C.story || []).forEach((b, idx) => {
    if (b.type === 'scene') {
      const sec = document.createElement('section');
      sec.className = 'scene scene--' + (b.align || 'left');
      const fit = b.fit === 'contain' ? 'contain' : 'cover';
      sec.dataset.fit = fit;
      const lazy = idx > 0 ? 'loading="lazy" ' : '';
      sec.innerHTML =
        // Ảnh dọc (contain): thêm 1 lớp nền mờ phía sau để không lộ dải trống hai bên
        (fit === 'contain' ? '<img class="scene__fill" src="' + esc(b.photo) + '" alt="" aria-hidden="true" ' + lazy + 'decoding="async" />' : '') +
        '<img class="scene__bg" src="' + esc(b.photo) + '" alt="" ' + lazy + 'decoding="async"' + (b.focus ? ' style="--focus:' + esc(b.focus) + '"' : '') + ' />' +
        '<div class="scene__shade"></div>' +
        '<div class="scene__content">' +
          '<p class="scene__eyebrow reveal">' + esc(b.chapter || '') + '</p>' +
          (b.date ? '<p class="scene__date reveal">' + esc(b.date) + '</p>' : '') +
          '<h2 class="scene__title reveal">' + esc(b.title || '') + '</h2>' +
          '<p class="scene__text reveal">' + esc(b.text || '') + '</p>' +
        '</div>';
      mount.appendChild(sec);
      parallaxEls.push({ img: sec.querySelector('.scene__bg'), fill: sec.querySelector('.scene__fill'), holder: sec, fit: fit });
    }

    if (b.type === 'keepsake') {
      const sec = document.createElement('section');
      sec.className = 'keepsake';
      sec.innerHTML =
        '<div class="keepsake__grid">' +
          '<div class="keepsake__photo reveal"><div class="keepsake__frame">' +
            '<img src="' + esc(b.photo) + '" alt="Tấm hình được giữ lại" loading="lazy" decoding="async" />' +
          '</div></div>' +
          '<div class="keepsake__body">' +
            '<p class="scene__eyebrow reveal">' + esc(b.chapter || '') + '</p>' +
            '<h2 class="keepsake__title reveal">' + esc(b.title || '') + '</h2>' +
            '<p class="keepsake__text reveal">' + esc(b.text || '') + '</p>' +
            (b.note ? '<p class="keepsake__note reveal">' + esc(b.note) + '</p>' : '') +
          '</div>' +
        '</div>';
      mount.appendChild(sec);
    }

    if (b.type === 'moments') {
      const sec = document.createElement('section');
      sec.className = 'moments';
      let grid = '';
      (b.photos || []).forEach((p) => {
        grid += '<figure class="moment reveal" data-src="' + esc(p.src) + '" data-cap="' + esc(p.cap || '') + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.cap || 'Ảnh kỉ niệm') + '" loading="lazy" decoding="async" />' +
          (p.cap ? '<figcaption>' + esc(p.cap) + '</figcaption>' : '') +
          '</figure>';
      });
      sec.innerHTML =
        '<div class="chapterhead reveal">' +
          '<p class="chapterhead__eyebrow">' + esc(b.chapter || '') + '</p>' +
          '<h2 class="chapterhead__title">' + esc(b.title || '') + '</h2>' +
          '<p class="chapterhead__text">' + esc(b.text || '') + '</p>' +
        '</div>' +
        '<div class="moments__grid">' + grid + '</div>';
      mount.appendChild(sec);
    }

    if (b.type === 'strip') {
      const sec = document.createElement('section');
      sec.className = 'strip';
      let cards = '';
      (b.photos || []).forEach((p, i) => {
        cards += '<figure class="strip__card" style="--tilt:' + ((i % 2 ? 1.6 : -1.8)) + 'deg" data-src="' + esc(p.src) + '" data-cap="' + esc(p.cap || '') + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.cap || 'Ảnh kỉ niệm') + '" loading="lazy" decoding="async" />' +
          '<figcaption>' + esc(p.cap || '') + '</figcaption>' +
          '</figure>';
      });
      // Nhân đôi bộ ảnh để marquee chạy vòng liền mạch.
      // Chạy bằng scrollLeft thay vì animate transform: track quá rộng làm iOS bỏ vẽ (dải bị trống trên iPhone).
      sec.innerHTML = '<div class="strip__wrap"><div class="strip__track">' + cards + cards + '</div></div><p class="strip__hint">kỉ niệm cứ thế trôi, chầm chậm</p>';
      mount.appendChild(sec);
      const wrap = sec.querySelector('.strip__wrap');
      const strack = sec.querySelector('.strip__track');
      let pos = 0, auto = true, seen = false, holdT = 0;
      const hold = () => { auto = false; clearTimeout(holdT); };
      const release = () => {
        clearTimeout(holdT);
        holdT = setTimeout(() => { pos = wrap.scrollLeft; auto = true; }, 2400);
      };
      wrap.addEventListener('touchstart', hold, { passive: true });
      wrap.addEventListener('touchend', release, { passive: true });
      wrap.addEventListener('mouseenter', hold);
      wrap.addEventListener('mouseleave', release);
      // Cuộn tay tới cuối → nối lại nửa đầu (bộ ảnh nhân đôi) thành vòng lặp liền mạch
      wrap.addEventListener('scroll', () => {
        const half = strack.scrollWidth / 2;
        if (half > 0 && wrap.scrollLeft >= half) { wrap.scrollLeft -= half; pos = wrap.scrollLeft; }
      }, { passive: true });
      new IntersectionObserver((es) => { es.forEach((en) => { seen = en.isIntersecting; }); }).observe(sec);
      if (!reduceMotion) (function marquee() {
        if (seen && auto) {
          const half = strack.scrollWidth / 2;
          if (half > 0) { pos += 0.55; if (pos >= half) pos -= half; wrap.scrollLeft = pos; }
        }
        requestAnimationFrame(marquee);
      })();
    }
  });

  /* Lightbox cho moment + strip */
  const lb = $('#lightbox'), lbImg = $('#lightboxImg'), lbCap = $('#lightboxCap');
  document.addEventListener('click', (e) => {
    const fig = e.target.closest('.moment'); // chỉ lưới "lộn xộn" mở lightbox; dải Huế chỉ để ngắm
    if (!fig) return;
    lbImg.src = fig.dataset.src;
    lbCap.textContent = fig.dataset.cap || '';
    lb.hidden = false;
  });
  $('#lightboxClose').addEventListener('click', () => (lb.hidden = true));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { lb.hidden = true; $('#wishModal').hidden = true; } });

  /* ============================================================
     3) PARALLAX — 1 vòng rAF, chỉ transform
     ============================================================ */
  const finaleBg = $('#finaleBg');
  if (finaleBg && C.finale && C.finale.photo) {
    finaleBg.src = C.finale.photo;
    parallaxEls.push({ img: finaleBg, holder: $('#finaleSection') });
  }
  /* Thanh tiến độ đọc chuyện (vàng, sát mép trên) */
  const progressBar = document.createElement('div');
  progressBar.className = 'progressbar';
  document.body.appendChild(progressBar);

  if (!reduceMotion) {
    let ticking = false;
    function parallax() {
      ticking = false;
      const vh = window.innerHeight;
      for (const p of parallaxEls) {
        const r = p.holder.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 → 0.5
        if (p.fit === 'contain') {
          // Ảnh dọc: trôi nhẹ + Ken Burns rất nhẹ, nổi trên nền mờ (nền mờ trôi chậm hơn → chiều sâu)
          const scale = (1.02 + progress * 0.03).toFixed(3);
          p.img.style.transform = 'translate3d(0,' + (progress * -4).toFixed(2) + '%,0) scale(' + scale + ')';
          if (p.fill) p.fill.style.transform = 'translate3d(0,' + (progress * -8).toFixed(2) + '%,0) scale(1.18)';
        } else {
          // Ảnh phủ kín: parallax cuộn + Ken Burns
          const scale = (1.06 + progress * 0.05).toFixed(3);
          p.img.style.transform = 'translate3d(0,' + (progress * -7).toFixed(2) + '%,0) scale(' + scale + ')';
        }
      }
      const doc = document.documentElement;
      const total = doc.scrollHeight - innerHeight;
      progressBar.style.transform = 'scaleX(' + (total > 0 ? (scrollY / total).toFixed(4) : 0) + ')';
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* ============================================================
     4) THƯỚC PHIM — tự chạy khi cuộn tới
     ============================================================ */
  const F = C.film || {};
  if (F.chapter) $('#filmChapter').textContent = F.chapter;
  if (F.title) $('#filmTitle').textContent = F.title;
  if (F.text) $('#filmText').textContent = F.text;
  const filmVideo = $('#filmVideo');
  if (F.video) {
    filmVideo.src = F.video;
    filmVideo.muted = true; // phim không có tiếng — nhạc nền vẫn chạy xuyên suốt
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (en.isIntersecting) { filmVideo.play().catch(() => {}); }
        else { filmVideo.pause(); }
      });
    }, { threshold: 0.3 });
    io.observe(filmVideo);
  } else {
    $('#filmSection').style.display = 'none';
  }

  /* ============================================================
     5) LÁ THƯ — tự gõ khi cuộn tới
     ============================================================ */
  if (C.letterChapter) $('#letterChapter').textContent = C.letterChapter;
  if (C.letterTitle) $('#letterTitle').textContent = C.letterTitle;
  const letterBody = $('#letterBody');
  const letterSign = $('#letterSign');
  const letterSkip = $('#letterSkip');
  const LETTER = C.letter || '';
  let letterShown = false;
  const letterTimers = [];

  // Dựng sẵn từng đoạn, ẩn — khi cuộn tới sẽ hiện dần từng dòng
  const paras = LETTER.split('\n').filter((s) => s.trim() !== '');
  letterBody.innerHTML = paras.map((p) => '<span class="lline">' + esc(p) + '</span>').join('');
  const lines = Array.from(letterBody.querySelectorAll('.lline'));

  function showFullLetter() {
    letterTimers.forEach(clearTimeout);
    lines.forEach((l) => l.classList.add('show'));
    letterSign.textContent = C.letterSign || '';
    letterSign.classList.add('show');
    letterSkip.hidden = true;
  }
  function revealLetter() {
    if (letterShown) return;
    letterShown = true;
    if (reduceMotion) return showFullLetter();
    letterSkip.hidden = false;
    lines.forEach((l, i) => {
      letterTimers.push(setTimeout(() => {
        l.classList.add('show');
        if (i === lines.length - 1) {
          letterTimers.push(setTimeout(() => {
            letterSign.textContent = C.letterSign || '';
            letterSign.classList.add('show');
            letterSkip.hidden = true;
          }, 900));
        }
      }, 500 + i * 1100)); // mỗi dòng cách nhau ~1,1 giây
    });
  }
  letterSkip.addEventListener('click', showFullLetter);
  new IntersectionObserver((es, io) => {
    es.forEach((en) => { if (en.isIntersecting) { revealLetter(); io.disconnect(); } });
  }, { threshold: 0.3 }).observe($('#letterSection'));

  /* ============================================================
     6) QUIZ
     ============================================================ */
  if (C.quizChapter) $('#quizChapter').textContent = C.quizChapter;
  if (C.quizTitle) $('#quizTitle').textContent = C.quizTitle;
  const quizData = C.quiz || [];
  const quizBox = $('#quizBox');
  let qi = 0, score = 0;

  function renderQuiz() {
    if (!quizData.length) { $('#quizSection').style.display = 'none'; return; }
    if (qi >= quizData.length) return renderResult();
    const q = quizData[qi];

    /* Câu dạng nhập ngày (em tự gõ số) */
    if (q.type === 'date') {
      quizBox.innerHTML =
        '<div class="quiz__progress">Câu ' + (qi + 1) + ' / ' + quizData.length + '</div>' +
        '<div class="quiz__q">' + esc(q.q) + '</div>' +
        '<div class="quiz__date">' +
          '<input type="number" id="qd" inputmode="numeric" min="1" max="31" placeholder="ngày" aria-label="ngày" />' +
          '<span>/</span>' +
          '<input type="number" id="qm" inputmode="numeric" min="1" max="12" placeholder="tháng" aria-label="tháng" />' +
          '<span>/</span>' +
          '<input type="number" id="qy" inputmode="numeric" min="2020" max="2030" placeholder="năm" aria-label="năm" />' +
        '</div>' +
        '<button class="quiz__next" id="qdCheck">Kiểm tra</button>' +
        '<div class="quiz__reaction"></div>';
      $('#qd').focus();
      $('#qdCheck').addEventListener('click', () => {
        const d = +$('#qd').value, m = +$('#qm').value, y = +$('#qy').value;
        if (!d || !m || !y) return;
        const correct = d === q.d && m === q.m && y === q.y;
        const dateBox = quizBox.querySelector('.quiz__date');
        dateBox.classList.add(correct ? 'is-correct' : 'is-wrong');
        $$('#quizBox .quiz__date input').forEach((inp) => { inp.disabled = true; });
        $('#qdCheck').remove();
        if (correct) {
          score++;
          const r = dateBox.getBoundingClientRect();
          window.Effects && window.Effects.burst(r.left + dateBox.offsetWidth / 2, r.top, 40);
        }
        quizBox.querySelector('.quiz__reaction').textContent = correct ? (q.reaction || 'Đúng rồi.') : (q.reactionWrong || 'Sai mất rồi.');
        const next = document.createElement('button');
        next.className = 'quiz__next';
        next.textContent = qi < quizData.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả';
        next.addEventListener('click', () => { qi++; renderQuiz(); });
        quizBox.appendChild(next);
      });
      return;
    }

    quizBox.innerHTML =
      '<div class="quiz__progress">Câu ' + (qi + 1) + ' / ' + quizData.length + '</div>' +
      '<div class="quiz__q">' + esc(q.q) + '</div>' +
      '<div class="quiz__options">' +
        q.options.map((o, i) => '<button class="quiz__opt" data-i="' + i + '">' + esc(o) + '</button>').join('') +
      '</div>' +
      '<div class="quiz__reaction"></div>';
    $$('#quizBox .quiz__opt').forEach((btn) => btn.addEventListener('click', () => answer(btn, q)));
  }
  function answer(btn, q) {
    const chosen = +btn.dataset.i;
    $$('#quizBox .quiz__opt').forEach((b) => { b.disabled = true; });
    const correct = chosen === q.answer;
    if (correct) {
      btn.classList.add('correct'); score++;
      const r = btn.getBoundingClientRect();
      window.Effects && window.Effects.burst(r.left + btn.offsetWidth / 2, r.top, 36);
    } else {
      btn.classList.add('wrong');
      const right = $$('#quizBox .quiz__opt')[q.answer];
      if (right) right.classList.add('correct');
    }
    quizBox.querySelector('.quiz__reaction').textContent = correct
      ? (q.reaction || 'Đúng rồi.')
      : 'Sai mất rồi — đáp án đúng được tô sáng phía trên.';
    const next = document.createElement('button');
    next.className = 'quiz__next';
    next.textContent = qi < quizData.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả';
    next.addEventListener('click', () => { qi++; renderQuiz(); });
    quizBox.appendChild(next);
  }
  function renderResult() {
    const perfect = score === quizData.length;
    quizBox.innerHTML =
      '<div class="quiz__result">' +
        '<h3>' + (perfect ? 'Tuyệt đối!' : 'Kết quả của mình') + '</h3>' +
        '<p class="quiz__score">' + score + ' / ' + quizData.length + '</p>' +
        '<p>' + esc(perfect ? (C.quizPerfect || 'Đúng hết.') : (C.quizDefault || 'Không sao.')) + '</p>' +
      '</div>';
    window.Effects && window.Effects.rain();
  }
  renderQuiz();

  /* ============================================================
     7) CÂY THÔNG LỜI CHÚC (Firebase / localStorage)
     ============================================================ */
  (function wishTree() {
    const WT = C.wishtree || {};
    const LAUNCH_TS = WT.launchTs || 0;               // chỉ hiện lời chúc từ mốc khai trương trở đi
    const keepWish = (w) => !!w && (w.t || 0) >= LAUNCH_TS;
    if (WT.chapter) $('#treeChapter').textContent = WT.chapter;
    if (WT.title) $('#treeTitle').textContent = WT.title;
    if (WT.text) $('#treeText').textContent = WT.text;

    const treeEl = $('#tree');
    const ballsEl = $('#treeBalls');
    const lightsEl = $('#treeLights');
    const form = $('#wishForm');
    const note = $('#wishNote');
    const modal = $('#wishModal');

    const LIGHT_COLORS = ['#ffe9ae', '#e9c98b', '#d9a441', '#e8b4b8', '#f3ecdd', '#aee3c0'];
    for (let i = 0; i < 40; i++) {
      const yPct = 10 + (i / 40) * 78;
      const halfW = 4 + ((yPct - 6) / 82) * 42;
      const xPct = 50 + (Math.random() * 2 - 1) * halfW;
      const d = document.createElement('span');
      d.className = 'tree__light';
      const size = (Math.random() * 4 + 4).toFixed(1); // 4–8px
      d.style.width = size + 'px';
      d.style.height = size + 'px';
      d.style.left = xPct + '%';
      d.style.top = yPct + '%';
      const c = LIGHT_COLORS[i % LIGHT_COLORS.length];
      d.style.background = c;
      d.style.boxShadow = '0 0 6px ' + c + ', 0 0 14px ' + c;
      d.style.animationDelay = (Math.random() * 1.9).toFixed(2) + 's';
      d.style.animationDuration = (1.4 + Math.random() * 1.4).toFixed(2) + 's';
      lightsEl.appendChild(d);
    }

    const SLOTS = [];
    [
      { y: 17, n: 1 }, { y: 26, n: 2 }, { y: 35, n: 3 }, { y: 44, n: 3 },
      { y: 53, n: 3 }, { y: 62, n: 4 }, { y: 71, n: 4 }, { y: 80, n: 4 },
    ].forEach((row) => {
      const halfW = 3 + ((row.y - 8) / 80) * 38;
      for (let k = 0; k < row.n; k++) {
        const t = row.n === 1 ? 0 : (k / (row.n - 1)) * 2 - 1;
        SLOTS.push({ x: 50 + t * halfW, y: row.y });
      }
    });
    const BALL_COLORS = [
      'linear-gradient(135deg,#f3e3b8,#d9a441)',
      'linear-gradient(135deg,#eecfcf,#b4787d)',
      'linear-gradient(135deg,#f3ecdd,#cbb98f)',
      'linear-gradient(135deg,#cfe3d4,#7fae8b)',
      'linear-gradient(135deg,#d8cff0,#9a8ac4)',
    ];

    let wishes = [];
    function renderTree() {
      ballsEl.innerHTML = '';
      const shown = wishes.slice(-SLOTS.length);
      shown.forEach((w, i) => {
        const slot = SLOTS[i % SLOTS.length];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ball';
        b.textContent = w.name;
        b.title = 'Đọc lời chúc của ' + w.name;
        b.style.left = slot.x + '%';
        b.style.top = slot.y + '%';
        b.style.background = BALL_COLORS[(String(w.name).length + i) % BALL_COLORS.length];
        b.addEventListener('click', () => openWish(w));
        ballsEl.appendChild(b);
      });
      $('#treeCount').textContent = wishes.length
        ? '🎁 ' + wishes.length + ' lời chúc trên cây — chạm quả châu để đọc'
        : 'Cây thông đang chờ lời chúc đầu tiên 🎄';
    }
    function openWish(w) {
      $('#wishModalName').textContent = w.name;
      $('#wishModalMsg').textContent = w.msg;
      $('#wishModalTime').textContent = w.t
        ? new Date(w.t).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        : '';
      modal.hidden = false;
    }
    $('#wishModalClose').addEventListener('click', () => (modal.hidden = true));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

    const FB = WT.firebase || {};
    const useFirebase = !!(FB.projectId && FB.apiKey);
    const LS_KEY = 'wishes-triet-tram';
    function loadScript(src) {
      return new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = src; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    let addWish;
    if (useFirebase) {
      const V = '10.12.2';
      loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-app-compat.js')
        .then(() => loadScript('https://www.gstatic.com/firebasejs/' + V + '/firebase-firestore-compat.js'))
        .then(() => {
          firebase.initializeApp(FB);
          const col = firebase.firestore().collection('wishes');
          col.orderBy('t', 'asc').onSnapshot((snap) => {
            wishes = snap.docs.map((d) => d.data()).filter(keepWish);
            renderTree();
          }, () => { note.textContent = 'Không kết nối được máy chủ lời chúc.'; setupLocal(); });
          addWish = (name, msg) => col.add({ name: name, msg: msg, t: Date.now() });
        })
        .catch(() => { note.textContent = 'Không tải được máy chủ — tạm lưu trên máy này.'; setupLocal(); });
    } else {
      setupLocal();
    }
    function setupLocal() {
      try { wishes = JSON.parse(localStorage.getItem(LS_KEY) || '[]').filter(keepWish); } catch (e) { wishes = []; }
      renderTree();
      addWish = (name, msg) => {
        wishes.push({ name: name, msg: msg, t: Date.now() });
        localStorage.setItem(LS_KEY, JSON.stringify(wishes));
        renderTree();
        return Promise.resolve();
      };
    }
    renderTree();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#wishName').value.trim();
      const msg = $('#wishMsg').value.trim();
      if (!name || !msg) return;
      // Cây của riêng hai đứa — phải đúng mật mã mới treo được
      const keyEl = $('#wishKey');
      if (WT.passcode && (!keyEl || keyEl.value.trim() !== String(WT.passcode))) {
        note.textContent = 'Sai mật mã rồi — cây này chỉ hai đứa mình treo thôi 🌱';
        return;
      }
      if (!addWish) { note.textContent = 'Đang kết nối máy chủ lời chúc — bạn chờ vài giây rồi bấm lại nhé.'; return; }
      const btn = $('#wishBtn');
      btn.disabled = true;
      addWish(name, msg).then(() => {
        note.textContent = WT.thanksMessage || 'Lời chúc của bạn đã được treo lên cây. Cảm ơn bạn!';
        form.reset();
        const r = treeEl.getBoundingClientRect();
        window.Effects && window.Effects.burst(r.left + r.width / 2, r.top + r.height / 2, 46);
        btn.disabled = false;
      }).catch(() => {
        note.textContent = 'Gửi chưa được — bạn thử lại giúp mình nhé.';
        btn.disabled = false;
      });
    });
  })();

  /* ============================================================
     8) CHƯƠNG CUỐI
     ============================================================ */
  const FIN = C.finale || {};
  if (FIN.chapter) $('#finaleChapter').textContent = FIN.chapter;
  if (FIN.title) $('#finaleTitle').textContent = FIN.title;
  if (FIN.message) $('#finaleMsg').textContent = FIN.message;
  if (FIN.sign) $('#finaleSign').textContent = FIN.sign;
  $('#loveBtn').textContent = FIN.button || 'Thả một chiếc tim';
  $('#loveBtn').addEventListener('click', (e) => {
    const r = e.target.getBoundingClientRect();
    window.Effects && window.Effects.burst(r.left + r.width / 2, r.top, 60);
  });

  /* Dòng chạy lời cảm ơn */
  const track = $('#reasonsTrack');
  const tickerItems = (C.thanks && C.thanks.length) ? C.thanks : (C.reasons || []);
  if (track && tickerItems.length) {
    const seq = tickerItems.map((r) => '<span>' + esc(r) + '</span><i>✦</i>').join('');
    track.innerHTML = seq + seq; // nhân đôi để chạy vòng liền mạch
    // Cũng chạy bằng scrollLeft — tránh lỗi iOS bỏ vẽ layer quá rộng khi animate transform
    const box = $('#reasonsTicker');
    if (!reduceMotion && box) {
      let tp = 0;
      (function tickTicker() {
        const half = track.scrollWidth / 2;
        if (half > 0) { tp += 0.5; if (tp >= half) tp -= half; box.scrollLeft = tp; }
        requestAnimationFrame(tickTicker);
      })();
    }
  }

  /* ============================================================
     9) NHẠC NỀN
     ============================================================ */
  const bgm = $('#bgm');
  const musicBtn = $('#musicToggle');
  let musicWasOn = false;
  if (C.musicFile) bgm.src = C.musicFile;
  bgm.volume = 0;

  // iOS bỏ qua bgm.volume — đi vòng qua WebAudio GainNode để fade hoạt động cả trên iPhone
  let gainNode = null;
  function ensureAudioGraph() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || gainNode) return;
    try {
      const ctx = new AC();
      const src = ctx.createMediaElementSource(bgm);
      gainNode = ctx.createGain();
      gainNode.gain.value = 0;
      src.connect(gainNode).connect(ctx.destination);
      bgm.volume = 1; // âm lượng do gainNode quyết định
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { gainNode = null; }
  }
  function setVol(v) { if (gainNode) gainNode.gain.value = v; else bgm.volume = v; }
  function fadeIn() {
    let v = 0; const target = C.musicVolume != null ? C.musicVolume : 0.55;
    const t = setInterval(() => { v += 0.04; setVol(Math.min(v, target)); if (v >= target) clearInterval(t); }, 90);
  }
  function playMusic() {
    if (!C.musicFile) return;
    ensureAudioGraph();
    bgm.play().then(() => { musicWasOn = true; fadeIn(); musicBtn.classList.add('is-playing'); }).catch(() => {});
  }
  function pauseMusic() { if (!bgm.paused) { bgm.pause(); musicBtn.classList.remove('is-playing'); } }
  function resumeMusicIfWasOn() {
    if (musicWasOn && C.musicFile) {
      bgm.play().then(() => { setVol(C.musicVolume != null ? C.musicVolume : 0.55); musicBtn.classList.add('is-playing'); }).catch(() => {});
    }
  }
  window.pauseMusic = pauseMusic; window.resumeMusicIfWasOn = resumeMusicIfWasOn;
  musicBtn.addEventListener('click', () => {
    if (!C.musicFile) { musicBtn.title = 'Chưa có file nhạc — thêm vào assets/music/ nhé'; return; }
    if (bgm.paused) { musicWasOn = true; ensureAudioGraph(); bgm.play().then(() => { setVol(C.musicVolume != null ? C.musicVolume : 0.55); musicBtn.classList.add('is-playing'); }).catch(() => {}); }
    else { musicWasOn = false; pauseMusic(); }
  });

  /* ---------- Lyrics BÁM THEO NHẠC (karaoke đồng bộ currentTime) ---------- */
  (function () {
    function parseLrc(lrc) {
      const out = [];
      (lrc || '').split('\n').forEach((line) => {
        const m = line.match(/^\s*\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);
        if (!m) return;
        const t = parseInt(m[1], 10) * 60 + parseFloat(m[2]);
        out.push({ t: t, text: (m[3] || '').trim() });
      });
      out.sort((a, b) => a.t - b.t);
      return out;
    }
    const LRC = parseLrc(C.lyricsLrc || '');
    const FALLBACK = (C.lyrics || []).filter(Boolean);

    const bar = document.createElement('p');
    bar.className = 'lyricbar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    function swapTo(text) {
      bar.classList.remove('show');           // mờ đi
      clearTimeout(bar._t);
      bar._t = setTimeout(() => {
        if (!text) return;                    // câu trống (đoạn dạo nhạc) → để ẩn
        bar.textContent = '♪ ' + text + ' ♪';
        bar.classList.add('show');            // rồi hiện câu mới
      }, 260);
    }

    if (LRC.length) {
      let cur = -3;
      function idxAt(t) {
        let idx = -1;
        for (let i = 0; i < LRC.length; i++) { if (LRC[i].t <= t) idx = i; else break; }
        return idx;
      }
      function tickLyric() {
        if (bgm.paused) return;               // nhạc dừng → lời dừng
        const idx = idxAt(bgm.currentTime + 0.15);
        if (idx === cur) return;
        cur = idx;
        swapTo(idx >= 0 ? LRC[idx].text : (C.musicTitle || ''));
      }
      bgm.addEventListener('timeupdate', tickLyric);
      bgm.addEventListener('seeked', () => { cur = -3; tickLyric(); });
      window.startLyrics = function () {};    // nhạc chạy là tự bám, không cần gọi
    } else if (FALLBACK.length) {
      let li = 0, on = false;
      function next() { swapTo(FALLBACK[li % FALLBACK.length]); li++; }
      window.startLyrics = function () { if (on) return; on = true; next(); setInterval(next, 5600); };
    } else {
      window.startLyrics = function () {};
    }
  })();

  /* ============================================================
     10) MÀN MỞ ĐẦU + REVEAL
     ============================================================ */
  const G = C.gate || {};
  if (G.kicker) $('#gateKicker').textContent = G.kicker;
  if (G.title) $('#gateTitle').textContent = G.title;
  if (G.button) $('#openBtn').textContent = G.button;
  if (G.hint) $('#gateHint').textContent = G.hint;

  const gate = $('#gate');
  const content = $('#content');
  document.body.classList.add('is-locked'); // khoá cuộn khi màn mở đầu đang hiện

  /* ---------- Màn khoá đếm ngược tới 0:00 ngày kỉ niệm ---------- */
  const gateMain = $('#gateMain');
  const gateLockUI = $('#gateLock');
  const UNLOCK = G.unlockAt ? new Date(G.unlockAt).getTime() : 0;
  const bypass = /[?&#]xem/.test(location.search + location.hash); // link xem trước: thêm ?xem
  const isStillLocked = () => UNLOCK && Date.now() < UNLOCK && !bypass;
  let lockTimer = null;
  function unlockGate() {
    if (lockTimer) { clearInterval(lockTimer); lockTimer = null; }
    gateLockUI.hidden = true;
    gateMain.hidden = false; // các dòng chữ của màn chính tự chạy hiệu ứng hiện dần
  }
  if (isStillLocked()) {
    gateMain.hidden = true;
    gateLockUI.hidden = false;
    if (G.lockKicker) $('#lockKicker').textContent = G.lockKicker;
    if (G.lockTitle) $('#lockTitle').textContent = G.lockTitle;
    if (G.lockHint) $('#lockHint').textContent = G.lockHint;
    const pad = (n) => String(n).padStart(2, '0');
    const lockTick = () => {
      const left = UNLOCK - Date.now();
      if (left <= 0) return unlockGate(); // tới 0:00 — mở trang ngay cả khi em đang chờ sẵn
      $('#lkH').textContent = pad(Math.floor(left / 36e5));
      $('#lkM').textContent = pad(Math.floor((left % 36e5) / 6e4));
      $('#lkS').textContent = pad(Math.floor((left % 6e4) / 1e3));
    };
    lockTick();
    lockTimer = setInterval(lockTick, 250);
  }
  function revealObserve() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach((el) => obs.observe(el));
  }
  function enter() {
    document.body.classList.remove('is-locked');
    gate.classList.add('is-hidden');
    content.classList.add('is-visible');
    content.removeAttribute('aria-hidden');
    musicBtn.classList.add('is-shown');
    playMusic();
    window.startLyrics();
    heroVideo.play && heroVideo.play().catch(() => {});
    setTimeout(() => { gate.style.display = 'none'; }, 1200);
    setTimeout(revealObserve, 150);
  }
  $('#openBtn').addEventListener('click', enter);
})();
