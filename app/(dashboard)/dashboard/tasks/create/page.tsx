import CreateTask from "@/components/forms/CreateTask.tsx";

const CreateTaskPage = () => {
    return (
        <div>
            <h1 className="cursor-default">با اضافه کردن عنوان و توضیحات ، تسک جدید خود را بسازید</h1>
            <CreateTask />
        </div>
    );
}

export default CreateTaskPage;