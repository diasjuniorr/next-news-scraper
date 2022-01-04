import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  id: number;
  username: string;
};

const users = [{ id: 1, username: "guest", password: "guest" }];

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<User | boolean>
) {
  const { username, password } = req.body;

  const account = users.find((u) => u.username === username);

  if (!account) {
    return res.status(401).json(false);
  }

  if (account.password !== password) {
    return res.status(401).json(false);
  }

  const user: User = {
    id: account.id,
    username: account.username,
  };

  return res.json(user);
}

export default userRoute;
