import express from "express";
import formidable from "formidable";
import url from "url";
const router = express.Router();
let counter = 0;

let users = [];

/* GET users listing. */
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});
router.get('/*', (req, res) => {
  res.redirect('/');
});



router.get("/users", function (req, res, next) {
 let usersArray = users.map(object => {
  const newObj = {"username": object.username, "_id": object._id};
  return newObj;
  });
  res.send({usersArray});
});

router.get("/users/:_id/logs", function (req, res, next) {
  const form = formidable({multiples: true});
  form.parse(req, (err, files) => {
    const id = req.params._id;
    console.log("Id: ", id);
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    const from = queryObject.from;
    const to = queryObject.to;
    const limit = queryObject.limit;
    
    const index = users.findIndex(object => +object._id === +id);
    const retrievedUser = users[index];

    if (from) {
      retrievedUser = retrievedUser.log.filter(obj => {
        const dateString = obj.date;
        const date = new Date(dateString);
        const dateInMilliseconds = date.getTime();
        const fromDate = new Date(from);
        const fromDateInMilliseconds = fromDate.getTime();
        if (to) {
          const toDate = new Date(to);
          const toDateInMilliseconds = toDate.getTime();
          return dateInMilliseconds >= fromDateInMilliseconds && dateInMilliseconds <= toDateInMilliseconds;
        } else {
          return dateInMilliseconds >= fromDateInMilliseconds;
        }
      })
    }

    if (limit) {
      retrievedUser.log = retrievedUser.log.slice(0, limit + 1);
    }

    res.send({retrievedUser});
  })
})

router.post("/users", function (req, res, next) {
  const form = formidable({multiples: true});
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields.username);
    const username = fields.username;
    const id = counter;
    const count = 0;
    users.push({"username": username, "_id": id, "count": count, log: []})
    console.log(users);
    counter += 1;
    res.send({"username": username, "_id": id})
  })
})

router.post("/users/:_id/exercises", function (req, res, next) {
  const form = formidable({multiples:true});
  form.parse(req, (err, fields) => {
    if (err) {
      console.log(err);
      next(err);
      return;
    }
    const id = req.params._id;
    console.log("Id: ", id);
    const description = fields.description;
    console.log("Description: ", description);
    const duration = +fields.duration;
    console.log("Duration: ", duration);
    let date;
    if (fields.date !== undefined) {
      date = fields.date;
    } else {
      date = new Date();
      try {
        date = date.toDateString();
      } catch (err) {
        console.log("Error", err);
      }
    }
    console.log("Date: ", date);
    const index = users.findIndex(object => +object._id === +id);
    console.log("Index: ", index);
    users[index].count = users[index].count + 1;
    const newObj = {"description": description, "duration": duration, "date": date}
    users[index].log.push(newObj);
    res.send({"username": users[index].username, "description": description, "duration": duration, "date": date, "_id": id});
  })
})

export default router;
