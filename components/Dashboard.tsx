type DashboardProps = {
  todoUrgent: number;
  todoImportant: number;
  todoOthers: number;
  todoComplete: number;
};

export default function Dashboard({
  todoUrgent,
  todoImportant,
  todoOthers,
  todoComplete,
}: DashboardProps) {
  const total = todoUrgent + todoImportant + todoOthers;

  return (
    <div className=" grid grid-rows-2 w-full h-full">
      <div className="grid grid-cols-2 border-b-1 border-black">
        <p className="bg-green-200/50 text-green-500 border-r-1 border-black flex flex-col gap-3 justify-center items-center text-3xl">
          {todoComplete}
          <p className="text-sm">Complete</p>{" "}
        </p>
        <p className="bg-orange-200/50 text-orange-500 flex flex-col gap-3 justify-center items-center text-3xl">
          {total - todoComplete}
          <p className="text-sm">Remaining</p>
        </p>
      </div>
      <div className=" grid grid-cols-3 ">
        <p className="bg-rose-200/50 text-rose-500 flex flex-col gap-3 justify-center items-center text-3xl">
          {todoUrgent}
          <p className="text-sm">Urgent</p>
        </p>
        <p className="bg-amber-200/50 text-amber-500 flex flex-col gap-3 justify-center items-center border-black border-x-1 text-3xl">
          {todoImportant}
          <p className="text-sm">Important</p>
        </p>
        <p className="bg-teal-200/50 text-teal-500 flex flex-col gap-3 justify-center items-center text-3xl">
          {todoOthers}
          <p className="text-sm">Others</p>
        </p>
      </div>
    </div>
  );
}
