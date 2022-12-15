import {useState} from 'react'
import { toast } from 'react-toastify'

import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
      if(userCredential.user) {
        navigate('/')
      }

    } catch (error) {
      toast.error(`This account is not registered yet.`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    } 
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome back! We've missed you.
          </p>
        </header>

        <main>
          <form align="center" onSubmit={onSubmit}>
            <input type="email" 
                   className="emailInput" 
                   placeholder='Email'
                   id='email'
                   value= {email}
                   onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'}
                     className='passwordInput'
                     placeholder='Password'
                     id='password'
                     value={password}
                     onChange={onChange}
              />

              <img src={visibilityIcon}
                   alt="Show Password" 
                   className="showPassword" 
                   onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password" className='forgotPasswordLink'>
              Forgot your password?
            </Link>

            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
            
          </form>

          <OAuth/>
          
          <Link to='/sign-up' className='registerLink'>
            New here? Sign up!
          </Link>

        </main>

      </div>
    
    </>
     
  )
}

export default SignIn