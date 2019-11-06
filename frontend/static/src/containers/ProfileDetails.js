import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import '../Aside.css';

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
      avatar: '',
      preview: '',
    };
    this.deactivate = this.deactivate.bind(this);
    this.handleAvatarUpdate = this.handleAvatarUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/v1/profile/detail/', {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`}})
    .then(res => {
      this.setState({profile: res.data[0]});
    })
    .catch(error =>{
      console.log(error);
    });

  }

  handleAvatarUpdate(e){
    let file = e.target.files[0];
    // axios.patch(`/api/v1/profile/${this.state.profile.id}/`, {avatar: file});
    this.setState({avatar: file});

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    };
    reader.readAsDataURL(file);
  }


  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('avatar', this.state.avatar);


    axios.patch(`/api/v1/profile/${this.state.profile.id}/`, formData, {
      headers : {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      let profile = [...this.state.profile];
      this.setState({profile: profile, name:'', preview: null, image: null, created_by:'', is_active: true,});

      this.props.history.push('/');
    })
    .catch(error =>{
      console.log(error);
    });
  }


  logout = () => {
    axios.post('/api/v1/rest-auth/logout/');
    localStorage.removeItem('my-app-user');
    this.setState({ navigate: true });
  }


  deactivate = () => {
    axios.patch(`/api/v1/profile/${this.state.profile.id}/`, {is_active: false});
    this.setState({is_active: false});
    this.props.history.push('/');
  };

  render(){
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to='/' push={true} />;
    }
    console.log(this.state.profile)
    return (
      <section className='aside-content'>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.profile.name}</h1>
          {this.state.avatar ? (
            <img src={this.state.profile.preview} alt='preview'/>
          ):(
            <React.Fragment>
            <img src={this.state.profile.avatar} alt='' />
            <input type='file' name='avatar' onChange={this.handleAvatarUpdate}/>
            </React.Fragment>
          )}

          <p>Prefences Place Holder</p>
          <p>{this.state.profile.highlights}</p>
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
