import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const USER_API = import.meta.env.VITE_USER_API;

const RegistrationForm = () => {

    const [ userName, setUserName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ formErrors, setFormErrors ] = useState({})
    const [ dataChange, setDataChange ] = useState("");
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));

    const navigate = useNavigate();

    const handleUserName = (e) => {
        setUserName(e.target.value)
    };
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    };
    const handleLastName = (e) => {
        setLastName(e.target.value)
    };
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }; 
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }; 
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${USER_API}`, {
            userName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword})
        .then(res =>
            {console.log(res);
            setAccessToken(localStorage.setItem('accessToken', res.data.token));
            setDataChange(Math.random());
            navigate("/");
            window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            const errRes = err.response.data.error.errors
            setFormErrors(errRes);
        })
    }

  return (
    <div className='h-screen'>
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl m-3">Register User</h1>
        <form onSubmit={handleSubmit} className="w-[500px] border rounded shadow p-4 flex flex-col">
            <div className='flex'>
                <section className='m-4'>
                <div className="flex flex-col gap-2">
                    {formErrors.userName && <p className="text-center text-red-500">{formErrors.userName.message}</p>}
                        <label htmlFor="username">Username: </label>
                        <input id="username" className="border border-black rounded w-[400px]" type="text" onChange={handleUserName} value={userName}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.firstName && <p className="text-center text-red-500">{formErrors.firstName.message}</p>}
                        <label htmlFor="firstName">First Name: </label>
                        <input id="firstName" className="border border-black rounded w-[400px]" type="text" onChange={handleFirstName} value={firstName}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.lastName && <p className="text-center text-red-500">{formErrors.lastName.message}</p>}
                        <label htmlFor="lastName">Last Name: </label>
                        <input id="lastName" className="border border-black rounded" type="text" onChange={handleLastName} value={lastName}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>}
                        <label htmlFor="email">Email: </label>
                        <input id="email" className="border border-black rounded" type="text" onChange={handleEmail} value={email}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.password && <p className="text-center text-red-500">{formErrors.password.message}</p>}
                        <label htmlFor="password">Password: </label>
                        <input id="password" className="border border-black rounded" type="password" onChange={handlePassword} value={password}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.confirmPassword && <p className="text-center text-red-500">{formErrors.confirmPassword.message}</p>}
                        <label htmlFor="confirmPassword">Password: (Confirm) </label>
                        <input id="confirmPassword" className="border border-black rounded" type="password" onChange={handleConfirmPassword} value={confirmPassword}/>
                    </div>
                </section>
            </div>
                <button className="border border-black rounded p-2 m-2 bg-red-500 hover:bg-red-400 text-white">Register</button>
        </form>
    </div>
    <div className='text-center'>
        <Link to="/rotten_potatoes/login" className="underline">Back to Sign In</Link>
    </div>
    </div>
  )
}

export default RegistrationForm