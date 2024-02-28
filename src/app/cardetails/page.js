"use client"
import React, { useState } from 'react';

// Utility componets form ANTD
import { Button, Form, Input, InputNumber, Modal, Radio, Select, Upload } from 'antd';

// Style SCSS
import "./carDetails.scss"
import toast from 'react-hot-toast';
import axios from 'axios';



const CarDetails = () => {

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const [noOfPics, setNoOfPics] = useState(1);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
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
    // const handleChange = (newFileList) => {
    //     console.log("images is: ", newFileList)
    // };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const formData = new FormData();
        fileList?.forEach((image) => {
            formData.append("file", image);
        });
        console.log("form data is: ", formData);

        try {
            const res = await axios.post("api/users/details", formData)
            if (res) {
                toast.success("Car Data Posted Success")
            }

        } catch (error) {
            toast.error('Some error Occured')
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
                {/* Car modal */}
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

                {/* Price of the car */}
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please the car price!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                {/* Phone number for Car details */}
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

                {/* City for Car details */}
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

                {/* No of pictures for Car details */}
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

                {/* Multiple pictures for Car details */}
                <Form.Item >
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= noOfPics ? null :
                            <button style={{ border: 0, background: 'none', }} type="button" >
                                +
                                <div style={{ marginTop: 8, }} >
                                    Add Pictures
                                </div>
                            </button>}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="car pictures"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item>

                {/* Submit Button for Car details */}
                <Form.Item

                >
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                        Add Car
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CarDetails;