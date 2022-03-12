import {useState} from "react";

export default function ExerciseLog() {
    const [exerciseLog, setExerciseLog] = useState({});

    const handleSubmit = (e) => {
        
    }

    return (
        <section>
            <form encType="multipart/form" onSubmit>
            <input type="text" placeholder="Enter username id" />
            <input type="submit" value="submit">Retrieve Exercise Log</input>
            </form>
            {exerciseLog};
        </section>
    )
}