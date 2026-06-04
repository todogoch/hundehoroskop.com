/**
 * Interaktiver Sternenhimmel & Konstellationen Canvas-Hintergrund für Hundehoroskop.com
 */

export function initConstellations(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animationFrameId;

  // Spezifische Sternbilder (z.B. Pfotenabdruck) relativ positioniert
  const pawConstellation = [
    { x: 0.5, y: 0.25 }, // Ballen oben links
    { x: 0.45, y: 0.35 },
    { x: 0.55, y: 0.35 },
    { x: 0.5, y: 0.45 },
    // Pfoten-Ballen unten
    { x: 0.4, y: 0.55 },
    { x: 0.45, y: 0.65 },
    { x: 0.55, y: 0.65 },
    { x: 0.6, y: 0.55 },
    { x: 0.5, y: 0.58 }
  ];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  class Star {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.5;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.alpha = this.baseAlpha;
      this.flickerSpeed = Math.random() * 0.02 + 0.005;
      this.flickerDir = Math.random() > 0.5 ? 1 : -1;
      this.speedX = (Math.random() - 0.5) * 0.08;
      this.speedY = (Math.random() - 0.5) * 0.08;
    }

    update() {
      // Bewegung
      this.x += this.speedX;
      this.y += this.speedY;

      // Grenzen prüfen
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Funkeln
      this.alpha += this.flickerSpeed * this.flickerDir;
      if (this.alpha > 0.8) {
        this.alpha = 0.8;
        this.flickerDir = -1;
      } else if (this.alpha < 0.1) {
        this.alpha = 0.1;
        this.flickerDir = 1;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha})`; // Warmes Gold/Amber
      ctx.fill();

      // Zarter Schein für größere Sterne
      if (this.size > 1.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha * 0.15})`;
        ctx.fill();
      }
    }
  }

  function initStars() {
    stars = [];
    const density = (canvas.width * canvas.height) / 9000;
    const numStars = Math.min(Math.max(density, 60), 200);

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }
  }

  function drawConnections() {
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Verbinde nahe beieinander liegende Sterne schwach
        if (distance < 110) {
          const alpha = (1 - distance / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`; // Goldene Verbindungslinien
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Interaktion mit der Maus
      if (mouse.x !== null && mouse.y !== null) {
        const dx = stars[i].x - mouse.x;
        const dy = stars[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const alpha = (1 - distance / mouse.radius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`; // Hellerer Goldton bei Mausnähe
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Zeichne das magische Hunde-Pfoten Sternbild im Hintergrund
  function drawPawConstellation() {
    const centerX = canvas.width * 0.15; // Platziert auf der linken Seite
    const centerY = canvas.height * 0.4;
    const scale = Math.min(canvas.width, canvas.height) * 0.15;

    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(245, 158, 11, 0.4)";

    // Berechne reale Pixel-Koordinaten
    const points = pawConstellation.map(p => ({
      x: centerX + (p.x - 0.5) * scale,
      y: centerY + (p.y - 0.5) * scale
    }));

    // Zeichne Verbindungslinien des Sternbilds
    ctx.beginPath();
    // Zehen-Verbindungen
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[0].x, points[0].y);

    // Hauptballen Verbindungen
    ctx.moveTo(points[4].x, points[4].y);
    ctx.lineTo(points[5].x, points[5].y);
    ctx.lineTo(points[6].x, points[6].y);
    ctx.lineTo(points[7].x, points[7].y);
    ctx.lineTo(points[8].x, points[8].y);
    ctx.closePath();

    ctx.strokeStyle = "rgba(245, 158, 11, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Zeichne die Stern-Hauptknoten des Sternbilds
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 191, 36, 0.8)";
      ctx.fill();

      // Pulsierender Lichtkreis drumherum
      const pulseSize = 3 + Math.sin(Date.now() * 0.002) * 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 191, 36, 0.2)";
      ctx.fill();
    });

    // Sternbild-Beschriftung
    ctx.fillStyle = "rgba(251, 191, 36, 0.35)";
    ctx.font = "italic 11px 'Outfit', sans-serif";
    ctx.fillText("Canis Majoris (Paws)", centerX - 50, centerY + (scale * 0.3) + 20);

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichne Sternbild
    drawPawConstellation();

    // Zeichne Sterne
    stars.forEach(star => {
      star.update();
      star.draw();
    });

    // Zeichne Linien
    drawConnections();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listener
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Initialisierung
  resizeCanvas();
  animate();

  // Cleanup-Funktion zurückgeben
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
  };
}
