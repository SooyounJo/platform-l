import { useTextLogic } from './logic';
import styles from './styles.module.css';

const cx = (...names) => names.filter(Boolean).map((n) => styles[n]).filter(Boolean).join(' ');

export default function TextScreen() {
  const {
    inputValue,
    setInputValue,
    textareaRef,
    syncTextareaHeight,
    dateText,
    isExiting,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
  } = useTextLogic();

  return (
    <div className={styles['text-figma-page']} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onWheel={handleWheel}>
      <div className={cx('text-figma-card', isExiting && 'text-figma-card-exit')}>
        <div className={styles['text-figma-indicator']}>
          <span className={styles['text-figma-dot']} />
          <span className={cx('text-figma-dot', 'active')} aria-current="true" />
          <span className={styles['text-figma-dot']} />
        </div>

        <h2 className={styles['text-figma-question']}>
          <p>무라카미 하루키에게</p>
          <p>딱 한 문장만 보낼 수 있다면</p>
          <p>무엇을 말하고 싶으세요?</p>
        </h2>

        <div className={styles['text-figma-quote-block']}>
          <span className={styles['text-figma-quote-open']}>&apos;</span>
          <div className={styles['text-figma-quote-wrap']}>
            <textarea
              ref={textareaRef}
              className={styles['text-figma-quote-input']}
              placeholder="여기에 한 문장을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onInput={syncTextareaHeight}
              onClick={() => textareaRef.current?.focus()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
              rows={2}
              maxLength={120}
              aria-label="무라카미 하루키에게 보낼 한 문장"
            />
          </div>
          <span className={styles['text-figma-quote-close']}>&apos;</span>
        </div>

        <span className={styles['text-figma-date']}>{dateText}</span>
      </div>

      {inputValue.trim().length > 0 && (
        <p className={styles['text-figma-slide-hint']}>
          <span>위로 슬라이드 하여</span>
          <br />
          <span>미디어 월로 전송</span>
        </p>
      )}
    </div>
  );
}

