import { message } from "antd";

export const manualNormFile = (info) => {
    if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
        console.log(info);
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file?.status === "error") {
        message.error(`${info.file.name} file upload failed`);
    }
    // let modifiedObjct = info.fileList?.map((person) => ({
    //   ...person,
    //   url: person.response ? person.response?.url : person.url,
    //   path: person.response ? person.response?.path : person.path,
    //   uid: person.uid,
    //   name: person.name,
    //   status: person.status,
    //   type: person.type,
    //   size: person.size,
    // }));
    // console.log(modifiedObjct, info);
    return info.fileList;
};