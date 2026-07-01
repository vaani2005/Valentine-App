export default function MemoryGallery() {
  const images = [
    {
      src: "public/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.avif",
      msg: "best time ever",
    },
    {
      src: "public/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.webp",
      msg: "love timme spending with you",
    },
    {
      src: "public/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.avif",
      msg: "best time ever",
    },
    {
      src: "public/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.webp",
      msg: "love timme spending with you",
    },
    {
      src: "public/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.avif",
      msg: "best time ever",
    },
    {
      src: "public/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.webp",
      msg: "love timme spending with you",
    },
    {
      src: "public/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.avif",
      msg: "best time ever",
    },
    {
      src: "public/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.webp",
      msg: "love timme spending with you",
    },
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
