import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import  { TaskRes } from './components/TaskBanner.jsx'
import { TaskCreate } from './components/TaskCreator.jsx'
import { VisibilityControl } from './components/VisibilityControl.jsx'
import { TaskRows } from './components/TaskRow.jsx'

function App() {
  const [userName, setUserName] = useState('Tinta')
  const [taskItems, setTaskItems] = useState([
    {
      name: 'Task 1',
      done: false
    },
    {
      name: 'Task 2',
      done: false
    },
    {
      name: 'Task 3',
      done: false
    },
    {
      name: 'Task 4',
      done: false
    }
  ])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName('Tinta (default)')
      setTaskItems([
        {
          name: 'Task 1 exmaple',
          done: false
        },
        {
          name: 'Task 2 exmaple',
          done: false
        },
        {
          name: 'Task 3 exmaple',
          done: false
        },
        {
          name: 'Task 4 exmaple',
          done: false
        }
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createTask = (taskName) => {
    if (taskName === '') {
      alert('Task name is required')
    }else if(!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = task => (
    setTaskItems(taskItems.map(item => (item.name === task.name ? { ...item, done: !item.done } : item)))
  )

  const taskTableRows = doneValue =>
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRows task={task} key={task.name} toggleTask={toggleTask} />
    ))

  return (
   <div className="container-all">
     <TaskRes userName={userName} taskItems={taskItems} />
      <TaskCreate callback={createTask} />
     <table className='table table-striped table-bordered'>
       <thead>
         <tr>
           <th>
             Descripcion
           </th>
            <th>
              Done
            </th>
         </tr>
       </thead>
       <tbody>
          {taskTableRows(false)}
       </tbody>
     </table>

    <div className="bg-secondary-text-white text-center p-2">
      <VisibilityControl 
        description="Completed Tasks" 
        isChecked={showCompleted} 
        callback={checked => setShowCompleted(checked)} 
      />
    </div>

    {
      showCompleted && (
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>
                Descripcion
              </th>
              <th>
                Done
              </th>
            </tr>
          </thead>
          <tbody>
            {taskTableRows(true)}
          </tbody>
        </table>
      ) 
    }

   </div>
  )
}

export default App
