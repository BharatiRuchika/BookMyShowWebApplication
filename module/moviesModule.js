const moviesModel = require("../models/currentmovies");
const movieceatsModel = require('../models/movieceats');
const showModel = require('../models/showTime');
const { ObjectId } = require("mongodb");
exports.getAllMovies = async (req, res) => {
    try {

        var response = await moviesModel.find({});
        console.log("response", response);
        res.send({ response });
    } catch (error) {
        console.log("err", error);
    }
}
exports.getMovies = async (req, res) => {
    try {
        var id = req.params.id;
        console.log("id", id);
        console.log("im here");
        var response = await moviesModel.find({ theaterId: id });
        res.send({ response });
    } catch (error) {
        console.log("err", error);
    }
}
exports.getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id", id);
        const movie = await moviesModel.find({ _id: id });
        console.log("movie", movie);
        res.send(movie);
    } catch (err) {
        console.log("err", err);
    }
}
exports.getmovieceats = async (req, res) => {
    try {
        var bookingdate = req.params.bookingdate;
        var moviename = req.params.moviename;
        const ceats = await movieceatsModel.find({ bookingdate: bookingdate, moviename: moviename });
        console.log("ceats", ceats);
        res.send({ ceats });
    } catch (err) {
        console.log("err", err);
    }
}
exports.addMovie = async (req, res) => {
    try {
        console.log("req body", req.body);
        const movies = new moviesModel({
            theaterId: req.body.id,
            moviename: req.body.moviename,
            description: req.body.description,
            actorname: req.body.actorname,
            directorname: req.body.directorname,
            releasedate: req.body.releasedate,
            outdate: req.body.outdate,
            ticketcost: req.body.ticketcost,
            videourl: req.body.video,
            movieimage: req.body.image
        })
        var response = await movies.save();
        console.log("response", response);
        res.send({ response });

    } catch (err) {
        res.send(err);
    }
}
exports.deleteMovie = async (req, res) => {
    try {
        console.log("id", ObjectId(req.params.id));
        const id = req.params.id.toString();
        console.log("id", id);
        const response = await moviesModel.find({ theaterId: id });
        console.log("response", response);
        response.map(async (res) => {
            var id = res._id.toString();
            console.log("idstring", id);
            var showres = await showModel.deleteMany({ movieId: id });
            console.log("showres", showres);
        })
        var movieres = await moviesModel.deleteMany({ theaterId: id });
        console.log("movieres", movieres);
        res.send(movieres);
    } catch (err) {
        res.send(err);
    }
}
exports.getCeats = async (req, res) => {
    console.log(req.params.moviename);
    try {
        var response = await movieceatsModel.find({ moviename: req.params.moviename, startTime: req.params.show, bookingdate: req.params.bookingdate });
        res.send(response);
    } catch (err) {
        res.send(err);
    }
}
exports.editMovie = async (req, res) => {
    console.log("body", req.body);
    var id = req.body.id;
    try {
        var response = await moviesModel.findByIdAndUpdate(id, {
            theaterId: req.body.theaterId,
            moviename: req.body.moviename,
            description: req.body.description,
            actorname: req.body.actorname,
            releasedate: req.body.releasedate,
            directorname: req.body.directorname,
            outdate: req.body.outdate,
            ticketcost: req.body.ticketcost,
            videourl: req.body.video,
            movieimage: req.body.image
        })
        console.log("response", response);
        res.send(response);
    } catch (err) {
        res.send(err);
    }
}
exports.getShows = async (req, res) => {
    try {
        console.log(req.params.id);
        var response = await moviesModel.find({ theaterId: req.params.id });
        console.log("showsresponse", response);
        var arr = [];
        response.map(async (data) => {
            arr.push(await showModel.find({ movieId: data._id.toString() }))
            // console.log("shows",shows);
            // var show = shows;
            // arr.push(show);
            // console.log("arr",arr);
        })
        console.log("arr", arr);
        if (arr.length > 0) {
            res.send({ arr: arr });
        }

    } catch (err) {
        res.send(err);
    }
    // console.log("arr",arr);
}
exports.searchByName = async (req, res) => {
    try {
        console.log(req.params.name);
        var response = await moviesModel.find({ moviename: req.params.name })
        console.log("res", res);
        res.send(response);
    } catch (err) {
        console.log("err", err);
    }
}

