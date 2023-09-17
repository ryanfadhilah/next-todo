import { getCurrentUser } from "./api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import Button from "@/components/Button";
import { revalidatePath } from "next/cache";
import { PiSmileyLight } from "react-icons/pi";
import { Todo } from "@prisma/client";
import Dashboard from "@/components/Dashboard";
import Image from "next/image";

export default async function Home() {
  const session = await getCurrentUser();
  // console.log(session);
  if (!session) {
    return (
      <span className="flex flex-col gap-3 justify-center mt-24 items-center m-auto text-3xl">
        <Image src="/bongo-cat.jpg" width={200} height={200} alt="logo" />
        <p>Hi, Please signIn first</p>
      </span>
    );
  }

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
      <section className="w-full h-[525px] uppercase grid lg:grid-cols-2 lg:gap-5 gap-10 mb-5">
        <div className=" border border-black h-fit p-1">
          <h1 className=" mb-8 md:text-xl text-md text-white text-center bg-black py-4">
            dashboard
          </h1>
          <div className=" w-full h-[456px]">
            <Dashboard
              todoUrgent={todoUrget.length}
              todoImportant={todoImportant.length}
              todoOthers={todoOthers.length}
              todoComplete={todoComplete.length}
            />
          </div>
        </div>
        <div className=" border border-black h-fit p-1  flex flex-col items-center">
          <h1 className=" mb-8 md:text-xl text-md text-white text-center bg-black py-4 w-full">
            Remaining Todos: {result.length - todoComplete.length}
          </h1>
          <div className="  h-[456px] overflow-y-auto">
            {result.map((v, i: number) => {
              return (
                <div
                  className=" p-2 relative mb-3 group
                h-[80px] w-[333px]
                sm:w-[533px] "
                  key={i}
                >
                  <div
                    className={` absolute z-30 top-1 right-[13.5px] flex border border-black group-hover:top-0 group-hover:right-3 transition-all ease-in-out duration-300
                    w-[300px]
                    sm:w-[500px]
                    ${
                      v.status
                        ? ` bg-gray-100 text-black `
                        : ` bg-white text-black`
                    }`}
                  >
                    <p
                      className={`w-10 ${
                        v.category === "Urgent"
                          ? `bg-red-500`
                          : v.category === "Important"
                          ? `bg-indigo-500`
                          : v.category === "Others"
                          ? `bg-sky-300`
                          : ""
                      }`}
                    />
                    <p className="  px-3 py-5 justify-between w-full overflow-auto">
                      {v.title}
                    </p>

                    <Button
                      className={`border-x-1 border-black hover:bg-yellow-300 focus:bg-yellow-300
                      `}
                      buttonType="update"
                      buttonAction={updateTodo}
                      status={v.status}
                      todoId={v.id}
                    />
                    {/* )} */}
                    <Button
                      className="hover:bg-yellow-300 focus:bg-yellow-300"
                      buttonType="delete"
                      buttonAction={deleteTodo}
                      todoId={v.id}
                    />
                  </div>

                  <div
                    className=" absolute bottom-1 left-3 flex border border-black bg-teal-black group-hover:bg-black ease-in-out transition-all duration-300
                  h-[66px] w-[300px]
                  sm:w-[500px]"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
