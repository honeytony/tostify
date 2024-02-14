import { toast, ToastContainer } from 'react-toastify';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {


  useEffect(()=>{
    axios.get('http://localhost:3001/').then((data) => {
      const message =   data.data.message;
      toast.success(message);
    }).catch((e) => {
      toast.error(e.message)
    })
  }, [])




  const handleClick = () => {

    axios.post('http://localhost:3001/login', { login: login, password: password })
    .then((data) => {
      const message =  data.data.message;
      toast.success(message);
    })
    .catch((e) =>{
      console.log(e.response);
      const status = e.response.status;

      switch (status) {
        case 404:
            toast.warning(e.response.data.message)
          break;
        case 403:
            toast.error(e.response.data.message)
          break;
      
        default:
          break;
      }


      
    })


  }

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">

        <input type='text' placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value)}/>
        <input type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <button onClick={handleClick}>Войти</button> 
        
        <ToastContainer />

    </div>
  );
}

export default App;
