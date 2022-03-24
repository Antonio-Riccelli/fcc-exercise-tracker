import styles from "./LatestExerciseAddedSection.module.css";
export default function LatestExerciseAddedSection({latestExerciseAdded}) {

const {description, duration, date, _id, username} = latestExerciseAdded;

    return (
        <section className={styles.LatestExerciseAddedSection}>
        <h3 className={styles.sectiontitle}>Latest Exercise Added:</h3>
        <div className={styles.wrapper}>
        <p className={styles.userDataLabel}>ID: <span className={styles.userData}>{_id}</span></p>
        <p className={styles.userDataLabel}>Username: <span className={styles.userData}>{username}</span></p>
        <p className={styles.userDataLabel}>Exercise: <span className={styles.userData}>{description}</span></p>
        <p className={styles.userDataLabel}>Duration: <span className={styles.userData}>{duration}</span></p>
        <p className={styles.userDataLabel}>Date: <span className={styles.userData}>{date}</span></p>
        </div>
        </section>
    )
}