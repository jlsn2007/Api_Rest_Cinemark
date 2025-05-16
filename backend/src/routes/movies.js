import express from "express";
import moviesController from "../controllers/moviesControllers.js";
import multer from "multer";


const upload = multer({dest: "public/"})

const router = express.Router();

router.route("/")
.get(moviesController.getMovies)
.post(upload.single("image"),moviesController.postMovies)

router.route("/:id")
.put(upload.single("image"),moviesController.putMovies)
.delete(moviesController.deleteMovies);

export default router;