if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const axios = require('axios');


const getTwentyMovies = async (req, res, next) => {
    try {
        const response = await fetchScreenPlay('movie', 1);
        return res.status(200).json(response.data.results);
    } catch (err) {
        return next(err);
    }
}

const getTwentyTvShows = async (req, res, next) => { 
    try {
        const response = await fetchScreenPlay('tv', 1);
        return res.status(200).json(response.data.results);
    } catch (err) {
        return next(err);
    }
}

const getFeatureMovie = async (req, res, next) => {
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing`
      , {
          params: {
              api_key: 'b38617053052d14c445b6e18cafadda7'
          }
      })
    let randomIndex = Math.floor(Math.random() * response.data.results.length)
    res.status(200).json({success: true, featureMovie: response.data.results[randomIndex]})
  } catch (error) {
    console.log(error)
    return next(error)
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
                api_key: 'b38617053052d14c445b6e18cafadda7',
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

module.exports = { getTwentyMovies, getTwentyTvShows, getFeatureMovie };














const heinasdfasdfasdf = async (req, res, next) => {
  try {
    let response = await axios.get(
      `asddddddddddddddddddddddd`
      , {
          params: {
              api_key: 'ddddddddddddddddddddddd'
          }
      })
    let randomIndex = Math.floor(Math.random() * response.data.results.length)
    res.status(200).json({success: true, featureMovie: response.data.results[randomIndex]})
  } catch (error) {
    console.log(error)
    return next(error)
  }
}