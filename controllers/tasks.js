const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e) {
    console.log(e.message);
  }
};

const getTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    taskdata = await Task.findOne({ _id: taskID });
    if (!taskdata) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` });
    }
    res.status(200).json(taskdata);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const updata = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskID }, updata);

    res.status(200).json({ id: taskID, data: updata });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const taskData = await Task.findOneAndDelete({ _id: taskID });
    if (!taskData) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` });
    }
    res.status(200).json({ meg: "task is deleted" });
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
