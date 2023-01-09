import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import DeleteButton from '../components/DeleteButton';

const CURRENT_USER_API = import.meta.env.VITE_CURRENT_USER_API;
const USER_API = import.meta.env.VITE_USER_API;

const UserPageAccount = () => {

    const [ dataChange, setDataChange ] = useState("");
    const [ user, setUser ] = useState({});
    const [ userName, setUserName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ formErrors, setFormErrors ] = useState({})

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${USER_API}${userId}`,{
            userName,
            firstName,
            lastName,
            email
            })
            .then(res => {
                console.log(res);
                window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
                const errRes = err.response.data.error.errors
                setFormErrors(errRes);
            })
        }; 

    useEffect(() => {
        axios.get(
            `${CURRENT_USER_API}`, 
            {headers:
                {'Authorization': `Bearer ${accessToken}`}
            },
            {withCredentials: true}
        )
            .then((res) => {
                // console.log(res);
                setUser(res.data.user);
                setUserName(res.data.user.userName);
                setFirstName(res.data.user.firstName);
                setLastName(res.data.user.lastName);
                setEmail(res.data.user.email);
            })
            .catch(err => console.log(err))
    }, [dataChange]);

  return (
    <div className='h-screen'>
    {accessToken ? 
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center mb-5'>
                <h1 className="text-2xl m-3 border-l-8 border-red-500 rounded pl-2">Update {user.userName}</h1>
                <form onSubmit={handleSubmit} className="w-[500px] border rounded shadow p-4 flex flex-col">
                    <div className='flex'>
                        <section className='m-4'>
                        <div className="flex flex-col gap-2">
                            {formErrors.userName && <p className="text-center text-red-500">{formErrors.userName.message}</p>}
                                <label htmlFor="username">Username: </label>
                                <input id="username" className="border border-black rounded w-[400px] p-1" type="text" onChange={handleUserName} value={userName}/>
                            </div>
                            <div className="flex flex-col gap-2">
                            {formErrors.firstName && <p className="text-center text-red-500">{formErrors.firstName.message}</p>}
                                <label htmlFor="firstName">First Name: </label>
                                <input id="firstName" className="border border-black rounded w-[400px] p-1" type="text" onChange={handleFirstName} value={firstName}/>
                            </div>
                            <div className="flex flex-col gap-2">
                            {formErrors.lastName && <p className="text-center text-red-500">{formErrors.lastName.message}</p>}
                                <label htmlFor="lastName">Last Name: </label>
                                <input id="lastName" className="border border-black rounded p-1" type="text" onChange={handleLastName} value={lastName}/>
                            </div>
                            <div className="flex flex-col gap-2">
                            {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>}
                                <label htmlFor="email">Email: </label>
                                <input id="email" className="border border-black rounded p-1" type="text" onChange={handleEmail} value={email}/>
                            </div>
                        </section>
                    </div>
                <Button buttonText="Update"/>
            </form>
        </div>
        <DeleteButton/>
    </div> :
        <div>
            <h1>Not Authorized</h1>
        </div>
    }
    </div>
  )
}

export default UserPageAccount