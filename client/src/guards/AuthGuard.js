import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
const AuthGuard = ({children, auth}) => {

  
    
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => { 
        
        if (location.pathname === '/dashboard' && auth === false ) {
            navigate('/signin');
        }
  
       
    }, [location.pathname, auth, navigate]);

    return children;

  
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(AuthGuard);