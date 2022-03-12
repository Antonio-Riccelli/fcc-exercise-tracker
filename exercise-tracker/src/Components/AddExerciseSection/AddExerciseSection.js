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
            <h3>Add exercises</h3>
            <p><code>POST /api/users/:_id/exercises</code></p>
            <input id="userid" type="text" name="id" placeholder=":_id" />
            <input id="desc" type="text" name="description" placeholder="description*" />
            <input id="dur" type="text" name="duration" placeholder="duration* (mins.)" />
            <input id="date" type="text" name="date" placeholder="date (yyyy-mm-dd)" />
            <input type="submit" value="Submit" className={styles.submitButton}  />
        </form>

    )
}