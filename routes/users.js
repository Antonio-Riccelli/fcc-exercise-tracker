import express from "express";
import formidable from "formidable";
const router = express.Router();
let counter = 0;

let users = [];

/* GET users listing. */
router.get("/users", function (req, res, next) {
  res.send({users});
});

router.post("/users", function (req, res, next) {
  // const username = req.header("multipart/form-data; boundary=--------------------------317532435480573421405367");
  const form = formidable({multiples: true});
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields.username);
    const username = fields.username;
    const id = counter;
    users.push({"username": username, "_id": id})
    console.log(users);
    counter += 1;
    res.send({"username": username, "_id": id})
   
  })
  
})

export default router;
