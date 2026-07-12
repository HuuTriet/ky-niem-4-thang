/* ============================================================
   EFFECTS — một canvas duy nhất, một vòng lặp duy nhất.
   Bụi sáng ấm trôi chậm + sao băng hiếm + confetti khi có sự kiện.
   Tối ưu cho điện thoại: sprite vẽ sẵn (không shadowBlur mỗi khung),
   số hạt ít trên màn hình nhỏ, tự dừng khi tab ẩn.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('fx');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  const isMobile = Math.min(window.innerWidth, window.innerHeight) < 700;

  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  const W = () => window.innerWidth, H = () => window.innerHeight;

  /* ---- Sprite vẽ sẵn (glow tính 1 lần, không tính mỗi khung) ---- */
  function makeGlowSprite(size, color) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(0.4, color.replace('1)', '.5)'));
    grad.addColorStop(1, color.replace('1)', '0)'));
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }
  const SPRITES = [
    makeGlowSprite(28, 'rgba(233,201,139,1)'),   // vàng champagne
    makeGlowSprite(24, 'rgba(243,236,221,1)'),   // kem
    makeGlowSprite(26, 'rgba(217,164,65,1)'),    // hổ phách
  ];

  /* ---- Bụi sáng trôi ---- */
  const DUST_N = reduceMotion ? 0 : (isMobile ? 34 : 64);
  const dust = [];
  for (let i = 0; i < DUST_N; i++) {
    dust.push({
      x: Math.random() * W(), y: Math.random() * H(),
      s: Math.random() * 0.55 + 0.2,              // scale
      vy: -(Math.random() * 0.16 + 0.04),
      vx: (Math.random() - 0.5) * 0.08,
      ang: Math.random() * Math.PI * 2,           // hướng bay riêng của từng con
      bs: 0.1 + Math.random() * 0.16,             // tốc độ trôi nền (không bị ma sát ăn mòn)
      a: Math.random() * 0.5 + 0.2,
      tw: Math.random() * Math.PI * 2,
      tws: Math.random() * 0.015 + 0.004,
      sp: SPRITES[i % SPRITES.length],
    });
  }

  /* ---- Đom đóm bị "hút" nhẹ về phía con trỏ (desktop) ---- */
  const mouse = { x: -9999, y: -9999, active: false };
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
    }, { passive: true });
    window.addEventListener('mouseleave', () => { mouse.active = false; mouse.x = -9999; });
  }
  // Trên điện thoại: đom đóm né NGÓN TAY — chạm/vuốt tới đâu né tới đó
  if (!reduceMotion) {
    const touch = (e) => {
      const t = e.touches[0];
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY; mouse.active = true; }
    };
    window.addEventListener('touchstart', touch, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });
    window.addEventListener('touchend', () => { mouse.active = false; mouse.x = -9999; }, { passive: true });
  }

  /* ---- Sao băng hiếm ---- */
  const shootings = [];
  function spawnShooting() {
    if (reduceMotion) return;
    const side = Math.random() < 0.5 ? 1 : -1;                 // bay sang phải / trái
    const angle = (25 + Math.random() * 40) * Math.PI / 180;   // 25–65° chéo xuống
    const dx = side * Math.cos(angle), dy = Math.sin(angle);
    let x, y;
    if (Math.random() < 0.7) {          // xuất phát rải khắp mép trên
      x = Math.random() * W(); y = -20;
    } else {                             // hoặc từ mép bên, phần trên
      x = side > 0 ? -30 : W() + 30; y = Math.random() * H() * 0.4;
    }
    shootings.push({ x: x, y: y, dx: dx, dy: dy, len: 0, speed: 7 + Math.random() * 5, life: 1 });
    setTimeout(spawnShooting, 1600 + Math.random() * 2600);    // thường xuyên hơn, rải rác
  }
  setTimeout(spawnShooting, 1500);

  /* ---- Confetti (chỉ khi có sự kiện) ---- */
  const confetti = [];
  const CONF_COLORS = ['#d9a441', '#e9c98b', '#f3ecdd', '#c98a8a', '#ffffff'];
  function burst(x, y, amount) {
    if (reduceMotion) return;
    x = x != null ? x : W() / 2;
    y = y != null ? y : H() / 2;
    amount = Math.min(amount || 50, isMobile ? 45 : 80);
    for (let i = 0; i < amount; i++) {
      const heart = Math.random() < 0.4;
      confetti.push({
        x, y,
        vx: (Math.random() - 0.5) * 8.5,
        vy: Math.random() * -8.5 - 3,
        g: 0.22 + Math.random() * 0.1,
        size: Math.random() * 8 + 5,
        rot: Math.random() * Math.PI * 2,
        rotS: (Math.random() - 0.5) * 0.25,
        color: CONF_COLORS[(Math.random() * CONF_COLORS.length) | 0],
        heart, life: 1,
      });
    }
  }
  function rain() {
    let n = 0;
    const t = setInterval(() => {
      burst(Math.random() * W(), -10, 10);
      if (++n > 8) clearInterval(t);
    }, 200);
  }

  /* ---- Vòng lặp duy nhất ---- */
  function frame() {
    ctx.clearRect(0, 0, W(), H());

    for (const d of dust) {
      d.tw += d.tws;
      let glow = 0;
      // Trôi chậm, lộn xộn: hướng bay riêng xoay dần + chút gia tốc ngẫu nhiên
      // (ma sát bên dưới chỉ ăn vào phần vx/vy, KHÔNG ăn vào tốc độ trôi nền bs
      //  — trước đây vận tốc bị ma sát nuốt hết nên đom đóm gần như đứng yên)
      d.ang += (Math.random() - 0.5) * 0.07;
      d.vx += (Math.random() - 0.5) * 0.02;
      d.vy += (Math.random() - 0.5) * 0.02;
      // Đom đóm NÉ chuột: hạt gần con trỏ bị đẩy ra xa và sáng lên
      if (mouse.active) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y; // hướng TỪ con trỏ ra hạt
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 26000 && dist2 > 1) { // trong bán kính ~160px
          const dist = Math.sqrt(dist2);
          const push = (1 - dist / 160) * 0.85;
          d.vx += (dx / dist) * push;
          d.vy += (dy / dist) * push;
          glow = (1 - dist / 160) * 0.55;
        }
      }
      // Ma sát + giới hạn tốc độ để luôn trôi chậm
      d.vx *= 0.975; d.vy *= 0.975;
      d.vx = Math.max(-0.6, Math.min(0.6, d.vx));
      d.vy = Math.max(-0.6, Math.min(0.6, d.vy));
      d.x += d.vx + Math.cos(d.ang) * d.bs;
      d.y += d.vy + Math.sin(d.ang) * d.bs * 0.9 - 0.03; // hơi chếch lên như đom đóm thật
      // Bọc quanh mọi cạnh
      if (d.x < -20) d.x = W() + 16; else if (d.x > W() + 20) d.x = -16;
      if (d.y < -20) d.y = H() + 16; else if (d.y > H() + 20) d.y = -16;
      ctx.globalAlpha = Math.max(0, Math.min(1, d.a + Math.sin(d.tw) * 0.22 + glow));
      const sz = d.sp.width * d.s * (1 + glow * 0.7);
      ctx.drawImage(d.sp, d.x, d.y, sz, sz);
    }
    ctx.globalAlpha = 1;

    for (let i = shootings.length - 1; i >= 0; i--) {
      const sh = shootings[i];
      sh.x += sh.dx * sh.speed; sh.y += sh.dy * sh.speed;
      sh.len = Math.min(sh.len + 6, 150);
      sh.life -= 0.013;
      const tx = sh.x - sh.dx * sh.len, ty = sh.y - sh.dy * sh.len;
      const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
      grad.addColorStop(0, 'rgba(233,201,139,' + Math.max(0, sh.life) + ')');
      grad.addColorStop(1, 'rgba(233,201,139,0)');
      ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
      if (sh.life <= 0 || sh.y > H() + 40 || sh.x < -60 || sh.x > W() + 60) shootings.splice(i, 1);
    }

    for (let i = confetti.length - 1; i >= 0; i--) {
      const p = confetti[i];
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.rotS; p.life -= 0.009;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; // đặt màu cho cả tim lẫn giấy
      if (p.heart) {
        ctx.font = (p.size + 5) + 'px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('❤', 0, 0);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
      if (p.y > H() + 40 || p.life <= 0) confetti.splice(i, 1);
    }

    requestAnimationFrame(frame);
  }
  frame();

  window.Effects = { burst, rain };
})();
