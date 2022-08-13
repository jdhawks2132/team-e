import { useState } from 'react'

export const useTaskInput = () => {
    const [ taskInput, setTaskInput ] = useState("")

    const handleChange = e => setTaskInput(e.target.value)

    const reset = () => setTaskInput("")
    return { handleChange, reset, taskInput, setTaskInput}



}
