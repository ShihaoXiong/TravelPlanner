import React, { Component } from 'react';
import { Button, Form, Input, Row, Col, notification } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import '../style/Form.css';
import { Link } from 'react-router-dom';
import SwitchLink from './SwitchLink';
import http from '../service';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {
	state = { loading: false };

	onFinish = values => {
		delete values.confirm;
		this.setState({ loading: true });
		http
			.post('/signup', values)
			.then(() => {
				notification.success({ message: 'Sign Up Successfully!' });
				this.setState({ loading: false });
				this.props.history.push({
					pathname: '/home/login',
					query: { username: values.email, password: values.password }
				});
			})
			.catch(() => this.setState({ loading: false }));
	};

	render() {
		return (
			<Form className='form-container blur' name='normal_register' onFinish={this.onFinish} preserve={false}>
				<Form.Item name='email' rules={[{ required: true, message: 'Please type your email' }]}>
					<Input prefix={<MailOutlined />} placeholder='Email' />
				</Form.Item>

				<Row gutter={10}>
					<Col span={12}>
						<Form.Item name='firstName' rules={[{ required: true, message: 'Please type your firstname' }]}>
							<Input prefix={<UserOutlined />} placeholder='Firstname' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='lastName' rules={[{ required: true, message: 'Please type your lastname' }]}>
							<Input prefix={<UserOutlined />} placeholder='Lastname' />
						</Form.Item>
					</Col>
				</Row>

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
					<Button type='primary' htmlType='submit' loading={this.state.loading}>
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

export default withRouter(SignupForm);
