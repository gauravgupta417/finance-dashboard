import Finance from "./financemodel.js";

export const createRecord = async (data, userId) => {
  return await Finance.create({ ...data, createdBy: userId });
};

export const getRecords = async (query, user) => {
  const type = query.type;
  const category = query.category;

  const startDate = query.startDate || query.startdate;
  const endDate = query.endDate || query.enddate;

  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 10, 50);

  let filter = { isDeleted: false };

  if (user.role !== "admin") {
    filter.createdBy = user.id;
  }

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

 if (query.search) {
  filter.$or = [
    { category: { $regex: query.search, $options: "i" } },
    { notes: { $regex: query.search, $options: "i" } },
  ];
}

  const skip = (page - 1) * limit;

  const totalRecords = await Finance.countDocuments(filter);

  const records = await Finance.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ date: -1 });

  return {
    totalRecords,
    currentPage: page,
    totalPages: Math.ceil(totalRecords / limit),
    data: records,
  };
};

export const updateRecord = async (id, data, user) => {
  let record = await Finance.findById(id);

  if (!record || record.isDeleted) throw new Error("Record not found");

  // if anyone tries to update then it is not allowed other then its owner
  if (user.role !== "admin" && record.createdBy.toString() !== user.id) {
    throw new Error("Not allowed");
  }

  return await Finance.findByIdAndUpdate(id, data, { new: true });
};

// soft delete 
export const deleteRecord = async (id, user) => {
  let record = await Finance.findById(id);

  if (!record || record.isDeleted) throw new Error("Record not found");

  if (user.role !== "admin" && record.createdBy.toString() !== user.id) {
    throw new Error("Not allowed");
  }

  record.isDeleted = true;
  await record.save();

  return { message: "Record deleted" };
};