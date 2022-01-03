import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import '../style/Form.css';
import { Link } from 'react-router-dom';
import SwitchLink from './SwitchLink';
import http from '../service';

class SignupForm extends Component {
	state = {
		displayModal: false
	};

	handleCancel = () => {
		this.setState({
			displayModal: false
		});
	};

	signupOnClick = () => {
		this.setState({
			displayModal: true
		});
	};

	onFinish = values => {
		//inform server to register
		// signup(data)
		// 	.then(() => {
		// 		message.success(`Successfully signed up`);
		// 	})
		// 	.catch(err => {
		// 		message.error(err.message);
		// 	})
		// 	.finally(() => {
		// 		this.handleCancel();
		// 	});
		http.post('/signup', values).then(res => {
			console.log(res);
		});
	};

	render() {
		return (
			<Form className='form-container blur' name='normal_register' onFinish={this.onFinish} preserve={false}>
				<Form.Item name='username' rules={[{ required: true, message: 'Please type your username' }]}>
					<Input prefix={<UserOutlined />} placeholder='Username' />
				</Form.Item>

				<Form.Item name='password' rules={[{ required: true, message: 'Please create a password for your Username' }]}>
					<Input.Password prefix={<LockOutlined />} placeholder='Password' type='password' />
				</Form.Item>

				<Form.Item
					name='confirm'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("Your passwords don't match"));
							}
						})
					]}
				>
					<Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' type='password' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Sign Up
					</Button>
				</Form.Item>
				<Link to='/home/login' component={SwitchLink}>
					Already have an account? Click here to login
				</Link>
			</Form>
		);
	}
}

export default SignupForm;
