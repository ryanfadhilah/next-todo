import { getCurrentUser } from "./api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import Button from "@/components/Button";
import { revalidatePath } from "next/cache";
import { PiSmileyLight } from "react-icons/pi";
import { Todo } from "@prisma/client";

export default async function Home() {
  const session = await getCurrentUser();
  console.log(session);

  if (!session) return <p> please sign in first!</p>;

  const result = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
  });

  if (!result) return null;

  console.log(result);

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

  return (
    <main>
      <div className="w-full h-full flex items-center justify-start flex-col lg:px-7 my-6 px-5 pb-16 relative">
        <div className="fixed bottom-0 left-7 h-[74.4%] border-l-1 border-black"></div>
        <div className="fixed bottom-0 right-7 h-[80.5%] border-r-1 border-black"></div>
        <section className="w-full h-full uppercase grid grid-cols-2">
          <div className="px-10">
            <h1 className=" mb-8 text-3xl text-center">weekly progress</h1>
            <div className=" border-t-1 border-black"></div>
          </div>
          <div className="px-10 border-l-1 border-black">
            <h1 className=" mb-8 text-3xl text-center">
              Remaining Todos: {result.length}
            </h1>
            <div className=" border-t-1 border-black">
              {result.map((v: Todo, i: number) => {
                return (
                  <div
                    className={` flex border-x-1 border-b-1 border-black ${
                      v.status ? ` bg-green-200/50` : ``
                    }`}
                  >
                    <p className=" self-center px-3 w-32">{v.category}</p>
                    <p
                      key={i}
                      className=" border-l-1 border-black px-3 py-5 justify-between w-full"
                    >
                      {v.title}
                    </p>
                    {/* {v.status ? (
                      <button className="border-x-1 border-black px-5 text-center cursor-default">
                        <PiSmileyLight />
                      </button>
                    ) : ( */}
                    <Button
                      className="border-x-1 border-black hover:bg-black hover:text-Ivory"
                      buttonType="update"
                      buttonAction={updateTodo}
                      status={v.status}
                      todoId={v.id}
                    />
                    {/* )} */}
                    <Button
                      className="hover:bg-rose-800 hover:text-Ivory"
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
      </div>
    </main>
  );
}
