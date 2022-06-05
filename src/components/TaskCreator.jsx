import React, { useState } from "react"

export const TaskCreate = (props) => {
  const [newTaskName, setNewTaskName] = useState('')

  const createNewtask = () => {
    props.callback(newTaskName)
    setNewTaskName('')
  }

  return (
    <div className="my-1">
      <input 
        type="text"
        className="form-control"
        placeholder="Add a task..."
        value={newTaskName}
        onChange={e => setNewTaskName(e.target.value)}
      />
      <button 
        className="btn btn-primary my-2"
        onClick={createNewtask}
      >
        Add
      </button>
    </div>
  )
}
