const axios = require("axios");

const token = process.env.spotifyToken || "";
const url = "https://api.spotify.com/v1/me/tracks";
const auth = `Bearer ${token}`;
const totalLikedSongsCount = 3686;
const fixedHeaders = {
  Authorization: auth,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getLikedSongs = async () => {
  const necessaryApiCalls = Math.ceil(totalLikedSongsCount / 50);
  const allSongs = [];
  let offset = 0;

  for (let index = 0; index <= necessaryApiCalls; index++) {
    console.log(`Next batch, #${index}`);

    const newurl = `${url}?limit=50&offset=${offset}`;

    const res = await axios.get(newurl, {
      headers: {
        ...fixedHeaders,
        offset: offset,
      },
    });

    const {
      data: { items: songs },
    } = res;

    songs.forEach(({ track: { id, name } }) => {
      return allSongs.push({
        name,
        id,
      });
    });

    offset += 50;
  }

  console.log(
    allSongs.forEach(({ id, name }) => {
      console.log(`${name}, id: ${id}`);
    })
  );
};

getLikedSongs();
