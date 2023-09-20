/* eslint-disable react/prop-types */
import {Button} from "./styles/Button.styled"
import { StyledHeader, Welcome } from "./styles/Title.styled";
import {MdAccountCircle} from 'react-icons/md'

function Header({onLogout}) {
  return (
    <StyledHeader>
      <Welcome>
        <MdAccountCircle/>
        <h1>Welcome</h1>
      </Welcome>
      <Button $primary="true" type="button"
        onClick={()=>onLogout()}
        >Logout</Button>
    </StyledHeader>
  )
}

export default Header