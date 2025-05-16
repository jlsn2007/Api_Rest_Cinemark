import moviesModel from "../models/Movies.js"
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

const moviesControllers = {};

//Select
moviesControllers.getMovies = async (req, res) => {
    const movies = await moviesModel.find()
    res.json(movies)
}

//Insert
moviesControllers.postMovies = async (req, res) => {
    try {
        const { tittle, description, director, gender, year, duration } = req.body;
        let imageURL = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["png", "jpg", "jpeg"]
                }
            );
            imageURL = result.secure_url;
        }

        const newMovies = new moviesModel({
            tittle,
            description,
            director,
            gender,
            year,
            duration,
            image: imageURL
        });

        await newMovies.save();
        res.json({ message: "Movie Inserted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


//Delete
moviesControllers.deleteMovies = async (req, res) => {
    await moviesModel.findOneAndDelete(req.params.id)
    res.json({message: "Movie Deleted"})
}

//Update
moviesControllers.putMovies = async (req, res) => {
    const { tittle, description, director, gender, year, duration } = req.body;

    let imageURL = ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        );
        imageURL = result.secure_url
    }

    await moviesModel.findByIdAndUpdate(req.params.id, {
        tittle,
        description,
        director,
        gender,
        year,
        duration,
        image: imageURL
    }, {new: true}
);
res.json({ message: "Movie Updated"});
}

export default moviesControllers