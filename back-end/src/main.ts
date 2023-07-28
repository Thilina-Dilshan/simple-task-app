import express from 'express';
import mysql, {Pool} from 'promise-mysql';

const app = express();
const router = express.Router();

let pool: Pool;

async function initPool() {
    pool = await mysql.createPool({
        host: 'localhost',
        port: 3306,
        database: 'dep10_simple_task_app',
        user: 'root',
        password: 'mysql',
        connectionLimit: 5,
    });
}


/*get all task*/
router.get("/", (req, res) => {

});

/*save a task*/
router.post("/:taskId", (req, res) => {

});

app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Server has been started from 8080"));