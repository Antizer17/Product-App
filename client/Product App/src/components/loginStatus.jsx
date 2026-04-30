import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MiniLoginStatus = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState("loading");
    const [recheck,setRecheck] = useState(false)
    const [username, setUsername] = useState('')
    const handleClick = async ()=>{
        try{
            const res = await fetch('http://localhost:5000/api/logout')
            const data = await res.json()
            if(data.success){
                setRecheck(true)
                navigate('/login')
            }
    
        }catch(error){
            console.error(error)
        }
    
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/login-status', {
                    credentials: 'include' 
                });
                const data = await res.json();
                setStatus(data.success ? true : false);
                setUsername(data.success ? data.username : 'Pasa');
            } catch (error) {
                setStatus(false);
            }
        };

        checkAuth();
       
    }, [recheck]);


    const pillStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '13px', // Half the usual size
        fontWeight: '500',
        fontFamily: 'sans-serif',
        backgroundColor: status === "loading" ? '#f0f0f0' : (status ? '#e6fffa' : '#fff5f5'),
        color: status === "loading" ? '#666' : (status ? '#2c7a7b' : '#c53030'),
        border: `1px solid ${status === "loading" ? '#ccc' : (status ? '#b2f5ea' : '#feb2b2')}`,
        marginLeft: '15px'
    };

    const dotStyle = {
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        marginRight: '6px',
        backgroundColor: status === "loading" ? '#aaa' : (status ? '#38a169' : '#e53e3e'),
        display: 'inline-block'
    };

    if (status === "loading") {
        return <div style={pillStyle}>Checking...</div>;
    }

    return (
    <div className="login-container" style={{display:"flex",
        gap:"2rem",
    
    }}>
        <div style={pillStyle}>
            <span style={dotStyle}></span>
            {status ? username : "Logged Out"}
            
        </div>
        <div>{status ? <Link onClick={handleClick} to={'/login'}>Logout</Link> : <Link to={'/login'}>Sign In</Link>}</div>

    </div>
        
    );
};

export default MiniLoginStatus;