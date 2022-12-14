import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const DeleteButton = () => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));

    const navigate = useNavigate();
    
    const handleDelete = () => {

        const answer = confirm("Are you sure you want to delete this account?");

        console.log(userId)

        if(answer) {
            axios.delete(`http://localhost:8000/api/rotten_potatoes/user/${userId}`)
            .then(res => {
                console.log(res, "delete request");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                navigate("/");
                window.location.reload(false);
            })
            .catch(err => console.log(err))
        } else {
            return
        }
    };

  return (
    <button onClick={() => {handleDelete()}} className="border border-red-500 rounded p-1 text-red-500 hover:text-white hover:bg-red-500 hover:border-white">Delete Account</button>
  )
}

export default DeleteButton