import React, { useState, useEffect, useRef } from 'react';
import './GallerySection.css';

function GallerySection({ galleryImages }) {
  const scrollContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current || galleryImages.length === 0) return;

    const container = scrollContainerRef.current;
    let scrollPosition = 0;
    let animationFrameId;

    const autoScroll = () => {
      if (!isHovering) {
        scrollPosition += 1;
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, galleryImages.length]);

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section className="gallery-section">
      <div className="gallery-section-header">
        <h2 className="gallery-section-title">✨ Our Gallery</h2>
        <p className="gallery-section-subtitle">Browse our finest collection</p>
      </div>

      <div
        className="gallery-section-container"
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="gallery-scroll-track">
          {galleryImages.map((item, index) => (
            <div
              key={item._id || index}
              className="gallery-scroll-card"
              style={{
                animation: `fadeInUp 0.6s ease ${index * 0.08}s both`,
              }}
            >
              <div className="gallery-card-inner">
                <div className="gallery-card-image">
                  {item.image ? (
                    <img src={item.image} alt={`Gallery item ${index + 1}`} />
                  ) : (
                    <span className="gallery-card-emoji">📦</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
