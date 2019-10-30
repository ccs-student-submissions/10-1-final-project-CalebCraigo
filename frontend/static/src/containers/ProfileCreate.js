import React, {Component} from 'react';
import axios from 'axios';
import '../Aside.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ProfileCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      avatar: null,
      preview: '',
      // preferences: false,
      profile: [],
      created_by: '',
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    console.log(e.target.checked)
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheckboxChange(e) {
    this.setState({[e.target.name]: e.target.checked});
  }

  handleAvatarChange(e) {
    let file = e.target.files[0];
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
    formData.append('name', this.state.name);
    formData.append('avatar', this.state.avatar);
    // formData.append('preferences', this.state.preferences);



    axios.post('/api/v1/profile/create/', formData, {
      headers : {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      let profile = [...this.state.profile];
      this.setState({profile: profile, name:'', preview: null, image: null, created_by:''});

      this.props.history.push('/profile/');
    })
    .catch(error =>{
      console.log(error);
    });
  }

    componentDidMount() {
      axios.get('/api/v1/profile/create/')
    .then(res => {
      console.log(res);
      this.setState({profile: res.data});
    })
    .catch(error => {
      console.log(error);
    });
  }
  render(){

    console.log(this.state);
    return (
      <React.Fragment>
        <section className='aside-content'>
          <form onSubmit={this.handleSubmit}>
          <p>Create Your Profile</p>
          <p>Enter Your Name</p>
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
          <p>Add a picture!</p>
          {this.state.avatar ? (
            <img src={this.state.preview} alt='preview'/>
          ):(
            <input type='file' name='avatar' onChange={this.handleAvatarChange}/>
          )}


          <button>Save</button>
          </form>
        </section>
      </React.Fragment>
    )
  }
}

export default ProfileCreate;
