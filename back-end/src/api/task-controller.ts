import mysql, {Pool} from "promise-mysql";
import express from "express";


export const router = express.Router();

let pool: Pool;

initPool();
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
router.post("/", async (req, res) => {
    const task = (req.body as Task);
    if (!task.description?.trim()) {
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


/* update a task*/
router.patch("/:taskId", async (req, res) => {
    const task = req.body as Task;
    task.id = +req.params.taskId;
    if (!task.status) {
        res.sendStatus(400);
        return;
    }

    const result = await pool.query('UPDATE task SET status=? WHERE id=?', [task.status, task.id]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});
