import express from "express";
import moviesController from "../controllers/moviesControllers.js";

const router = express.Router();

router.route("/")
.get(moviesController.getMovies)
.post(moviesController.postMovies)

router.route("/:id")
.put(moviesController.putMovies)
.delete(moviesController.deleteMovies);

export default router;