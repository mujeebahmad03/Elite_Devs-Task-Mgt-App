import { Title } from "../component/styles/Title.styled"
import ActionNav from '../component/ActionNav'
import TaskContent from '../component/TaskContent'
import { Container, ActionWrapper } from '../component/styles/Containers.styled'
import { fetchUserTasks } from "../slice/authTaskSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


function Dashboard() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTasks())  
  },[dispatch])
  return (
        <Container>
          <Title>Task Manager</Title>
            <ActionWrapper>
              <ActionNav />
              <TaskContent/>
            </ActionWrapper>
        </Container>
  )
}

export default Dashboard