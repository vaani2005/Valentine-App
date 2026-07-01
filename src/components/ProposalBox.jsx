import { useState } from "react";
import "./ProposalBox.css";

export default function ProposalBox() {
  const [opened, setOpened] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const hearts = [
    "❤️",
    "💖",
    "💕",
    "💘",
    "💗",
    "💝",
    "💞",
    "❤️",
    "💖",
    "💕",
    "💘",
    "💗",
    "💝",
    "💞",
  ];

  const spawnHeart = (x, y) => {
    const el = document.createElement("div");
    el.className = "cracker";
    el.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${24 + Math.random() * 20}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 300;

    el.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    el.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(el);

    el.addEventListener("animationend", () => el.remove());
  };

  const burstFromEdges = (w, h, count = 40) => {
    const edges = [
      () => spawnHeart(Math.random() * w, 0),
      () => spawnHeart(Math.random() * w, h),
      () => spawnHeart(0, Math.random() * h),
      () => spawnHeart(w, Math.random() * h),
    ];

    edges.forEach((fn) => {
      for (let i = 0; i < count; i++) {
        setTimeout(fn, i * 10);
      }
    });
  };

  const burstFromCorners = (w, h) => {
    const corners = [
      [0, 0],
      [w, 0],
      [0, h],
      [w, h],
    ];

    corners.forEach(([x, y]) => {
      for (let i = 0; i < 25; i++) {
        spawnHeart(x, y);
      }
    });
  };

  const launchCrackers = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    burstFromEdges(w, h, 100);
    burstFromCorners(w, h);
  };

  const handleOpen = () => {
    if (!opened) setOpened(true);
  };

  const handleYes = (e) => {
    e.stopPropagation();
    if (celebrated) return;

    setCelebrated(true);
    launchCrackers();
  };

  return (
    <>
      <div className="top-header">
        <h1 className="page-title">A Little Something For You 🤍</h1>
      </div>
      <div className={`proposal-page ${opened ? "opened" : ""}`}>
        {!opened ? (
          <div className="proposal-container" onClick={handleOpen}>
            <div className="gift-box">
              <div className="lid">
                <div className="bow" />
                <div className="lid-glow" />
              </div>

              <div className="box-body">
                <div className="ribbon-horizontal" />
                <div className="ribbon-vertical" />

                <div className="box-label">
                  <span className="emoji">🎁</span>
                  <span>Open Me</span>
                  <span className="spark">✨</span>
                </div>
              </div>

              <div className="shadow" />
            </div>
          </div>
        ) : (
          <div className="letter-container">
            <div className="message">
              <div className="letter-date">💌 Made With Love</div>

              <h1>To My Dearest Moon 🤍</h1>

              <div className="divider" />

              <p>
                Some people quietly become our favorite place.
                <br />
                <strong>You became mine.</strong>
              </p>

              <p>
                Since you came into my life, everything feels warmer, brighter,
                and more meaningful.
              </p>

              <div className="proposal-question">
                If forever had a name...
                <span>✨ It would be Us ✨</span>
              </div>

              <p>
                I don’t know what tomorrow holds, but I know I want you in all
                of it.
              </p>

              <div className="signature">
                With all my heart,
                <span>❤️ Yours, Always ❤️</span>
              </div>

              <button className="yes-btn" onClick={handleYes}>
                {celebrated ? "💖 Forever Yours" : "Yes, I Will! 💍"}
              </button>

              {celebrated && (
                <p className="hint-text">
                  Click on the charms to get more surprises ✨
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
