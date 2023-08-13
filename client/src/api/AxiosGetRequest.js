import axios from 'axios';

async function getData(endpoint, token){
    const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + endpoint, 
        {
            withCredentials: true, 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }
    );
    return response;
}

export { getData };