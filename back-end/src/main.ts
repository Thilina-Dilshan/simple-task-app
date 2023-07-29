import express, {json} from 'express';
import {router} from "./api/task-controller";
import cors from 'cors';

const app = express();

app.use(cors())
app.use(json());
app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Server has been started from 8080"));