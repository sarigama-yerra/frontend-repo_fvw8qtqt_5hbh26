import { useEffect, useMemo, useState } from 'react';

const CHARS = '!<>-_\/[]{}—=+*^?#________';

export default function DecryptText({ text = '', className = '', speed = 20, delay = 0 }) {
  const [output, setOutput] = useState('');
  const iterations = useMemo(() => text.length + 8, [text]);

  useEffect(() => {
    let frame = 0;
    let raf;
    const start = performance.now() + delay;

    function tick(now) {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - start) / (iterations * speed));
      const revealCount = Math.floor(progress * text.length);

      let next = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          next += text[i];
        } else if (text[i] === ' ') {
          next += ' ';
        } else {
          next += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setOutput(next);

      frame++;
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, delay, iterations]);

  return (
    <span className={className} aria-label={text}>
      {output}
    </span>
  );
}
