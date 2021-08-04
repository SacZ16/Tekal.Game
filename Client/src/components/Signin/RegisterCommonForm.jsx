import React, {useState} from 'react';
import axios from 'axios';
import hash from 'object-hash';

const RegisterCommonForm = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    
    const nummer= hash({name: 'ksjnfkjsndlfkjsadnfl', stapler: false, friends: [ Date.now(), '@@xxxddddlksdnfkljnas',  Date.now()] })
    const user={
        email,
        password,
        test:nummer
    }

    return(
        <div>
            <form>
            <input name="email" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)} /><br></br>
            <input name="password" value={password} placeholder="password" onChange={(e) => setpassword(e.target.value)} /><br></br>
            </form>
            <button  onClick={()=> axios.post('http://localhost:3001/register',user)}> 😁 </button>
        </div>
    )
}



export default RegisterCommonForm;
