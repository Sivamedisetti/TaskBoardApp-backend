const projectSchema = require("../models/project");
const { taskModel } = require("../models/task");

const add_projects = async (req, res) => {
  const { title, pid, tasks } = req.body;
  try {
    const Project = projectSchema({
      title: title,
      pid: pid,
      tasks: tasks,
    });
    const response = await Project.save();
    res.status(201).send(response);
  } 
  catch (err) {
    res.status(500).send({ msg: "Error adding project" });
  }
};

const add_task = async (req, res) => {
  const { pid, taskName, startDate, deadlineDate, status, taskId } = req.body;
  try {
    const newTask = taskModel({
      taskName: taskName,
      startDate: startDate,
      deadlineDate: deadlineDate,
      status: status,
      taskId: taskId,
      pid: pid,
    });
    const resp = await newTask.save();
    const updatedProject = await projectSchema.findOneAndUpdate(
      { pid: resp.pid },
      { $push: { tasks: resp.taskId } },
      { new: true }
    );
    res.status(201).send(updatedProject);
  } catch (err) {
    res.status(500).send({ msg: "Error adding task" });
  }
};

const get_project = async (req, res) => {
  try {
    const resp = await projectSchema.find();
    res.send(resp.length ? resp : []);
  } catch (err) {
    res.status(500).send({ msg: "Error retrieving projects" });
  }
};

const get_tasks = async (req, res) => {
  const { pid } = req.params;
  try {
    const task = await taskModel.find({ pid: pid });
    res.status(200).send(task.length ? task : []);
  } catch (err) {
    res.status(404).send({ msg: "Error retrieving tasks" });
  }
};

const update_tasks = async (req, res) => {
  const { taskName, startDate, deadlineDate, status, pid, taskId } = req.body;
  try {
    const tasks_updated = await taskModel.findOneAndUpdate(
      { taskId: taskId },
      {
        taskName: taskName,
        startDate: startDate,
        deadlineDate: deadlineDate,
        status: status,
        pid: pid,
      },
      { new: true }
    );

    if (!tasks_updated) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json(tasks_updated);
  } catch (error) {
    res.status(500).json({ status: "Failed", msg: "Error updating task" });
  }
};

module.exports = {
  add_projects,
  add_task,
  get_tasks,
  update_tasks,
  get_project,
};
