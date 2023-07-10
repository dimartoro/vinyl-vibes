//Importing dependencies
import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            {/* <Link to="/orderHistory"> */}
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          {/* <li className="mx-1"> */}
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            {/* <a href="/userProfile"> */}
              {/* Profile */}
            {/* </a> */}
          {/* </li> */}
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              <h5>Signup</h5>
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              <h5>Login</h5>
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="vinyl"><FontAwesomeIcon icon={faRecordVinyl} beat />
</span>
          VinylVibes
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
