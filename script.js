const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

const text = 'i love u';

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff0077';
    ctx.font = fontSize + 'px sans-serif';

    for (let i = 0; i < drops.length; i++) {
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    fireworks.forEach(fire => fire.update());
    fireworks = fireworks.filter(fire => !fire.done);
}

setInterval(draw, 60);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ---- Efeito fogos ----

let fireworks = [];

class Particle {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.alpha = 1;
    }

    update() {
        const rad = this.angle * (Math.PI / 180);
        this.x += Math.cos(rad) * this.speed;
        this.y += Math.sin(rad) * this.speed;
        this.alpha -= 0.02;

        ctx.fillStyle = `rgba(255, 0, 120, ${this.alpha})`;
        ctx.font = '15px sans-serif';
        ctx.fillText('i love u', this.x, this.y);
    }

    get done() {
        return this.alpha <= 0;
    }
}

canvas.addEventListener('click', (e) => {
    const firework = [];
    const particles = 40;
    for (let i = 0; i < particles; i++) {
        const angle = Math.random() * 360;
        const speed = Math.random() * 4 + 2;
        firework.push(new Particle(e.clientX, e.clientY, angle, speed));
    }
    fireworks.push(...firework);
});
