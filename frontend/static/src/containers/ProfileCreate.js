import React, {Component} from 'react';
import axios from 'axios';
// import '../Aside.css';

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
      // is_active: true,
      highlights: [
        kid_friendly: false,
        outdoor_seating: false,
        vegetarian_friendly: false,
        gluten_free_options: false,
        farm_to_table: false,
        serves_alcohol: false,
        fullbar: false,
        waterfront: false,
      ],
      establishmenttypes: {
        casual_dining: false,
        fast_food: false,
      },
      cuisines: {
        spanish: false,
        tapas: false,
        american: false,

      }

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheckboxChange(e) {
    let highlights = {...this.state.highlights}
    highlights[e.target.name] = true
    this.setState({highlights})

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
    formData.append('highlights', this.state.highlights);
    // formData.append('kid friendly', this.state.kid_friendly)
    // formData.append('preferences', this.state.preferences);



    axios.post('/api/v1/profile/create/', formData, {
      headers : {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      let profile = [...this.state.profile];
      this.setState({profile: profile, name:'', preview: null, avatar: null, created_by:''});
      // let highlights = [...this.state.highlights];
      // this.setState({highlights: highlights, kid_friendly: '', })


      this.props.history.push('/');
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

          <p>Highlights</p>
          <p>Kid Friendly</p>
          <input type='checkbox' name='kid_friendly' value={this.state.highlights.kid_friendly} onChange={this.handleCheckboxChange} />
          <p>Outdoor Seating</p>
          <input type='checkbox' name='outdoor_seating' value={this.state.highlights.outdoor_seating} onChange={this.handleCheckboxChange} />
          <p>Vegetarian Friendly</p>
          <input type='checkbox' name='vegetarian_friendly' value={this.state.highlights.vegetarian_friendly} onChange={this.handleCheckboxChange} />
          <p>Gluten Free Option</p>
          <input type='checkbox' name='gluten_free_options' value={this.state.highlights.gluten_free_options} onChange={this.handleCheckboxChange} />
          <p>Farm-to-Table</p>
          <input type='checkbox' name='farm_to_table' value={this.state.highlights.farm_to_table} onChange={this.handleCheckboxChange} />
          <p>Serves Alcohol</p>
          <input type='checkbox' name='serves_alcohol' value={this.state.highlights.serves_alcohol} onChange={this.handleCheckboxChange} />
          <p>Fullbar</p>
          <input type='checkbox' name='fullbar' value={this.state.highlights.fullbar} onChange={this.handleCheckboxChange} />
          <p>Waterfront</p>
          <input type='checkbox' name='waterfront' value={this.state.highlights.waterfront} onChange={this.handleCheckboxChange} />
          <button>Save</button>
          </form>
        </section>
      </React.Fragment>
    )
  }
}

export default ProfileCreate;
