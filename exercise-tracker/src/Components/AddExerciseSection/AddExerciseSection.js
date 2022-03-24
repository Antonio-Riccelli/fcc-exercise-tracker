import axios from "axios";
import styles from "./AddExerciseSection.module.css";

export default function AddExerciseSection({setLatestExerciseAdded}) {
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = e.target.id.value;
        const description = e.target.description.value;
        const duration = e.target.duration.value;
        const date = e.target.date.value;
        let formData = new FormData();
        formData.append("description", description);
        formData.append("duration", duration);
        formData.append("date", date);
        const options = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        const URL = `https://fcc-exercise-trackr.herokuapp.com/api/users/${_id}/exercises`
        console.log(formData);
        const response = await axios.post(URL, formData, options);
        setLatestExerciseAdded(response.data);
        console.log(response);
    }

    return (

        <form id="addExerciseSection" method="post" encType="multipart/form" className={styles.AddExerciseSection} onSubmit={handleSubmit}>
            <h3>Add Exercises</h3>
            <div className={styles.Inputs}>
            <label htmlFor="id" >User ID </label>
            <input id="userid" type="text" name="id"  className={styles.fieldsInput}/>
            <label htmlFor="description">Exercise</label>
            <input id="desc" type="text" name="description"  className={styles.fieldsInput}/>
            <label htmlFor="duration">Duration (mins.)</label>
            <input id="dur" type="text" name="duration" className={styles.fieldsInput} />
            <label htmlFor="date">Date</label>
            <input id="date" type="text" name="date" placeholder="YYYY-MM-DD"  className={styles.fieldsInput}/>
            </div>
            <input type="submit" value="Submit" className={styles.submitButton}  />
        </form>

    )
}