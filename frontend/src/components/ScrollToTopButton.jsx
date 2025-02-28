import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Cette fonction est appelée lorsque l'utilisateur fait défiler la page
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true); // Affiche le bouton si l'utilisateur a défilé plus de 300px
    } else {
      setShowButton(false); // Cache le bouton si l'utilisateur est tout en haut
    }
  };

  // Cette fonction permet de faire défiler la page jusqu'en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Ajoute un défilement fluide
    });
  };

  // On utilise useEffect pour ajouter l'écouteur d'événements de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // On nettoie l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-10 z-50 ${showButton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 bg-orange-500 md:bg-orange-400 text-white rounded-full shadow-lg hover:bg-orange-500 focus:outline-none"
        aria-label="Retour en haut"
      >
        <span className="text-2xl">&uarr;</span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
