import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, title = "Event Images" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeFullscreen();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  return (
    <div className="image-carousel-container">
      <div className="carousel-header">
        <h3 className="carousel-title">{title}</h3>
        <span className="image-counter">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      <div className="carousel-main">
        <div className="carousel-wrapper">
          <button 
            className="carousel-nav carousel-nav-left" 
            onClick={prevImage}
            disabled={images.length <= 1}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-image-container" onClick={openFullscreen}>
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="carousel-image"
            />
            <div className="image-overlay">
              <span className="zoom-hint">Click to view fullscreen</span>
            </div>
          </div>

          <button 
            className="carousel-nav carousel-nav-right" 
            onClick={nextImage}
            disabled={images.length <= 1}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="carousel-thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div 
          className="fullscreen-modal" 
          onClick={closeFullscreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="fullscreen-close" 
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
            
            <button 
              className="fullscreen-nav fullscreen-nav-left" 
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="fullscreen-image"
            />

            <button 
              className="fullscreen-nav fullscreen-nav-right" 
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <div className="fullscreen-info">
              <span className="fullscreen-counter">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
