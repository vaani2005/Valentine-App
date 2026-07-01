import { useState } from "react";
import JourneyTimeline from "./components/JourneyTimeline";
import MemoryGallery from "./components/MemoryGallery";
import ProposalBox from "./components/ProposalBox";
import RelationshipQuiz from "./components/RelationshipQuiz";
import LoveCatchGame from "./components/LoveChallenge";
import "./App.css";
export default function App() {
  const [page, setPage] = useState("box");
  const [boxOpened, setBoxOpened] = useState(false);

  const floatingButtons = [
    {
      icon: "💍",
      label: "Proposal Box",
      page: "box",
      color: "#FFD6E8",
      top: "10%",
      left: "8%",
    },
    {
      icon: "💍",
      label: "Proposal Box",
      page: "box",
      color: "#FFD6E8",
      top: "78%",
      right: "8%",
    },

    {
      icon: "🌹",
      label: "Our Journey",
      page: "journey",
      color: "#FFE4C7",
      top: "18%",
      right: "10%",
    },
    {
      icon: "🌹",
      label: "Our Journey",
      page: "journey",
      color: "#FFE4C7",
      top: "55%",
      left: "6%",
    },

    {
      icon: "📸",
      label: "Memory Lane",
      page: "gallery",
      color: "#FFF4B8",
      top: "65%",
      right: "22%",
    },
    {
      icon: "📸",
      label: "Memory Lane",
      page: "gallery",
      color: "#FFF4B8",
      top: "35%",
      left: "20%",
    },

    {
      icon: "🧠",
      label: "Love Quiz",
      page: "quiz",
      color: "#D9F7FF",
      top: "78%",
      left: "18%",
    },
    {
      icon: "🧠",
      label: "Love Quiz",
      page: "quiz",
      color: "#D9F7FF",
      top: "10%",
      left: "70%",
    },

    {
      icon: "💘",
      label: "Catch Love",
      page: "loveCatch",
      color: "#EAD8FF",
      top: "42%",
      left: "78%",
    },
    {
      icon: "💘",
      label: "Catch Love",
      page: "loveCatch",
      color: "#EAD8FF",
      top: "12%",
      right: "65%",
    },
  ];
  const renderPage = () => {
    switch (page) {
      case "box":
        return <ProposalBox opened={boxOpened} setOpened={setBoxOpened} />;
      case "journey":
        return <JourneyTimeline />;
      case "gallery":
        return <MemoryGallery />;
      case "quiz":
        return <RelationshipQuiz />;
      case "loveCatch":
        return <LoveCatchGame setPage={setPage} />;
      default:
        return <ProposalBox opened={boxOpened} setOpened={setBoxOpened} />;
    }
  };

  return (
    <div className="app">
      {page !== "loveCatch" && (
        <div className="floating-buttons">
          {floatingButtons.map((btn, i) => (
            <button
              key={i}
              className={`love-bubble bubble-${i}`}
              style={{
                top: btn.top,
                left: btn.left,
                right: btn.right,
              }}
              onClick={() => setPage(btn.page)}
            >
              <span className="bubble-icon">{btn.icon}</span>
              <span className="heart-tooltip">{btn.label}</span>
            </button>
          ))}
        </div>
      )}

      <main>{renderPage()}</main>

      <div className="hearts">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${5 + i * 8}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              opacity: 0.15 + Math.random() * 0.3,
              fontSize: `${20 + Math.random() * 18}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}
