 /**
 * Function tht will give us 100% certainty that the data
 * coming  is a playlist item
 */
/**
 */
 export default (request) => {
  try {
      const { playlist } = request.body;
      console.log(request.body);
      if(playlist == null) {
          throw new Error("The Song Object was not set");
      }
      if(playlist.name == null || playlist.name.length === 0) {
          throw new Error("The Playlist Object does not contain a name");
      }
      if(playlist.name !== null) {
        playlist.name = playlist.name.trim();
      }
      if(request.userId) {
          playlist.user_id = request.userId;
      }
      return playlist;
      
  } catch (e) {
      throw new Error('Something went wrong... ')
  }
  
}