import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const useCheckLoggedIn = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        const token = localStorage.getItem('access_token');
        if(token == null) {
            navigate('/login');
        }
        
    },[navigate]);
}