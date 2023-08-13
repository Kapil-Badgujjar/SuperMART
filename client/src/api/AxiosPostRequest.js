import axios from 'axios'

async function postData(endpoint, data, token){
    try{
            const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + endpoint, data, 
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                }
            );
            return response;
    } catch (error) {
        try{
            error.message = error.response.data.message;
        } catch(err){
            console.log(err.message);
        }
        throw error;
    }
}

export { postData };