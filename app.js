const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://sivamedisetti70:sivamedisetti@cluster0.9ymacgf.mongodb.net/myDatabase")
  .then(() => console.log("Database Connected"));

const route = express.Router();
const Controller = require("./controllers/controller");

// Routes
route.post("/addproject", Controller.add_projects);
route.post("/addtask", Controller.add_task);

route.get("/getproject", Controller.get_project);
route.get("/gettasks/:pid", Controller.get_tasks);

route.put("/updatetask", Controller.update_tasks);

app.use("/", route);

app.listen(3000, () => console.log("App running on port 3000"));
