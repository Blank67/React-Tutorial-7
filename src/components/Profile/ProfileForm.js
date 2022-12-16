import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const newPasswordRef = useRef('');
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler =(e) =>{
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    //Password validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhJlrVDu-BSdMVspSSezvVQWiEtQA65y0', {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: newPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application.json'
      }
    }).then((res) => {
      history.replace('/');
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
