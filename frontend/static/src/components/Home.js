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
        <h1>Shut Up & Eat</h1>

        {/* only show profile link if user is logged in */}
        {localStorage.getItem('my-app-user') ? (
          <a href='/profile/'>Profile</a>
        ): (

          <div>
            <a href='/login/'>Sign In</a>
            <a href='/signup/'>Sign up</a>

          </div>

        )}
    </div>
    )
  }
}

export default Home;
