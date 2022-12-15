import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //Details are valid
    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    // console.log({...userDetails, returnSecureToken: true});
    setLoading(true);
    let url;
    if (!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhJlrVDu-BSdMVspSSezvVQWiEtQA65y0';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhJlrVDu-BSdMVspSSezvVQWiEtQA65y0';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...userDetails, returnSecureToken: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          //Do something
          return res.json();
        } else {
          return res.json().then((data) => {
            //Error Modal
            // console.log(data);
            // alert(data.error.message);
            let errorMessage = 'Authentication Failed!';
            if(data.error.message){
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          })
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) =>{
        alert(err.message);
      })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {loading && <p>Sending Request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
