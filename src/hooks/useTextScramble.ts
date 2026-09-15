import { useState, useCallback, useRef, useEffect } from 'react';

const CYBER_CHARS = '0123456789ABCDEF_//-+=#*[]<>';

export function useTextScramble(finalText: string, speed = 25) {
  const [displayText, setDisplayText] = useState(finalText);
  const intervalRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return finalText[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      }

      iteration += 1 / 2;
    }, speed);
  }, [finalText, speed]);

  useEffect(() => {
    setDisplayText(finalText);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [finalText]);

  return { displayText, triggerScramble: trigger };
}
