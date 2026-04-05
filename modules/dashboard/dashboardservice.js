import Finance from "../finance/financemodel.js";
import mongoose from "mongoose";
export const getSummary = async (user) => {
  let match = { isDeleted: false };

  if (user.role !== "admin") {
  match.createdBy = new mongoose.Types.ObjectId(user.id);
  }

  const data = await Finance.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0,
    expense = 0;

  data.forEach((d) => {
    if (d._id === "income") income = d.total;
    if (d._id === "expense") expense = d.total;
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const categorySummary = async (user) => {
  let match = { isDeleted: false };

  if (user.role !== "admin") {
   match.createdBy = new mongoose.Types.ObjectId(user.id);
  }

  return await Finance.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
};

export const recentTransactions = async (user) => {
  let filter = { isDeleted: false };

  if (user.role !== "admin") {
   filter.createdBy = new mongoose.Types.ObjectId(user.id);
  }

  return await Finance.find(filter)
    .sort({ createdAt: -1 })
    .limit(5);
};

export const monthlyTrend = async (user) => {
  let match = { isDeleted: false };

  if (user.role !== "admin") {
    match.createdBy = new mongoose.Types.ObjectId(user.id);
  }

  return await Finance.aggregate([
    { $match: match },
    {
      $group: {
       _id: {
            month: { $month: "$date" },
            type: "$type"
            },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);
};

export const weeklyTrend = async (user) => {
  let match = { isDeleted: false };

  if (user.role !== "admin") {
    match.createdBy = new mongoose.Types.ObjectId(user.id);
  }

  return await Finance.aggregate([
    { $match: match },
    {
      $group: {
        _id: {  week: { $week: "$date" },
            type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.week": 1 } },
  ]);
};