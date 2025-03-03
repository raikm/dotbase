interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  version: number;
}

interface Database {
  users: User[];
}

export const database: Database = {
  users: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@mail.com",
      id: "720072c1-47d9-4f2f-b2ba-e8ec0e8dee42",
      role: "Admin",
      version: 1,
    },
  ],
};

export const getUser = async (id: string) => {
  return database.users.findLast((user) => user.id === id);
};

export const saveUser = async (user: User) => {
  database.users.push(user);
  return user;
};
