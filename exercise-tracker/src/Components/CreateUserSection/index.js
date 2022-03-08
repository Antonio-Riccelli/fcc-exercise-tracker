import {useEffect, useState} from "react";

export default function CreateUser({url, setCreatedUser, createdUser}) {
    const [userName, setUserName] = useState("")

    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": userName})
    }

    const handleChange = (e) => {
        console.log(userName);
        setUserName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("You are sending this:", userName);
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setCreatedUser(data);
    }



    return (
        <>
        <form action="/api/users">
        <h3>Create a New User</h3>
        <input id="uname" type="text" name="username" placeholder="username" onChange={handleChange} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <div>
            {createdUser.username}
      </div>
      </>
    )
}