import styles from "./CreatedUserSection.module.css"

export default function CreatedUserSection({ createdUser }) {

    if (Object.keys(createdUser).length) {
        console.log("New user:", createdUser.data)
        return (
            <section className={styles.createdUserWrapper}>
                <h3 className={styles.createdUserTitle}>User created</h3>
                {[createdUser.data].map(obj => {
                    return (
                        <div key={obj._id} className={styles.createdUserData}>
                            <p className={styles.userDataLabel}>Username: <span className={styles.userData}>{obj.username}</span></p>
                            <p className={styles.userDataLabel}>Id: <span className={styles.userData}>{obj._id}</span></p>
                        </div>
                    )
                })}
            </section>
        )
    } else {
        return (
            <></>
        )
    }
}