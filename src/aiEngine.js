const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

export const rules = [];
export const particles = [];

const draw = (x, y, c, s) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, s, s);
};

const particle = (x, y, c, s) => {
  return {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    color: c,
    size: s,
  };
};

export const addRule = (from, to, g) => {
  const rule = { from: from, to: to, g: g };
  rules.push(rule);
  return rule;
};

const random = () => {
  return Math.random() * 500;
};

export const createParticlesGroup = (number, color, size, name) => {
  const group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color, size));
  }
  particles.push(...group);
  return { name: name, particles: group };
};

export const rule = (particles1, particles2, g) => {
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0;
    let fy = 0;
    const a = particles1[i];
    for (let j = 0; j < particles2.length; j++) {
      const b = particles2[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0 && d < 80) {
        const F = -g / d;
        fx += F * dx;
        fy += F * dy;
      }
    }
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 || a.x >= canvas.width) a.vx *= -1;
    if (a.y <= 0 || a.y >= canvas.width) a.vy *= -1;
  }
};

export const update = () => {
  rules.forEach((ruleEl) =>
    rule(ruleEl.from.particles, ruleEl.to.particles, ruleEl.g)
  );
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  draw(0, 0, 'black', canvas.width);
  particles.forEach((particle) =>
    draw(particle.x, particle.y, particle.color, particle.size)
  );
  requestAnimationFrame(update);
};
