import React, {useState} from 'react';

const VerificationEmail = () => {
    
    const [email, setEmail] = useState ('')

    console.log(email)
    return(
        <div>
            <label htmlFor='Email'> Don't you remember your password? </label>
            <input name='Email' placeholder='enter your email' onChange={(e) => setEmail(e.target.value)}/>
            <button > Sumbit </button>
        </div>
    )
};

export default VerificationEmail;