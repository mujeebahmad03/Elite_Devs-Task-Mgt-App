/* eslint-disable react/prop-types */
import {StyledForm, FormTitle, FormContainer, FormWrapper, ButtonContainer, CloseButton} from '../component/styles/StyledForm.styled'
import { MdOutlineClose } from "react-icons/md";
import { Button } from './styles/Button.styled';
import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { addTask, updateTask } from '../slice/authTaskSlice';
import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';


function TaskModal({modalOpen, setModalOpen, type, task}) {
  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  const dispatch = useDispatch()

  useEffect(()=>{
    if(type === 'update' && task){
      setTitle(task.title);
      setStatus(task.status); 
    } else{
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, task, modalOpen])

  // ...

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!title) {
      toast.error('Title should not be empty');
      return;
    }
    
    if (type === 'update') {
      if (task.title !== title || task.status !== status) {
        console.log('task:', task);
        console.log('title:', title);
        console.log('status:', status);

        dispatch(updateTask({ ...task, title, status }));

        console.log('Dispatched updateTask');
        toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    } else {
      dispatch(addTask({id: uuid(), title, status}));

      toast.success('Task added successfully');
    }
  
    setModalOpen(false);
  };
  


  return (
    <>
      {modalOpen && (
        <FormWrapper>
        <FormContainer>
          <CloseButton onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
            >
          <MdOutlineClose/>
          </CloseButton>
          <StyledForm onSubmit={handleSubmit}>
            <FormTitle>{type === 'update' ? 'Update' : 'Add'} Task</FormTitle>
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
              <Button $primary='true'>{type === 'update'?'Update': 'Add'}Task</Button>
              <Button $secondary='true' type='button'
                onClick={() => setModalOpen(false)} 
                onKeyDown={() => setModalOpen(false)}
                >Cancel</Button>
            </ButtonContainer>
            </StyledForm>
        </FormContainer>
      </FormWrapper>
      )}
    </>
  )
}

export default TaskModal
