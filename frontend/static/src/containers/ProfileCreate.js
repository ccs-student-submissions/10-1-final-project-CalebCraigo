import React, {Component} from 'react';
import axios from 'axios';
import '../components/Aside.css';

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
      kid_friendly: false,
      outdoor_seating: false,
      vegetarian_friendly: false,
      gluten_free_options: false,
      farm_to_table: false,
      serves_alcohol: false,
      fullbar: false,
      waterfront: false,
      live_music: false
      // establishmenttypes: {
      //   casual_dining: false,
      //   fast_food: false,
      // },
      // cuisines: {
      //   spanish: false,
      //   tapas: false,
      //   american: false,
      //
      // }
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

  choiceForm = (key, highlights) => {
    for (let key in this.state.highlights) {
      if (key === true);
      console.log(this.state.highlights)
  } return highlights[key];
}


  handleSubmit(e) {
    e.preventDefault();

    let obj = {
      kid_friendly: 'Kid Friendly',
      outdoor_seating: 'Outdoor Seating',
      vegetarian_friendly: 'Vegetarian Friendly',
      gluten_free_options: 'Gluten Free Options',
      farm_to_table: 'Farm-to-Table',
      serves_alcohol: 'Serves Alcohol',
      fullbar: 'Fullbar',
      waterfront: 'Waterfront',
      live_music: 'Live Music'
    }

    let formData = new FormData();
    let data = this.state;
    let highlights = []

    for (let key in obj) {
      if(data[key] === true) {
        highlights.push(obj[key]);
      }
    }

    formData.append('name', this.state.name);
    formData.append('avatar', this.state.avatar);
    formData.append('highlights', JSON.stringify(highlights));
    console.log(highlights)
    axios.post(`/api/v1/profile/create/`, formData, {
      headers : {
        'content-type': 'multipart/form-data',
        'Authorization': `Token ${JSON.stringify(localStorage.getItem('my-app-user')).token}`
      }
    })
    .then(res => {
      console.log(res);
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
    return (
      <React.Fragment>
        <section>
          <form onSubmit={this.handleSubmit}>
          <h2>Create Your Profile</h2>
          <p className='nameinput'>Enter Your Name</p>
          <input className='nameinput' type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
          <p className='avatarinput'>Add a picture!</p>
          {this.state.avatar ? (
            <img className='profileimg avatarinput' src={this.state.preview} alt='preview'/>
          ):(
            <input className='avatarinput' type='file' name='avatar' onChange={this.handleAvatarChange}/>
          )}

          <p>Select some preferences to help us make a selection for you!</p>
          <div>
            <input className='checkbox' id='kid_friendly' checked={this.state.kid_friendly} type='checkbox' name='kid_friendly' value={this.state.kid_friendly} onChange={this.handleCheckboxChange} />
            <label for="kid_friendly" className="checkbox">Kid Friendly</label>

            <input className='checkbox' id='outdoor_seating' checked={this.state.outdoor_seating} type='checkbox' name='outdoor_seating' value={this.state.outdoor_seating} onChange={this.handleCheckboxChange} />
            <label for="outdoor_seating" className="checkbox">Outdoor Seating</label>

            <input className='checkbox' id='vegetarian_friendly' checked={this.state.vegetarian_friendly} type='checkbox' name='vegetarian_friendly' value={this.state.vegetarian_friendly} onChange={this.handleCheckboxChange} />
            <label for="vegetarian_friendly" className="checkbox">Vegetarian Friendly</label>

            <input className='checkbox' id='gluten_free_options' checked={this.state.gluten_free_options} type='checkbox' name='gluten_free_options' value={this.state.gluten_free_options} onChange={this.handleCheckboxChange} />
            <label for="gluten_free_options" className="checkbox">Gluten Free Option</label>

            <input className='checkbox' id='farm_to_table' checked={this.state.farm_to_table} type='checkbox' name='farm_to_table' value={this.state.farm_to_table} onChange={this.handleCheckboxChange} />
            <label for="farm_to_table" className="checkbox">Farm-to-Table</label>

            <input className='checkbox' id='servers-alcohol' checked={this.state.serves_alcohol} type='checkbox' name='serves_alcohol' value={this.state.serves_alcohol} onChange={this.handleCheckboxChange} />
            <label for="servers-alcohol" className="checkbox">Serves Alcohol</label>

            <input className='checkbox' id='fullbar' checked={this.state.fullbar} type='checkbox' name='fullbar' value={this.state.fullbar} onChange={this.handleCheckboxChange} />
            <label for="fullbar" className="checkbox">Fullbar</label>

            <input className='checkbox' id='waterfront' checked={this.state.waterfront} type='checkbox' name='waterfront' value={this.state.waterfront} onChange={this.handleCheckboxChange} />
            <label for="waterfront" className="checkbox">Waterfront</label>

            <input className='checkbox' id='live_music' checked={this.state.live_music} type='checkbox' name='live_music' value={this.state.live_music} onChange={this.handleCheckboxChange} />
            <label for="live_music" className="checkbox">Live Music</label>
            </div>
            <button className='buttons btn btn-secondary'>Save</button>
          </form>
        </section>
      </React.Fragment>
    )
  }
}

export default ProfileCreate;
