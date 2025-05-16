const moviesControllers = {};
import moviesModel from "../models/Movies.js"

//Select
moviesControllers.getMovies = async (req, res) => {
    const movies = await moviesModel.find()
    res.json(movies)
}

//Insert
moviesControllers.postMovies = async (req, res) => {
    const { tittle, description, director, gender, year, duration, image } = req.body;
    const newMovies = new moviesModel({ tittle, description, director, gender, year, duration, image })
    await newMovies.save()
    res.json({message: "Movie Inserted"})
}

//Delete
moviesControllers.deleteMovies = async (req, res) => {
    await moviesModel.findOneAndDelete(req.params.id)
    res.json({message: "Movie Deleted"})
}

//Update
moviesControllers.putMovies = async (req, res) => {
    const { tittle, description, director, gender, year, duration, image } = req.body;

    await moviesModel.findByIdAndUpdate(req.params.id, {
        tittle,
        description,
        director,
        gender,
        year,
        duration,
        image
    }, {new: true}
);
res.json({ message: "Movie Updated"});
}

export default moviesControllers