import React, {Component} from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {signup} from "../utils";

class SignupForm extends Component {
    state = {
        displayModal: false
    };

    handleCancel = () => {
        this.setState({
            displayModal: false,
        });
    };

    signupOnClick = () => {
        this.setState({
            displayModal: true,
        });
    };

    onFinish = (data) => {
        //inform server to register
        signup(data)
            .then(() => {
                message.success(`Successfully signed up`);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                this.handleCancel();
            });
    };

    render() {
        return (
            <>
                <Button type={"primary"} onClick={this.signupOnClick}>
                    Register Here Meow~
                </Button>
                <Modal title="Sign Up"
                       visible={this.state.displayModal}
                       onCancel={this.handleCancel}
                       destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Please type your username" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please create a password for your Username" },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Your passwords don\'t match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>

            </>
        );
    }
}

export default SignupForm;
