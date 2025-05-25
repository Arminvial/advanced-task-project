import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const task = await getTask(params.id);

  return {
    title: task ? task.title : "Task Not Found",
    description: task ? task.description : "No description available.",
  };
}


type Props = {
  params: {
    id: string;
  };
};

const getTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

export default async function TaskDetails({ params }: Props) {
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
}
