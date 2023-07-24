import Main from '../Main/Main';


import './App.css';

function App() {
  const isLoggedIn = false;


  return (
    <div className="page">
      <Main isLoggedIn={isLoggedIn}></Main>
    </div>
  );
}

export default App;
