if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const axios = require('axios');


const getTwentyMoviesTrailers = async (req, res, next) => {
    try {
        const response = await fetchScreenPlay('movie', 2);
        let data = response.data.results;

        let twentyMovieTrailer = [];

        for (let x = 0; x < data.length; x++) {
            const movie = data[x];
            let trailerData = await fetchScreenPlayTrailer('movie', movie.id);
            twentyMovieTrailer.push(trailerData[0]);
        }

        return res.status(200).json({success: true, trailers: twentyMovieTrailer});
    } catch (err) {
        return next(err);
    }
}

const getTwentyTvShowsTrailers = async (req, res, next) => { 
  try {
    const response = await fetchScreenPlay('tv', 2);
    let data = response.data.results;

    let twentyMovieTrailer = [];

    for (let x = 0; x < data.length; x++) {
        const movie = data[x];
        let trailerData = await fetchScreenPlayTrailer('tv', movie.id);
        twentyMovieTrailer.push(trailerData[0]);
    }

    return res.status(200).json({success: true, trailers: twentyMovieTrailer});
  } catch (err) {
    return next(err);
  }
}



const fetchScreenPlay = async (screenPlay ,page = 1) => {
    try {
      let result;
      await axios
        .get(
          `https://api.themoviedb.org/3/${screenPlay}/popular`
        , {
            params: {
                api_key: process.env.API_KEY,
                page: page
            }
        })
        .then((response) => {
          result = response;
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    } catch (error) {
      console.error(error);
    }
};

const fetchScreenPlayTrailer = async (screenPlay, id, page = 1) => {

  try {
    let result = await axios
      .get(
        `https://api.themoviedb.org/3/${screenPlay}/${id}/videos`
      , {
          params: {
              api_key: process.env.API_KEY,
              page: page
          }
      })

    // console.log(result.data.results)
    return result.data.results;
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getTwentyMoviesTrailers, getTwentyTvShowsTrailers };













