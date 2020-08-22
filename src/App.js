//React
import React, {Component} from 'react';

//Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

//Css
import './App.css'

//Extras
import Particles from 'react-particles-js';


//----------------------------------------------------------------------
const particlesOptions = {
	particles: {
		number: {
			value: 115,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}
const stateDefaults = {
	input: '',
	image: '',
	box: {},
	route: 'signin',
	isSignIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	},
}
//-----------------------------React Render-----------------------------
class App extends Component{
	constructor(){
		super();
		this.state = stateDefaults;
	}

	boxArray = (response) => {
		const array = response.outputs[0].data.regions[0].region_info.bounding_box;
		const width = Number(document.getElementById('myImage').width);
		const height = Number(document.getElementById('myImage').height);
		return{
			top: array.top_row * height,
			left: array.left_col * width,
			bottom: height - (array.bottom_row * height),
			right: width - (array.right_col * width),
		}
	}

	displayBox = box => this.setState({box: box})

	onInputChange = event => this.setState({input: event.target.value})
 
	onSubmit = (event) => {
	    this.setState({image: this.state.input});
		
		fetch('https://protected-peak-79145.herokuapp.com/imagebox/', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({image: this.state.input})
		})
		.then( jsonBox => jsonBox.json())
		.then( box => {	
			fetch('https://protected-peak-79145.herokuapp.com/image/', {
				method: 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({id: this.state.user.id})
			})
			.then(response => response.json())
			.then(user => {
				this.setState({user: user})
			})			
			console.log(box);
			this.displayBox(this.boxArray(box))
		})
	    .catch(err => console.log("oops, error"))
	}

	onRouteChange = (route) => {
		route === 'home' ? this.setState({isSignIn: true}) : this.setState(stateDefaults);
		this.setState({route: route});
	}

	loadUser = user => this.setState({user: user})


	render(){
		const {isSignIn, image, box, route, user} = this.state;
		const {onRouteChange, loadUser, onInputChange, onSubmit} = this
		return (
			<div className='App'>
				<Particles className='particles' 
				params={particlesOptions}/>
				<Navigation onRouteChange={onRouteChange} isSignIn={isSignIn}/>
				<Logo/>
				{
					route === 'signin' ? 
						<div>
							<SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
						</div>
						:
						route === 'register' ?
							<Register loadUser={loadUser} onRouteChange={onRouteChange}/>
							:
							<div>
								<Rank user={user} />
								<ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
								<FaceRecognition image={image} box={box}/>
							</div>
				}			
			</div>
		);
	}	
}

export default App;