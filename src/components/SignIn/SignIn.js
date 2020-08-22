import React, {Component} from 'react';

class SignIn extends Component{
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSignIn = () => {
		const { email, password } = this.state;
		const { onRouteChange, loadUser } = this.props;

		fetch('https://protected-peak-79145.herokuapp.com/signin/',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email: email, password: password})
		})
		.then(response => response.json())
		.then(	user => {
			console.log(user);
			if (user.id) {
				loadUser(user);
				onRouteChange('home');
			}
		})	
	}

	render(){
		const { onRouteChange } = this.props;
		const { onEmailChange, onPasswordChange, onSignIn } = this;
		return (
			<div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <a href="#0" onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</a>
				    </div>
				  </div>
				</main>
			</div>
		);
	}
}

export default SignIn;