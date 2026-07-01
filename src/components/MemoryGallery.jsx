export default function MemoryGallery() {
  const travelImage =
    "/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.webp";

  const images = [
    { src: travelImage, msg: "Best time ever ❤️" },
    { src: travelImage, msg: "Loved spending time with you 💕" },
    { src: travelImage, msg: "Every moment was special ✨" },
    { src: travelImage, msg: "You make every trip unforgettable 🌸" },
    { src: travelImage, msg: "Best time ever ❤️" },
    { src: travelImage, msg: "Loved spending time with you 💕" },
    { src: travelImage, msg: "Every moment was special ✨" },
    { src: travelImage, msg: "Forever making memories together 💖" },
  ];
  return (
    <div className="gallery-page">
      <h1>Digital Memory Lane</h1>
      <p className="gallery-subtitle">
        <br></br>✨ Hover over the photos to reveal hidden love messages 💕
      </p>
      <br></br>
      <div className="gallery-grid">
        {images.map((item, i) => (
          <div key={i} className="photo-card">
            <img src={item.src} alt="images" />
            <div className="overlay">{item.msg}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
