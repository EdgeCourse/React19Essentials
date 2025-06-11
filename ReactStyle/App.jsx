import './App.scss';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 1rem;
  border: 2px dashed pink;
`;

function App() {
  return (
    <div className="app">
      <StyledDiv>
        <h1>Hello from styled-components</h1>
        <Button variant="contained" color="primary">Material UI</Button>
      </StyledDiv>
    </div>
  );
}

export default App;
