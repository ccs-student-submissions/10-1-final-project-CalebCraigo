import React, {Component} from 'react';
import axios from 'axios';
import '../Aside.css';

if(localStorage.getItem('my-app-user')) {
   axios.defaults.headers.common["Authorization"] = `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`;
}

class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},

    };
  }

  componentDidMount() {
    // let p = window.location.pathname.split('/');
    // console.log(p);

    axios.get('/api/v1/profile/detail/')
    .then(res => {
        this.setState({profile: res.data[0]})
    })
    .catch(error =>{
      console.log(error);
    });
  }

  logout () {
    axios.post('/api/v1/rest-auth/logout/')
      .then(res => {
        localStorage.clear()
        this.history.push('/');
      })
      .catch(error =>{
        console.log(error);
      });
  }

  render(){
    return (
      <section className='aside-content'>
        <h1>{this.state.profile.name}</h1>
        <img src={this.state.profile.avatar} alt='' />
        <p>Prefences Place Holder</p>
        <button onClick={this.logout}>Log Out</button>
      </section>
    );
  };
}

export default ProfileDetails;
