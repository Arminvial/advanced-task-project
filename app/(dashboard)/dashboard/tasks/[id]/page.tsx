// app/(dashboard)/dashboard/tasks/[id]/page.tsx

import { notFound } from "next/navigation";

const getTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

type Props = {
  params: {
    id: string;
  };
};

const TaskDetails = async ({ params }: Props) => {
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
