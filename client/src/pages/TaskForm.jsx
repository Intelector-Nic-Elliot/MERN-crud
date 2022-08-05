import { Form, Formik } from "formik";
import {useTasks} from '../context/taskProvider'
import {useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";

function TaskForm() {

  const {createTask, getTask, updateTask} = useTasks();
  const [task, setTask] = useState({
    title: '',
    description: '',
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTasks = async () => {
      if (params.id) {
        const task = await getTask(params.id)
          setTask({
            title: task.title,
            description: task.description,
          })
      }
    }
    loadTasks()
  })

  return (
    <div >

      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async(values, actions) => {
          console.log(values);

          if (params.id) {
            await updateTask(params.id, values)
            navigate('/')
          } else {
            await createTask(values)
            navigate('/')
          }

          actions.resetForm()
        }}
      >
        {({handleChange, handleSubmit,values, isSubmitting}) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
          <h1 className="text-xl font-bold text-center">{params.id ? "Edit Task" : "New Task"}</h1>
          <label className="block">Title</label>
          <input className="px-2 py-1 rounded-sm w-full" type="text" name='title' 
            placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
          />

          <label className="block">description</label>
          <textarea 
          className="px-2 py-1 rounded-sm w-full"
          name="description" 
          rows="3" 
          placeholder="write a description"
          onChange={handleChange}
          value={values.description}
          ></textarea>

          <button className="block bg-indigo-500 text-white px-2 py-1 rounded-md w-full" type="onSubmit" disabled={isSubmitting}>
            {isSubmitting ? "Saving ..." : "Save"}
          </button>
        </Form>
        )}
      </Formik>
    </div>
    )
}

export default TaskForm