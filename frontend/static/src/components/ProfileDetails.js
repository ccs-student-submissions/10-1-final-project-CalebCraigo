import React, {Component} from 'react';
import axios from 'axios';
import '../Aside.css';

axios.defaults.headers.common['Authorization'] = `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`;

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

  render(){
    return (
      <section className='aside-content'>
        <h1>{this.state.profile.name}</h1>
        <img src={this.state.profile.avatar} alt='' />
        <p>Prefences Place Holder</p>

      </section>
    );
  };
}

export default ProfileDetails;
