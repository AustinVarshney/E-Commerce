import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Auth.css';

function Auth() {
    return(
        <>
        <div className='outer-container'>
            <div className='inner-container'>
            <div className="left-container">
                <h3>Welcome Back !</h3>
                <h4>Don't have an account?</h4>
                <Stack spacing={2} direction="row">
                    <Button variant="outlined">Register</Button>
                </Stack>
            </div>
            <div className='right-container'>
				<h2>Login</h2>
                <div className='input-fields'>
                  <input type="text" placeholder='username'/>
                  <input type="password" placeholder='password' />
               </div>

                <p>Forget password?</p>

                <Stack spacing={2} direction="row">
                    <Button variant="outlined">Login</Button>
                </Stack>
            </div>
            </div>
        </div>
        </>
    )
}


export default Auth;