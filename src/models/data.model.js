import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



// Define Mongoose Schema and Model
const DataSchema = new mongoose.Schema(
  {
    vlabel: String,
    vlink: String,
    postedby: String,
  },
  { timestamps: true }
);

DataSchema.plugin(mongooseAggregatePaginate);

export const DataModel = mongoose.model('Data', DataSchema, 'videodetail'); // parameters = (modelName, schema, collectionName)
