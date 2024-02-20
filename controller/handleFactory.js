const catchAsync = require("../utils/catchAsync");
// const CategoryModel = require("../Model/categoryModel");
const AppError = require("../utils/appError");
// const ApiFeatures = require('../utils/ApiFeatiures')
exports.Addnew = (Model) =>
  catchAsync(async (req, res, next) => {
      const document = await Model.create(req.body);
      if (!document) {
        return next(new AppError("New Entity could not be created", 400));
      }
      res.status(200).json({
        status: "sucess",
        data: document,
      })
  });
exports.findOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let item = await Model.findById(req.params.id);
    if (popOptions) {
      item = await Model.findById(req.params.id).populate(popOptions);
    }
    if (!item) {
      return next(new AppError("Entity with this id not found", 404));
    }
    res.status(200).json({
      status: "sucess",
      data: item,
    });
  });
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      return next(new AppError("Entity with this id not found", 404));
    }
    res.status(200).json({
      status: "sucess",
      message: "Entity deleted sucessfully",
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(document)
    if (!document) {
      return new AppError("Entity with this Id not found", 404);
    }
    res.status(200).json({
      status: "sucess",
      data: document,
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
const document = await Model.find();
    res.status(200).json({
      status: "sucess",
      data: document,
    });
  });
