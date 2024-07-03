import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
});

export default async function uploader(path) {

    try {
        const uploadResult = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
            folder: "car_images",
        });
        return uploadResult
    } catch (error) {
        throw new Error("some errors")
    }


}
