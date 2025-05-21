import useSWR from 'swr'
import axios from '@/lib/axios'
import { Task } from '@/types/task'


const fetcher = (url: string) => axios.get<Task[]>(url).then(res => res.data)

export const useTasks = () => {
  const { data, error, isLoading, mutate } = useSWR<Task[]>('/api/tasks', fetcher)

  return {
    tasks: data,
    isLoading,
    isError: error,
    mutate
  }
}
