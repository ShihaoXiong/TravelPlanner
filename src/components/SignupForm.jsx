import React, { Component } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signup } from '../utils';
import '../style/Form.css';
import { Link } from 'react-router-dom';

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

	onFinish = data => {
		//inform server to register
		signup(data)
			.then(() => {
				message.success(`Successfully signed up`);
			})
			.catch(err => {
				message.error(err.message);
			})
			.finally(() => {
				this.handleCancel();
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
				<Link to='/home/login' component={Typography.Link}>
					Already have an account? Click here to login
				</Link>
			</Form>
		);
	}
}

export default SignupForm;
