"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// utility functions
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
// Style classes
import "./loginPage.scss"

const Login = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const onFinish = async (values) => {
    try {
      setLoading(true)
      const res = await axios.post("api/users/login", values)
      if (res) {
        setLoading(false)
        toast.success("Login Success")
        router.push("/cardetails")
      }

    } catch (error) {
      setLoading(false)
      toast.error('Some error Occured')
    }
  };

  return (
    <>
      <div className="container">
        <Form
          className='form'
          layout='vertical'
          autoComplete="off"
          initialValues={{ email: 'Amjad@desolint.com', password: '123456abc' }}
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;