import styles from "./LatestExerciseAddedSection.module.css";
export default function LatestExerciseAddedSection({latestExerciseAdded}) {

const {description, duration, date, _id, username} = latestExerciseAdded;

    return (
        <section className={styles.LatestExerciseAddedSection}>
        <p>{_id}</p>
        <p>{username}</p>
        <p>{description}</p>
        <p>{duration}</p>
        <p>{date}</p>
        </section>
    )
}