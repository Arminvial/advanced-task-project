import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const getTask = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

const TaskDetails = async ({ params }: Props) => {
  const task = await getTask(params.id);

  if (!task) {
    return notFound(); 
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskDetails;
