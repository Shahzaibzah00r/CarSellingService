"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

// utility functions
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';

// Style classes
import "./loginPage.scss"

const Login = () => {

    const router = useRouter()
    const onFinish = async (values) => {
        try {
            const res = await axios.post("api/users/login", values)
            if (res) {
                toast.success("Login Success")
                router.push("/")
            }

        } catch (error) {
            console.log("error is: ", error);
        }
    };

    return (
        <>
            <div className="container">
                <Form
                    className='form'
                    layout='vertical'
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
export default Login;