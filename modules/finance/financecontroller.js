import {createRecord,getRecords,updateRecord,deleteRecord} from "./financeservice.js";

export const create = async (req, res) => {
  try {
    const data = await createRecord(req.body, req.user.id);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getRecords(req.query, req.user);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await updateRecord(req.params.id, req.body, req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteRecord(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};