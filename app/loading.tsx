import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.plate}>
        <div className={styles.food}></div>
      </div>

      <h2 className={styles.heading}>Restaurant Tracker</h2>

      <p className={styles.text}>Preparing your delicious experience...</p>

      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
