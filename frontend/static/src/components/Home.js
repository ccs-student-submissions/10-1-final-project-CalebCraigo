import React, {Component} from "react";

// const Child = ({index, randomGenerator, startingInt}) => (
//   {startingInt : 60 ? (
//     <p>Stop being picky! Shut up and Eat!</p>
//   ):(
//     <button className='buttons btn btn-secondary btn-lg' type='button' onClick={this.randomGenerator}>Random Generator</button>
//   )}
// )
class Home extends Component {


  render() {

    return (
      <div className='aside-box'>
        <h1 className='header'>Shut Up & Eat</h1>

        {/* only show profile link if user is logged in */}
        {localStorage.getItem('my-app-user') ? (
          <React.Fragment>
            <h4>Welcome to Shut Up and Eat, the app that tells you where to eat!</h4>
            <p>Click Profile to update your Preferences.</p>
            <a className='navbtn btn btn-secondary' href='/profile/'>Profile</a>
          </React.Fragment>
        ): (
          <React.Fragment>
            <h4>Welcome to Shut Up and Eat, the app that tells you where to eat!</h4>
            <p>Sign in or Sign Up to create your own restaurant preferences.</p>
            <a className='navbtn btn btn-secondary' href='/login/'>Sign In</a>
            <a className='navbtn btn btn-secondary' href='/signup/'>Sign up</a>
          </React.Fragment>

        )}
    </div>
    )
  }
}

export default Home;
