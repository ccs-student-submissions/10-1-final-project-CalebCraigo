import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../components/Aside.css';

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
      loading: false,
      kid_friendly: false,
      outdoor_seating: false,
      vegetarian_friendly: false,
      gluten_free_options: false,
      farm_to_table: false,
      serves_alcohol: false,
      fullbar: false,
      waterfront: false,
      live_music: false
    };
    this.deactivate = this.deactivate.bind(this);
    this.handleAvatarUpdate = this.handleAvatarUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {

    let obj = {
      'Kid Friendly': 'kid_friendly',
      'Outdoor Seating': 'outdoor_seating',
      'Vegetarian Friendly': 'vegetarian_friendly',
      'Gluten Free Options': 'gluten_free_options',
      'Farm-to-Table': 'farm_to_table',
      'Serves Alcohol': 'serves_alcohol',
      'Fullbar': 'fullbar',
      'Waterfront': 'waterfront',
      'Live Music': 'live_music'
    }

    axios.get('/api/v1/profile/detail/', {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`}})
    .then(res => {

    console.log(res.data[0].highlights);
    this.setState({profile: res.data[0]});
    res.data[0].highlights.map((highlight) => {
      let key = highlight.text;
      this.setState({[obj[key]]: true});
    });
    console.log(this.state.loading)
    })
    .catch(error =>{
      console.log(error);
    });

  }

  handleAvatarUpdate(e){
    let file = e.target.files[0];
    this.setState({avatar: file});
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    };
    reader.readAsDataURL(file);
  }

  handleCheckboxChange(e) {
    this.setState({[e.target.name]: e.target.checked});
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

    formData.append('highlights', JSON.stringify(highlights));
    axios.patch(`/api/v1/profile/${this.state.profile.id}/`, formData, {
      headers : {
        'content-type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`,
      }
    })
    .then(res => {
      this.props.history.push(`/`);
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
      // return <Redirect to='/' push={true} />;
      this.props.history.push(`/`);
    }

    const isLoading = this.state.loading


    return (

      <section>


          <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <h1>{this.state.profile.name}</h1>

            <img className='profileimg' src={this.state.profile.avatar} alt='' />

            <p>Update Your Preferences</p>

          <section>
            <input className='checkbox' id='kid_friendly' checked={this.state.kid_friendly} type='checkbox' name='kid_friendly' value={this.state.kid_friendly} onChange={this.handleCheckboxChange} />
            <label htmlFor="kid_friendly" className="checkbox">Kid Friendly</label>

            <input className='checkbox' id='outdoor_seating' checked={this.state.outdoor_seating} type='checkbox' name='outdoor_seating' value={this.state.outdoor_seating} onChange={this.handleCheckboxChange} />
            <label htmlFor="outdoor_seating" className="checkbox">Outdoor Seating</label>

            <input className='checkbox' id='vegetarian_friendly' checked={this.state.vegetarian_friendly} type='checkbox' name='vegetarian_friendly' value={this.state.vegetarian_friendly} onChange={this.handleCheckboxChange} />
            <label htmlFor="vegetarian_friendly" className="checkbox">Vegetarian Friendly</label>

            <input className='checkbox' id='gluten_free_options' checked={this.state.gluten_free_options} type='checkbox' name='gluten_free_options' value={this.state.gluten_free_options} onChange={this.handleCheckboxChange} />
            <label htmlFor="gluten_free_options" className="checkbox">Gluten Free Option</label>

            <input className='checkbox' id='farm_to_table' checked={this.state.farm_to_table} type='checkbox' name='farm_to_table' value={this.state.farm_to_table} onChange={this.handleCheckboxChange} />
            <label htmlFor="farm_to_table" className="checkbox">Farm-to-Table</label>

            <input className='checkbox' id='serves_alcohol'  checked={this.state.serves_alcohol} type='checkbox' name='serves_alcohol' value={this.state.serves_alcohol} onChange={this.handleCheckboxChange} />
            <label htmlFor="serves_alcohol" className="checkbox">Serves Alcohol</label>

            <input className='checkbox' id='fullbar' checked={this.state.fullbar} type='checkbox' name='fullbar' value={this.state.fullbar} onChange={this.handleCheckboxChange} />
            <label htmlFor="fullbar" className="checkbox">Fullbar</label>

            <input className='checkbox' id='waterfront' checked={this.state.waterfront} type='checkbox' name='waterfront' value={this.state.waterfront} onChange={this.handleCheckboxChange} />
            <label htmlFor="waterfront" className="checkbox">Waterfront</label>

            <input className='checkbox' id='live_music' checked={this.state.live_music} type='checkbox' name='live_music' value={this.state.live_music} onChange={this.handleCheckboxChange} />
            <label htmlFor="live_music" className="checkbox">Live Music</label>
          </section>
            <a href='/' className='btn btn-secondary'>Back</a>
            <button className='buttons btn btn-secondary'>Save</button>
          </form>
            <button className='buttons btn btn-secondary' onClick={this.deactivate}>Deactivate Account</button>
            <button className='buttons btn btn-secondary' onClick={this.logout}>Log Out</button>
          </React.Fragment>
      </section>
    );
  };
}

export default ProfileDetails;
