import { useState, useEffect} from 'react';
import axios from 'axios';

const UserPage = () => {

    const [ user, setUser ] = useState({})

    useEffect(() => {
        axios.get(
            "http://localhost:8000/api/rotten_potatoes/current_user", 
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }, []);

  return (
    <div>UserPage
        <h1></h1>
    </div>
  )
}

export default UserPage