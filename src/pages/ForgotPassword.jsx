import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"


function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Success! Check your email.', {position: "top-center"})
      
    } catch (error) {
      toast.error('Could not send the reset email', {position: "top-center"})
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">ForgotPassword</p>
      </header>

      <main>
        <form onSubmit={onSubmit} align='center' >
          <input 
          type="email" 
          className="emailInput"
          placeholder="Email"
          id='email'
          value={email}
          onChange={onChange}
          />

          <Link className="forgotPasswordLink" to='/sign-in' >
            Sign in instead?
          </Link>

          <div className="signInBar">
            <div className="signInText"> Send reset link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword