import {useEffect, useState} from "react";
import axios from 'axios';
import styles from "./CreateUserForm.module.css"

export default function CreateUserForm({url, setCreatedUser, createdUser}) {
    const [userName, setUserName] = useState("")

    //  UPDATE USERNAME AS IT'S TYPED
    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    // SUBMIT FORM DATA 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", userName);
        const options = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        const response = await axios.post(url, formData, options);
        setCreatedUser(response);
    }

    return (
        <form encType="multipart/form" className={styles.CreateUserForm}>
        <h3 className={styles.createUserTitle}>Create a New User</h3>
        <input id="uname" type="text" name="username" placeholder="Username" onChange={handleChange} className={styles.nameInput} />
        <input type="submit" value="Submit" onClick={handleSubmit} className={styles.submitButton}/>
      </form>
    )
}