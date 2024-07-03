"use client"
import React, { useState } from 'react';
// Utility components from ANTD
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Form, Input, InputNumber, Modal, Radio, Select, Upload } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;

// Style SCSS
import "./carDetails.scss"
import Image from 'next/image';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CarDetails = () => {
    const [noOfPics, setNoOfPics] = useState(1);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const onFinish = async (values) => {

        if (fileList.length !== parseInt(values.noOfCopy, 10)) {
            toast.error(`Please select exactly ${values.noOfCopy} image(s).`);
            return;
        }
        setLoading(true)
        const formData = new FormData();
        fileList.forEach((file, index) => {
            formData.append(`file${index}`, file.originFileObj);
        });
        formData.append('city', values.city);
        formData.append('noOfCopy', values.noOfCopy);
        formData.append('phone', values.phone);
        formData.append('price', values.price);
        formData.append('carModal', values.carModal);

        try {
            const res = await axios.post("/api/users/details", formData);
            if (res) {
                setLoading(false)
                toast.success("Car Data Posted Successfully");
            }
        } catch (error) {
            setLoading(false)
            toast.error('Some error occurred');
        }
    };

    return (
        <div className="container">
            <h1> Car Selling Service</h1>
            <Form
                className='form'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Car Modal"
                    name="carModal"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Car Modal!',
                        },
                        {
                            min: 3,
                            message: 'Minimum length is 3 ',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the car price!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please type your phone number!',
                        },
                        {
                            validator: async (_, value) => {
                                if (value && !/^\d{11}$/.test(value)) {
                                    throw new Error('Phone number must be exactly 11 digits.');
                                }
                            },
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="City"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose one!',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="lahore">Lahore </Radio>
                        <Radio value="karachi">Karachi </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="No. of pictures"
                    name="noOfCopy" >
                    <Select
                        onChange={(e) => setNoOfPics(e)}
                        defaultValue={noOfPics}
                    >
                        <Select.Option value="1" >1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        name="file"
                    >
                        {fileList.length >= noOfPics ? null :
                            <button style={{ border: 0, background: 'none', }} type="button" >
                                +
                                <div style={{ marginTop: 8, }} >
                                    Add Pictures
                                </div>
                            </button>}
                    </Upload>
                    {fileList.length == noOfPics ? null : <Text type="danger">{`${noOfPics - fileList.length} Images are required`}</Text>}
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <Image
                            alt="car pictures"
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        Add Car
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CarDetails;
