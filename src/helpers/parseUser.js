
 /**
 * Function tht will give us 100% certainty that the data
 * coming is a user item
 */
/**
 */
//import email validator to check of the email is valid
import emailValidator from 'email-validator';

export default (request) => {
  try {
      const { user } = request.body;
      console.log(request.body);
      if(!user) {
          throw new Error("The User Object was not set");
      }
      if(!user.email || !user.email.length || !emailValidator.validate(user.email) ) {
          throw new Error("The User Object does not contain a correct email address");
      }
      if(!user.name || !user.name.length) {
        throw new Error("The User Object does not contain a name");
      }
      if(user.email) {
        user.email = user.email.trim();
      }
      if(user.name) {
        user.name = user.name.trim();
      }

      return user;
      
  } catch (e) {
      throw new Error('Something went wrong... ')
  }
  
}