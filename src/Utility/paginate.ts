// utils/paginator.ts
export const paginate = async (modelQuery: any, req: any) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;

  const total = await modelQuery.clone().countDocuments(); // total records
  const data = await modelQuery
    .skip((page - 1) * perPage)
    .limit(perPage);

  return {
    data,
    pagination: {
      total,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(total / perPage),
      from: (page - 1) * perPage + 1,
      to: (page - 1) * perPage + data.length,
    }
  };
};
