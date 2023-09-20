/* eslint-disable react/prop-types */
import {StyledForm, FormTitle, FormContainer, ButtonContainer} from '../component/styles/StyledForm.styled'
import { Button } from '../component/styles/Button.styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../slice/authTaskSlice';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { LoneText } from '../component/styles/Title.styled';

function TaskDetails() {
  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  // Retrieve the task ID from the URL
  const { taskId } = useParams();
  const taskList = useSelector(state => state.authTasks.tasks)
  const task = taskList.find(task => task.id === taskId);

  const dispatch = useDispatch()

  useEffect(()=>{
    if(task){
      setTitle(task.title);
      setStatus(task.status); 
    } else{
      setTitle('');
      setStatus('incomplete');
    }
  }, [task])

  const handleSubmit = e => {
  e.preventDefault();
  if (!title) {
    toast.error('Title should not be empty');
    return; // Prevent further execution if title is empty
  }

  if (task && (task.title !== title || task.status !== status)) {
    dispatch(updateTask({...task, title, status,}));
    toast.success('Task updated successfully');
  } else {
    toast.error('No changes made');
  }
};

  const handleCancel = () => {
    setTitle(task.title);
    setStatus(task.status);
  }

  return (
    <>
      {task ? (<FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <FormTitle>Update Task</FormTitle>
          <label htmlFor="title">Title
            <input type="text" id='title' value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
          </label>
          <label htmlFor="status">Status
            <select name="status" id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <ButtonContainer>
            <Button $primary='true'>Update Task</Button>
            <Button $secondary='true' type='button'
              onClick={handleCancel} 
              onKeyDown={handleCancel}
              >Cancel</Button>
          </ButtonContainer>
          </StyledForm>
      </FormContainer>): (<LoneText>No task found</LoneText>)}
    </>
  )
}

export default TaskDetails
