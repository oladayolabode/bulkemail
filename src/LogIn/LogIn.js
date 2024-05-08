import React from 'react'
import classes from './LogIn.module.css'
// import backimg from '../../src/BG.png'
import user from '../../src/user.png'
import pass from '../../src/lock.png'
import { Link } from 'react-router-dom'

const LogIn = () => {
    return (
        <div className={classes.container}>
          <div className={classes.innerContainer}>          
            <div className={classes.username}>
              <img src={user} alt="user"/>
              <input type="text" placeholder="USERNAME"/>
            </div>
            <div className={classes.password}>
              <img src={pass} alt="pass"/>
              <input type="password" placeholder="PASSWORD"/>
            </div>
            <Link to= "/home">
              <div className={classes.login}>
                <p>LOGIN</p>
              </div>
            </Link>
          </div>
        </div>
      )
    }

export default LogIn;