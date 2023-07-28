import express from 'express';

const app = express();
const router = express.Router();

/*get all task*/
router.get("/", (req, res) => {

});

/*save a task*/
router.post("/:taskId", (req, res) => {

});

app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Server has been started from 8080"));