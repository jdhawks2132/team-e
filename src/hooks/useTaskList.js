import { useState } from 'react'
import { useTaskInput } from './useTaskInput'

export const useTaskList = () => {
 const{taskInput} = useTaskInput()
 const [ taskList, setTaskList ] = useState([])
 const addTask = () => {
    setTaskList([...taskList,{id: taskList.length + 1, description: taskInput}])
 }

 const removeTask = (itemId) => {
    const updateTask = taskList.filter( list => list.id !== itemId )
    setTaskList(updateTask)
 }

 return { taskList, setTaskList, addTask, removeTask}

}
