import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiArrowLeftLight } from "react-icons/pi";
import { authOptions, getCurrentUser } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import AddTodoButton from "@/components/AddTodoButton";

export default async function Home() {
  const session = await getCurrentUser();
  console.log(session);

  const addNewTodo = async (formData: FormData) => {
    "use server";

    const title = formData.get("title")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const status = false;
    const userId = session.user.id;

    if (!title || !category) {
      throw Error("Missing required fields");
    }

    await prisma.todo.create({
      data: { title, category, status, userId },
    });

    redirect("/");
  };
  console.log(addNewTodo);
  return (
    <main className="w-full h-full flex items-center justify-start flex-col lg:px-7 my-6 px-5 pb-16 relative">
      <div className="fixed bottom-0 left-7 h-[74.4%] border-l-1 border-black"></div>
      <div className="fixed bottom-0 right-7 h-[80.5%] border-r-1 border-black"></div>
      <section className="w-full h-fit px-16 pb-20 uppercase grid grid-cols-1 gap-10">
        <div className=" flex items-center">
          <Link href={"/"}>
            <PiArrowLeftLight className=" text-4xl hover:stroke-2" />
          </Link>
          <h1 className=" text-3xl w-full text-center"> ADD NEW TODO </h1>
        </div>
        <form
          action={addNewTodo}
          className="w-full grid grid-cols-1 gap-10 mt-10"
        >
          <input
            required
            type="text"
            name="title"
            placeholder="Title"
            className=" bg-transparent border-b-1 border-black focus:outline-none py-3 px-4 h-full"
          />
          {/* TODO LATER */}
          <input
            required
            type="text"
            name="category"
            placeholder="Category"
            className=" bg-transparent border-b-1 border-black focus:outline-none py-3 px-4 h-full"
          />
          {/* <select
            defaultValue="Category"
            name="category"
            value={"Category"}
            className=" bg-transparent border-b-1 border-black focus:outline-none py-3 px-4 h-full"
          >
            <option value={""}>Category</option>
            <option value={""}>Important</option>
            <option value={""}>Urgent, but not Important</option>
            <option value={""}>Not urgent and not important</option>
            <option value={""}>Others</option>
          </select> */}
          <AddTodoButton />
        </form>
      </section>
    </main>
  );
}
