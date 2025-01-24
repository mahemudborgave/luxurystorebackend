
import { DataModel } from "../models/data.model.js";
import { mongoose } from 'mongoose';



const deletePost = async (req, res) => {
  const { vlabel } = req.body;
  try {
    const data = await DataModel.findOneAndDelete({ vlabel: vlabel });
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully', data });
  } catch (error) {
    return res.status(500).json({ message: 'Error while deleting data', error });
  }
}



export {
  deletePost
}