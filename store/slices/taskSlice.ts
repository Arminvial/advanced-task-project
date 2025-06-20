// store/slices/taskSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '@/types/task' 

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
  },
})

export const { setTasks, addTask, removeTask } = taskSlice.actions
export default taskSlice.reducer
