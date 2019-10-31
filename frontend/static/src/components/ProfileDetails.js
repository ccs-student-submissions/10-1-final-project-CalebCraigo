import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../Aside.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}` : null;

class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      is_active: '',
      navigate: false,
    };
    this.deactivate = this.deactivate.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // console.log('here i am', localStorage);
    // console.log('axios', axios.defaults.headers.common);
    axios.get('/api/v1/profile/detail/', {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`}})
    .then(res => {
        this.setState({profile: res.data[0]});
    })
    .catch(error =>{
      console.log(error);
    });
  }

  logout = () => {
    axios.post('/api/v1/rest-auth/logout/');
    localStorage.clear('token');
    this.setState({ navigate: true });
  }


  deactivate = () => {
    axios.patch(`/api/v1/profile/${this.state.profile.id}/`, {is_active: false});
    this.setState({is_active: false});
    console.log(this.state.profile.is_active)
    console.log(this.state.is_active)
    this.props.history.push('/');
  }

  render(){
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to='/' push={true} />;
    }
    return (
      <section className='aside-content'>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.profile.name}</h1>
          <img src={this.state.profile.avatar} alt='' />
          <p>Prefences Place Holder</p>
          <button>Save</button>
        </form>
          <a href='/'>Back</a>
          <button onClick={this.deactivate}>Deactivate Account</button>
          <button onClick={this.logout}>Log Out</button>
      </section>
    );
  };
}

export default ProfileDetails;
