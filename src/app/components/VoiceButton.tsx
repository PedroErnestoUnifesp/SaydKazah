import { useState } from 'react';
import { Fab } from '@mui/material';
import { Mic } from '@mui/icons-material';
import { motion } from 'motion/react';

export function VoiceButton() {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <motion.div
      animate={
        isListening
          ? {
              scale: [1, 1.1, 1],
            }
          : {}
      }
      transition={{
        duration: 1.5,
        repeat: isListening ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      <Fab
        color="secondary"
        onClick={handleClick}
        sx={{
          width: 56,
          height: 56,
          position: 'relative',
          bgcolor: isListening ? '#ff4081' : '#f50057',
          '&:hover': {
            bgcolor: isListening ? '#ff5a92' : '#f50057',
          },
        }}
      >
        {isListening && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid #ff4081',
              }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid #ff4081',
              }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5,
              }}
            />
          </>
        )}
        <Mic />
      </Fab>
    </motion.div>
  );
}
