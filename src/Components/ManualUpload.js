import {
    CloudDownloadOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Upload } from "antd";
import axios from "axios";
import { useState } from "react";

const ManualUploadNode = ({ folder, isUpload = true, ...props }) => {
    const onPreview = async (file) => {
        if (file.url || file.path) {
            window.open(file.url || file.preview, "_blank");
        }
    };

    const onRemove = async (info, fileList) => {
        console.log(info, fileList);
        if (info.path) {
            const response = await axios.delete(`/api/users/upload?path=${info.path}`);
            // const index = info.fileList.indexOf(info.file);
            // const newFileList = info.fileList.slice();
            // newFileList.splice(index, 1);
            //   setFileList(newFileList);
        } else {
            const index = info.fileList.indexOf(info.file);
            const newFileList = info.fileList.slice();
            newFileList.splice(index, 1);
            //   setFileList(newFileList);
        }
    };
    return (
        <>
            <Upload
                name="image"
                action={`/api/users/upload?folder=${folder}`}
                listType="picture-card"
                onPreview={onPreview}
                onRemove={onRemove}
                showUploadList={{
                    showRemoveIcon: true,
                    showDownloadIcon: true,
                }}
                {...props}
            >
                <div>
                    <PlusOutlined />
                    <div
                        style={{
                            marginTop: 8,
                        }}
                    >
                        Upload
                    </div>
                </div>
            </Upload >
        </>
    )
};

export default ManualUploadNode;