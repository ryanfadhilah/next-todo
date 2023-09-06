import { Session, User } from "next-auth";
import { Todo, Prisma } from "@prisma/client";
import { User as UserAccount } from "@prisma/client";

// export type TypeTodoState = {
//   title: string;
//   category: string;
//   status: boolean;
// };

export type TypeTodo = {
  id: string;
  title: string;
  status: boolean;
  category: string;
  userId: string;
  // createdAt:
  // updatedAt:
};

export type TypeUser = UserAccount;

// export type TypeUser = {
//   name: string;
//   email: string;
//   image: string;
//   id: string;
//   todos: {
//     edges: { node: TypeTodo }[];
//     pageInfo: {
//       hasPreviousPage: boolean;
//       hasNextPage: boolean;
//       startCursor: string;
//       endCursor: string;
//     };
//   };
// };
export type TypeSession = Session & {
  user: User & UserAccount;
};

export type TypeTodoForm = {
  title: string;
  category: string;
  status: boolean;
};

export type TypeUpdateTodo = {
  title: string;
  category: string;
};
