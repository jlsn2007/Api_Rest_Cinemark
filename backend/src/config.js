import dotenv from "dotenv"

dotenv.config();

export const config = {

    db: {
        URI: process.env.DB_URI || "mongodb+srv://saravJL:n8OPhpw9WtqG5UmW@cluster2a.xsa5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2A"
    },
    server: {
        port: process.env.PORT || 4000
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
    },
    ADMIN:{
        emailAdmin: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    email:{
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
    cloudinary:{
        cloudinary_name: process.env.CLOUDINARY_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    }
    
}