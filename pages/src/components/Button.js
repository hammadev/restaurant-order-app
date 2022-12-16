import React from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
    
  const handleConfetti = () => {
    confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
  };

  return (
    <Button
      auto
      rounded
      ripple={false}
      size="sm"
      onClick={handleConfetti}
      css={{
        paddingHorizontal:10,
      }}
    >
      Add to Cart
    </Button>
  );
};

export default CustomButton;