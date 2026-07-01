import { useEffect, useRef, useState } from "react";
const WIN_SCORE = 25;

export default function LoveCatchGame({ setPage }) {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const playerRef = useRef({
    x: 0,
    y: 0,
    w: 100,
    h: 80,
  });

  const heartsRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      const navbarHeight = 150;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - navbarHeight;

      playerRef.current.y = canvas.height - 50;
    }

    resize();
    window.addEventListener("resize", resize);

    class Heart {
      constructor() {
        this.size = Math.random() * 20 + 20;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = -this.size;
        this.speed = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 20 + 340},100%,60%)`;
      }

      draw() {
        ctx.fillStyle = this.color;

        const t = this.size * 0.3;

        ctx.beginPath();

        ctx.moveTo(this.x, this.y + t);

        ctx.bezierCurveTo(
          this.x,
          this.y,
          this.x - this.size / 2,
          this.y,
          this.x - this.size / 2,
          this.y + t,
        );

        ctx.bezierCurveTo(
          this.x - this.size / 2,
          this.y + (this.size + t) / 2,
          this.x,
          this.y + (this.size + t) / 2,
          this.x,
          this.y + this.size,
        );

        ctx.bezierCurveTo(
          this.x,
          this.y + (this.size + t) / 2,
          this.x + this.size / 2,
          this.y + (this.size + t) / 2,
          this.x + this.size / 2,
          this.y + t,
        );

        ctx.bezierCurveTo(
          this.x + this.size / 2,
          this.y,
          this.x,
          this.y,
          this.x,
          this.y + t,
        );

        ctx.fill();
      }

      update() {
        this.y += this.speed;
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.dx = (Math.random() - 0.5) * 5;
        this.dy = (Math.random() - 0.5) * 5;
        this.life = 100;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.life -= 2;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function createParticles(x, y) {
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push(new Particle(x, y));
      }
    }

    function drawPlayer() {
      const p = playerRef.current;

      ctx.fillStyle = "#ff4d6d";

      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y, p.w / 2, 0, Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "#c9184a";
      ctx.lineWidth = 5;
      ctx.arc(p.x + p.w / 2, p.y - 10, p.w / 2, Math.PI, 0);
      ctx.stroke();
    }

    function spawnHeart() {
      if (Math.random() < 0.025) {
        heartsRef.current.push(new Heart());
      }
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPlayer();

      spawnHeart();

      heartsRef.current.forEach((heart, index) => {
        heart.update();
        heart.draw();

        const p = playerRef.current;

        if (
          heart.y + heart.size > p.y &&
          heart.x > p.x &&
          heart.x < p.x + p.w
        ) {
          heartsRef.current.splice(index, 1);

          createParticles(heart.x, heart.y);

          setScore((prev) => {
            const next = prev + 1;

            if (next >= WIN_SCORE) {
              setTimeout(() => {
                setShowProposal(true);
              }, 400);
            }

            return next;
          });
        } else if (heart.y > canvas.height) {
          heartsRef.current.splice(index, 1);
        }
      });

      particlesRef.current.forEach((p, i) => {
        p.update();
        p.draw();

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function move(e) {
      const x = e.touches?.[0]?.clientX ?? e.clientX;

      playerRef.current.x = x - playerRef.current.w / 2;

      if (playerRef.current.x < 0) playerRef.current.x = 0;

      if (playerRef.current.x + playerRef.current.w > canvas.width)
        playerRef.current.x = canvas.width - playerRef.current.w;
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);

    return () => {
      cancelAnimationFrame(animationRef.current);

      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("resize", resize);
    };
  }, [gameStarted]);
  const moveNoButton = (e) => {
    const btn = e.target;

    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 60) + "px";
  };

  const progress = (score / WIN_SCORE) * 100;

  return (
    <div className="love-game">
      <canvas ref={canvasRef} />

      {gameStarted && (
        <div className="score-board">
          <span>❤️ Love Meter</span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p>
            {score} / {WIN_SCORE}
          </p>
        </div>
      )}

      {!gameStarted && (
        <div className="screen">
          <h1>Catch The Love ❤️</h1>

          <p>Catch enough hearts to unlock a special surprise.</p>

          <button
            className="btn"
            onClick={() => {
              heartsRef.current = [];
              particlesRef.current = [];
              setScore(0);
              setGameStarted(true);
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Proposal */}

      {showProposal && !celebrate && (
        <div className="screen">
          <div className="proposal-card">
            <h1>💍 Will You Be My Valentine?</h1>

            <p>You collected all my love... Now I have one question.</p>

            <div className="btn-group">
              <button
                className="yes-btn"
                onClick={() => {
                  setCelebrate(true);
                }}
              >
                YES ❤️
              </button>

              <button
                className="no-btn"
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {celebrate && (
        <div className="screen">
          <div className="celebrate">
            <h1>🎉 She Said YES! 💍</h1>

            <h2>I Love You ❤️</h2>

            <p>I promise to love you forever.</p>

            <h3>
              Hearts Collected
              <br />
              ❤️ {score} / {WIN_SCORE}
            </h3>

            <button
              className="btn"
              onClick={() => {
                heartsRef.current = [];
                particlesRef.current = [];
                setCelebrate(false);
                setShowProposal(false);
                setScore(0);
                setGameStarted(false);
              }}
            >
              Play Again
            </button>

            <div className="end-navigation">
              <button onClick={() => setPage("box")}>💍 Proposal</button>
              <button onClick={() => setPage("journey")}>🌹 Journey</button>
              <button onClick={() => setPage("")}>📸 Memories</button>
              <button onClick={() => setPage("quiz")}>🧠 Quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
