import React, {Component} from 'react';

class Register extends Component{
	constructor(props){
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onRegister = () => {
		const { name, email, password} = this.state;
		const { onRouteChange, loadUser } = this.props;
		
		if(name.length && email.length && password.length){
			fetch('http://localhost:3001/register/',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({name: name, email: email, password: password})
			})
			.then(response => response.json())
			.then(user => {
				console.log(user);
				if (user.id) {
					loadUser(user);
					onRouteChange('home');
				}
			})
		}
		else{
			console.log('Todos los campos son obligatorios!');
		}	
	}


	render(){

		const { onNameChange, onEmailChange, onPasswordChange, onRegister } = this;

		return (
			<div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>
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
				      <input onClick={onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
				    </div>
				  </div>
				</main>
			</div>
		);
	}
}

export default Register;