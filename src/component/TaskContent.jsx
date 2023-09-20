import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { TaskWrapper } from "./styles/Containers.styled";
import { LoneText } from "./styles/Title.styled";


function TaskContent() {
  const taskList = useSelector(state => state.authTasks.tasks); 
  const filterStatus = useSelector(state => state.authTasks.filterStatus); 

  const filteredTaskList = taskList.filter(item => {
    if(filterStatus === 'all') return true;
    return item.status === filterStatus;
  });


  return (
    <TaskWrapper>
      {filteredTaskList.length === 0 ? (
        <LoneText>No tasks found</LoneText>
      ) : (
        <div>
          {filteredTaskList.map(task => (
            <TaskItem key={task.id} task={task}/>
          ))}
        </div>
      )}
    </TaskWrapper>
  );
}

export default TaskContent;
