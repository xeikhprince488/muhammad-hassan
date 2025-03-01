import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    // Generate initial confetti pieces
    const initialPieces: ConfettiPiece[] = [];
    const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB', '#69F0AE'];
    
    for (let i = 0; i < 100; i++) {
      initialPieces.push({
        id: i,
        x: Math.random() * 100, // % of viewport width
        y: -10 - Math.random() * 10, // Start above viewport
        size: Math.random() * 10 + 5, // Size between 5-15px
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 3 + 2
      });
    }
    
    setPieces(initialPieces);
    
    // Animation loop
    let animationId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setPieces(prevPieces => {
        // Move each piece
        const updatedPieces = prevPieces.map(piece => {
          // Update position
          const newY = piece.y + (piece.speedY * deltaTime) / 20;
          const newX = piece.x + (piece.speedX * deltaTime) / 20;
          const newRotation = piece.rotation + (piece.rotationSpeed * deltaTime) / 20;
          
          // Return updated piece or remove if it's off-screen
          return newY > 110 ? null : {
            ...piece,
            y: newY,
            x: newX,
            rotation: newRotation
          };
        }).filter(Boolean) as ConfettiPiece[];
        
        // Stop animation if all pieces are gone
        if (updatedPieces.length === 0) {
          setActive(false);
        }
        
        return updatedPieces;
      });
      
      if (active) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [active]);
  
  if (pieces.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;