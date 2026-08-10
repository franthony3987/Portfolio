import { useEffect } from 'react';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    let settleTimer;

    const handlePointerMove = ({ clientX, clientY }) => {
      document.documentElement.style.setProperty('--pointer-x', `${clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${clientY}px`);
      document.documentElement.style.setProperty('--pointer-opacity', '1');
      document.documentElement.style.setProperty('--lattice-lift', '-12px');

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty('--pointer-opacity', '0');
        document.documentElement.style.setProperty('--lattice-lift', '0px');
      }, 160);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return <div className="app-shell"><Home /></div>;
}

export default App;
