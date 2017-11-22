import React, {
	Component
} from 'react';
import './LoginForm.css';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Button from '../Pages/Button.js';

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isVisible: this.props.isVisible
		};
		// This binding is necessary to make `this` work in the callback
		this.handleChange = this.handleChange.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	submitHandler(evt) {
		evt.preventDefault();
		this.props.handlerFromHomePage(this.state.username);
		this.props.onDismiss();
	}
	handleChange(event) {
		this.setState({
			username: event.target.value
		});
	}
	onSubmit() {
		this.props.onDismiss();
		console.log("submitted form");
	}
	onCancel() {
		this.props.onDismiss();
	}
	render() {
		return (
			<div class="LoginForm">
				  <form class="login-form">
						<h2>Login</h2>
						<div class="form-element">
							  <h4>Username:</h4>
							  <input class="form-input"
							  type="text"
							  id="input-username"
							  value={this.state.username}
							  onChange={this.handleChange} />
						</div>
						<div class="form-element">
							  <h4>Password:</h4>
							  <input class="form-input" type="text" name="password" defaultValue="" />
						</div>
						<br/>
				  </form>
				  <div class="buttons">
						<div class="cancel-button">
							  <Button onClick={this.onCancel} content="Cancel"/>
						</div>
						<div class="submit-button">
							  <Button onClick={this.submitHandler} content="Submit"/>
						</div>
				  </div>
			</div>

		);
	}
}
export default LoginForm;