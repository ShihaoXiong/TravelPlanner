import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SwitchLink from './SwitchLink';
import http from '../service';
import '../style/Form.css';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
	state = { loading: false };

	onFinish = values => {
		//set button loading
		this.setState({ loading: true });
		http
			.post(`/login?username=${values.username}&password=${values.password}`)
			.then(res => {
				this.props.history.push('/home/range');
			})
			.finally(() => this.setState({ loading: false }));
	};

	render() {
		return (
			<Form
				className='form-container blur'
				name='normal_login'
				onFinish={this.onFinish}
				initialValues={{ username: 'ming@outlook.com', password: '12345678' }}
			>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your Username!'
						}
					]}
				>
					<Input prefix={<UserOutlined />} placeholder='Username' />
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your Password!'
						}
					]}
				>
					<Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' loading={this.state.loading}>
						Log in
					</Button>
				</Form.Item>
				<Link to='/home/signup' component={SwitchLink}>
					Doesn't have account? Click here to sign up
				</Link>
			</Form>
		);
	}
}

export default withRouter(LoginForm);
