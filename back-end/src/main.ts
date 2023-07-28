import express, {json} from 'express';
import mysql, {Pool} from 'promise-mysql';

const app = express();
const router = express.Router();

app.use(json());

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

type Task = {
    id: number,
    description: string,
    status: 'COMPLETED' | 'NOT_COMPLETED';
};

/*get all task*/
router.get("/", async (req, res) => {
    const tasks = await pool.query('SELECT * FROM task');
    res.json(tasks);
});

/*save a task*/
router.post("/:taskId", async (req, res) => {
    const task = (req.body as Task);
    if (task.description?.trim()) {
        res.sendStatus(400);
        return;
    }

    const result = await pool.query('INSERT INTO task(description) VALUES(?) '
        , [task.description]);

    task.id = result.insertId;
    task.status = "NOT_COMPLETED";

    res.status(201).json(task);
});

/* delete a task*/
router.delete("/:taskId", async (req, res) => {
    const result = await pool.query('DELETE FROM task WHERE id=?', [req.params.taskId]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});



app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Server has been started from 8080"));