import { getCurrentUser } from "./api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import Button from "@/components/Button";
import { revalidatePath } from "next/cache";
import { PiSmileyLight } from "react-icons/pi";
import { Todo } from "@prisma/client";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const session = await getCurrentUser();
  console.log(session);
  if (!session) return <p> please sign in first!</p>;

  // get user todo
  const result: Todo[] = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
  });
  if (!result) return null;

  const deleteTodo = async (todoId: string) => {
    "use server";
    await prisma.todo.delete({
      where: { id: todoId },
    });
    revalidatePath("/");
  };

  const updateTodo = async (todoId: string) => {
    "use server";

    const todoStatus = await prisma.todo.findUnique({
      where: { id: todoId },
    });
    await prisma.todo.update({
      where: { id: todoId },
      data: { status: !todoStatus?.status },
    });

    revalidatePath("/");
  };

  //pie chart
  const todoUrget = await prisma.todo.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { category: "Urgent" }],
    },
  });
  const todoImportant = await prisma.todo.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { category: "Important" }],
    },
  });
  const todoOthers = await prisma.todo.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { category: "Others" }],
    },
  });
  const todoComplete = await prisma.todo.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { status: true }],
    },
  });

  return (
    <main>
      <div className="w-full h-full flex lg:px-7 px-5 relative">
        <div className="fixed bottom-0 left-7 h-[74.4%] border-l-1 border-black"></div>
        <div className="fixed bottom-0 right-7 h-[80.5%] border-r-1 border-black"></div>
      </div>

      <section className="w-full h-[525px] uppercase grid grid-cols-2 overflow-auto">
        <div className="px-10">
          <h1 className=" mb-8 text-3xl text-center">dashboard</h1>
          <div className=" border border-black w-full h-[450px]">
            <Dashboard
              todoUrgent={todoUrget.length}
              todoImportant={todoImportant.length}
              todoOthers={todoOthers.length}
              todoComplete={todoComplete.length}
            />
          </div>
        </div>
        <div className="px-10 border-l-1 border-black">
          <h1 className=" mb-8 text-3xl text-center">
            Remaining Todos: {result.length - todoComplete.length}
          </h1>
          <div className=" border-t-1 border-black">
            {result.map((v, i: number) => {
              return (
                <div
                  className={` flex border-x-1 border-b-1 border-black ${
                    v.status ? ` bg-green-200/50` : ``
                  }`}
                >
                  <p
                    className={`w-10 ${
                      v.category === "Urgent"
                        ? `bg-red-500`
                        : v.category === "Important"
                        ? `bg-amber-500`
                        : `bg-teal-500`
                    }`}
                  />
                  <p
                    key={i}
                    className=" border-l-1 border-black px-3 py-5 justify-between w-full overflow-auto"
                  >
                    {v.title}
                  </p>

                  <Button
                    className={`border-x-1 border-black hover:text-Ivory  ${
                      v.status
                        ? ` hover:bg-rose-700 focus:bg-rose-700 focus:text-Ivory`
                        : ` hover:bg-black`
                    }`}
                    buttonType="update"
                    buttonAction={updateTodo}
                    status={v.status}
                    todoId={v.id}
                  />
                  {/* )} */}
                  <Button
                    className="hover:bg-rose-700 hover:text-Ivory focus:bg-rose-700 focus:text-Ivory"
                    buttonType="delete"
                    buttonAction={deleteTodo}
                    todoId={v.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
