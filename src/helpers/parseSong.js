 /**
 * Function tht will give us 100% certainty that the data
 * coming from the admin is a song item
 */
/**
 */
export default (request) => {
  try {
      const { song } = request.body;
      console.log(request.body);
      if(!song) {
          throw new Error("The Song Object was not set");
      }
      if(!song || !song.name.length) {
          throw new Error("The Song Object does not contain a name");
      }
      if(!song.artist || !song.artist.length) {
        throw new Error("The Song Object does not contain a artist");
      }
      if(!song.uri || !song.uri.length || !song.uri.includes("spotify:track")) {
        throw new Error("The Song Object does not contain a correct URI");
      }
      if(song.name) {
          song.name = song.name.trim();
      }
      if(song.artist) {
        song.artist = song.artist.trim();
      }
      if(song.uri) {
        song.uri = song.uri.trim();
      }

      return song;
      
  } catch (e) {
      throw new Error('Something went wrong... ')
  }
  
}