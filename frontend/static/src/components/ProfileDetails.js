import React, {Component} from 'react';
import axios from 'axios';
import '../Aside.css';


class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      created_by: '',
      user:JSON.parse(localStorage.getItem('my-app-user')).user_id,
    };
  }

  componentDidMount() {
    let p = window.location.pathname.split('/');
    console.log(p);

    axios.get('/api/v1/profile/')
    .then(res => {
      for (let i=0; i<res.data.length; i++) {
        if (res.data[i].id === parseInt(p[3])) {

          this.setState({profile: res.data[i]});
        }
        console.log(res.data[i]);
        console.log(res.data[i].id);

      }
    })
    .catch(error =>{
      console.log(error);
    });
  }

  render(){

    console.log(this.state)
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
