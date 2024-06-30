import handler from 'express-async-handler';

export const asyncHandler = (routes: any[]) => {
  return routes.map((i) => handler(i));
};

export default handler;
