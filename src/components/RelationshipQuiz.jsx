import { useState } from "react";

export default function RelationshipQuiz() {
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: "Where did we have our first date?",
      options: ["Park", "Café", "Beach"],
      correct: 1,
    },
    {
      q: "What is my favorite color?",
      options: ["Blue", "Red", "Green"],
      correct: 0,
    },
    {
      q: "Our song is?",
      options: ["Perfect - Ed Sheeran", "Something Else"],
      correct: 0,
    },
    {
      q: "Who said 'I love you' first?",
      options: ["You", "Me", "Both Together"],
      correct: 0,
    },
    {
      q: "What's my favorite food?",
      options: ["Pizza", "Burger", "Pasta"],
      correct: 0,
    },
    {
      q: "Which movie did we watch together first?",
      options: ["Titanic", "Avengers", "Your Choice"],
      correct: 2,
    },
    {
      q: "What's my favorite nickname for you?",
      options: ["Baby", "Love", "Sweetheart"],
      correct: 1,
    },
    {
      q: "Which season reminds me of us?",
      options: ["Summer", "Winter", "Spring"],
      correct: 2,
    },
    {
      q: "What would I choose for our dream vacation?",
      options: ["Mountains", "Beach", "Europe Trip"],
      correct: 1,
    },
    {
      q: "What's the best thing about our relationship?",
      options: ["Trust", "Laughter", "Everything"],
      correct: 2,
    },
  ];

  const handleAnswer = (idx) => {
    const correct = questions[qIndex].correct;
    const correctAnswer = idx === correct;

    setIsCorrect(correctAnswer);
    setAnswered(true);

    if (correctAnswer) {
      setScore((prev) => prev + 1);
      launchHeartBurst();
    }

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex((prev) => prev + 1);
        setAnswered(false);
        setIsCorrect(null);
      } else {
        setQIndex(-1);
      }
    }, 1200);
  };

  const launchHeartBurst = () => {
    const container = document.createElement("div");
    container.className = "heart-burst-container";

    document.body.appendChild(container);

    const emojis = ["❤️", "💖", "💕", "💘", "💗", "💞", "💝"];

    for (let i = 0; i < 250; i++) {
      const heart = document.createElement("span");

      heart.className = "burst-heart";
      heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + 40 + "px";

      heart.style.setProperty(
        "--x",
        `${(Math.random() - 0.5) * window.innerWidth}px`,
      );

      heart.style.setProperty(
        "--y",
        `${-(Math.random() * window.innerHeight + 300)}px`,
      );

      heart.style.fontSize = `${18 + Math.random() * 32}px`;
      heart.style.animationDelay = `${Math.random() * 0.25}s`;
      heart.style.animationDuration = `${2 + Math.random() * 1.5}s`;

      container.appendChild(heart);
    }

    setTimeout(() => {
      container.remove();
    }, 4000);
  };

  if (qIndex === -1) {
    return (
      <div className="quiz-end">
        <h1>💍 Will You Marry Me?</h1>

        <h2>
          You scored <span>{score}</span> / {questions.length}
        </h2>

        {score === questions.length ? (
          <p>Perfect! You know our love story better than anyone. 🥰</p>
        ) : score >= questions.length / 2 ? (
          <p>You know us pretty well! ❤️</p>
        ) : (
          <p>
            Looks like we need to make even more beautiful memories together. 💕
          </p>
        )}

        <button className="yes-btn" onClick={() => alert("She said YES! 💍❤️")}>
          Say YES!
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1>Prove You Know Me ❤️</h1>

      <div className="progress-container">
        <div
          className="progress"
          style={{
            width: `${((qIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <p className="question">
        {qIndex + 1}. {questions[qIndex].q}
      </p>

      <div className="options">
        {questions[qIndex].options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} disabled={answered}>
            {opt}
          </button>
        ))}
      </div>

      {answered && (
        <p className={isCorrect ? "correct" : "wrong"}>
          {isCorrect
            ? "Perfect! 💖"
            : `Oops! The correct answer was "${
                questions[qIndex].options[questions[qIndex].correct]
              }" ❤️`}
        </p>
      )}
    </div>
  );
}
