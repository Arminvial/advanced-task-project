import { notFound } from "next/navigation";

const getTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

const TaskDetails = async ({ params }: { params: { id: string } }) => {
  const task = await getTask(params.id);

  if (!task) return notFound();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskDetails;
