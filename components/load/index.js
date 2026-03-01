import { useLoadLogic } from './logic';
import styles from './styles.module.css';

const imgCardA = 'https://www.figma.com/api/mcp/asset/879db829-92ed-4c86-9cb1-67f88f3a2d4b';
const imgCardB = 'https://www.figma.com/api/mcp/asset/09816a73-0c41-4547-a09f-56d92866ceaf';
const imgCardC = 'https://www.figma.com/api/mcp/asset/b8dabb5e-9c89-4242-9166-0c69fca4be89';

const cx = (...names) => names.filter(Boolean).map((n) => styles[n]).filter(Boolean).join(' ');

function LoadingAnimSet({ swayLastCard = false }) {
  return (
    <>
      <div className={cx('load-card', 'a')} aria-hidden="true">
        <img src={imgCardA} alt="" />
      </div>
      <div className={cx('load-card', 'b')} aria-hidden="true">
        <img src={imgCardB} alt="" />
      </div>
      <div className={cx('load-card', 'c', swayLastCard && 'sway')} aria-hidden="true">
        <img src={imgCardC} alt="" />
      </div>
    </>
  );
}

export default function LoadScreen() {
  useLoadLogic();

  return (
    <div className={styles['load-figma-page']}>
      <div className={styles['load-anim-layer']} aria-hidden="true">
        <div className={styles['load-anim-track']}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <LoadingAnimSet />
          </div>
          <div style={{ position: 'absolute', inset: 0, transform: 'translateY(50%)' }}>
            <LoadingAnimSet swayLastCard />
          </div>
        </div>
      </div>

      <div className={styles['load-figma-title']}>
        <p style={{ margin: 0 }}>감상평과 어울리는 엽서를</p>
        <p style={{ margin: 0 }}>탐색하고 있어요</p>
      </div>

      <div className={styles['load-indicator']} aria-hidden="true">
        <span className={styles['load-dot']} />
        <span className={cx('load-dot', 'active')} />
        <span className={styles['load-dot']} />
      </div>
    </div>
  );
}

