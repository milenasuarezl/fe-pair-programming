import { useEffect, useState } from "react"

import { URL } from '../utils/constants'

const useFetchApi = (uri) => {
    const [ response, setResponse ] = useState();

    const url = `${URL}/${uri}`

    const fetchData = async(url) => {
        try{
            const response = await fetch(url)
            const data = await response.json();
            setResponse(data)
        } catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return { response };
}

export default useFetchApi;