import { useEffect, useRef } from "react";

export default function JourneyTimeline() {
  const moments = [
    {
      year: "2019",
      title: "We Met",
      desc: "At the café on a rainy day...",
      img: "https://picsum.photos/id/64/400/300",
    },
    {
      year: "2020",
      title: "First Date",
      desc: "Beach walk at sunset",
      img: "https://picsum.photos/id/1015/400/300",
    },
    {
      year: "2022",
      title: "Our Trip",
      desc: "Paris memories forever",
      img: "https://picsum.photos/id/106/400/300",
    },
    {
      year: "2024",
      title: "The Promise",
      desc: "You became my home",
      img: "https://picsum.photos/id/180/400/300",
    },
    {
      year: "2026",
      title: "Forever Starts Now",
      desc: "Will you marry me?",
      img: "",
    },
  ];

  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 },
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-page">
      <h1>Our Journey</h1>
      <div className="timeline">
        {moments.map((m, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
          >
            <div className="dot"></div>
            <div className="content">
              <span className="year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              {m.img && <img src={m.img} alt={m.title} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
