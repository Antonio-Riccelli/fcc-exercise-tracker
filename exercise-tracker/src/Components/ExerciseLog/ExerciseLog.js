import {useState} from "react";
import axios from "axios";
import styles from "./ExerciseLog.module.css"

export default function ExerciseLog({url}) {
    const [exerciseLog, setExerciseLog] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = e.target.id.value;
        const from = (e.target.from.value) ? e.target.from.value : undefined;
        const to = (e.target.to.value) ? e.target.to.value : undefined;
        const limit = (e.target.limit.value) ? e.target.limit.value : undefined;
        console.log("This is the limit", limit);
        const options = {
            params: {
                "from": from,
                "to": to,
                "limit": limit
            }
        };
        const requestUrl = `${url}/${_id}/logs`;
        const res = await axios.get(requestUrl, options);
        setExerciseLog([res.data]);
        console.log(exerciseLog);
    }

    return (
        <section className={styles.exerciseModuleSection}>
        <h4>Log</h4>
            <form className={styles.formWrapper} encType="multipart/form" onSubmit={handleSubmit}>
            <div className={styles.Inputs}>
            <label htmlFor="id">User ID</label>
            <input type="text" name="id" id="id" placeholder="Enter User ID" className={styles.fieldsInput} />
            <label htmlFor="from">FROM</label>
            <input type="text" name="from" id="from" placeholder="Insert FROM date [YYYY-MM-DD] [optional]" className={styles.fieldsInput} />
            <label htmlFor="to">TO</label>
            <input type="text" name="to" id="to" placeholder="Insert TO date [YYYY-MM-DD] [optional]" className={styles.fieldsInput} />
            <label htmlFor="limit">Limit</label>
            <input type="number" name="limit" id="limit" placeholder="Insert Limit [optional]" min="0" className={styles.fieldsInput} />
            </div>
            <input type="submit" name="submit" className={styles.submitButton} value="Retrieve Log" />
            </form>
            {
                exerciseLog.length ? exerciseLog.map(obj => {
                    return (
                        <section key={obj._id} className={styles.entriesSection}>
                            <p className={styles.entryHeader}>Entries: {obj.count}</p>
                            <section id="log" className={styles.entriesWrapper}>
                               {obj.log.length ? obj.log.map((entry, ind) => {
                                   return (
                                      <section id="entry" key={entry._id} className={styles.entryWrapper}>
                                      <h4 className={styles.entryTitle}>Entry {ind + 1}</h4>
                                          <p className={styles.userDataLabel}>Exercise: <span className={styles.userData}>{entry.description}</span></p>
                                          <p className={styles.userDataLabel}>Duration:  <span className={styles.userData}>{entry.duration}</span></p>
                                          <p className={styles.userDataLabel}>Date:  <span className={styles.userData}>{entry.date}</span></p>

                                      </section> 
                                   )
                               }) : <></>}
                            </section>
                        </section>
                    )
                }) : <></>
            }
        </section>
    )
}


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const _id = e.target.id.value;
//     const description = e.target.description.value;
//     const duration = e.target.duration.value;
//     const date = e.target.date.value;
//     let formData = new FormData();
//     formData.append("description", description);
//     formData.append("duration", duration);
//     formData.append("date", date);
//     const options = {
//         headers: { 'content-type': 'multipart/form-data' }
//     }
//     const URL = `https://fcc-exercise-trackr.herokuapp.com/api/users/${_id}/exercises`
//     console.log(formData);
//     const response = await axios.post(URL, formData, options);
//     setLatestExerciseAdded(response.data);
//     console.log(response);
// }