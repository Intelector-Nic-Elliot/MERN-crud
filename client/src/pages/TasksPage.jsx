import {useEffect} from 'react'
import TasksCard from "../components/TasksCard";
import {useTasks} from '../context/taskProvider'

function TasksPage() {
const {tasks, loadTasks} = useTasks()

    useEffect(() => {
        loadTasks()
    }, [])


    function renderMain() {

        if (tasks.length === 0) return <h1>No Tasks Yet</h1>


        return tasks.map((task) => ( <TasksCard task={task} key={task.id} />))
    }

    return (
        <div>
            <h1 className='text-6xl text-white font-bold text-center'>Tasks</h1>
            <div    className='grid grid-cols-3 gap-2'>
            {renderMain()}
            </div>
        </div>
    )
}

export default TasksPage