import { useRef, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SWIPE_THRESHOLD = 30;

export function useLandingLogic() {
  const router = useRouter();
  const startY = useRef(0);
  const touchActive = useRef(false);
  const isTransitioning = useRef(false);

  // 0: 초기, 1: text박스 상태(멈춤), 2: 이동 중
  const [phase, setPhase] = useState(0);

  const expandToTextBox = useCallback(() => {
    if (phase !== 0 || isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase(1);
    isTransitioning.current = false;
  }, [phase]);

  const goToTextPage = useCallback(() => {
    if (phase !== 1 || isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase(2);
    setTimeout(() => router.push('/text'), 900);
  }, [phase, router]);

  const handleAction = useCallback(() => {
    if (phase === 0) expandToTextBox();
    else if (phase === 1) goToTextPage();
  }, [phase, expandToTextBox, goToTextPage]);

  const handleTouchStart = useCallback((e) => {
    touchActive.current = true;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (e.changedTouches?.[0] && startY.current - e.changedTouches[0].clientY > SWIPE_THRESHOLD) {
        handleAction();
      }
      touchActive.current = false;
    },
    [handleAction]
  );

  const handleMouseDown = useCallback((e) => {
    startY.current = e.clientY;
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      if (startY.current - e.clientY > SWIPE_THRESHOLD) handleAction();
    },
    [handleAction]
  );

  const handleWheel = useCallback(
    (e) => {
      if (e.deltaY < -15) {
        e.preventDefault();
        handleAction();
      }
    },
    [handleAction]
  );

  const handleClick = useCallback(() => {
    handleAction();
  }, [handleAction]);

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!touchActive.current || !e.touches.length) return;
      const currentY = e.touches[0].clientY;
      if (startY.current - currentY > SWIPE_THRESHOLD) {
        e.preventDefault();
        touchActive.current = false;
        handleAction();
      }
    };
    const onTouchEnd = () => {
      touchActive.current = false;
    };
    const onWheel = (e) => {
      if (e.deltaY < -15) {
        e.preventDefault();
        handleAction();
      }
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
    document.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('wheel', onWheel);
    };
  }, [handleAction]);

  return {
    phase,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleWheel,
    handleClick,
  };
}

