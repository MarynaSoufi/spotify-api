export default (request) => {
  try {
      const { playlistId, songId } = request.body;
      console.log(request.body);
      if(!playlistId) {
          throw new Error("The playlist id was not set");
      }
      if(!songId) {
        throw new Error("The song id was not set");
      }
      let parsedObj = { playlistId, songId };
      if(request.userId) {
          parsedObj.userId = request.userId;
      }

      return parsedObj;
      
  } catch (e) {
      throw new Error('Something went wrong... ')
  }
  
}