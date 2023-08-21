import axios from 'axios';

async function getData(endpoint, token){
    try{
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
    }catch (error){
        console.log(error.message);
        return undefined;
    }
}

export { getData };