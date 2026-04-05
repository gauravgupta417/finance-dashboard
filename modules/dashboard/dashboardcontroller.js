import {getSummary,categorySummary,recentTransactions,monthlyTrend,weeklyTrend} from "./dashboardservice.js";

export const summary = async (req, res) => {
  const data = await getSummary(req.user);
  res.json(data);
};

export const category = async (req, res) => {
  const data = await categorySummary(req.user);
  res.json(data);
};

export const recent = async (req, res) => {
  const data = await recentTransactions(req.user);
  res.json(data);
};

export const monthly = async (req, res) => {
  const data = await monthlyTrend(req.user);
  res.json(data);
};

export const weekly = async (req, res) => {
  const data = await weeklyTrend(req.user);
  res.json(data);
};