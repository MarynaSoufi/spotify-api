# SPOTIFY API
  -----
## INSTALATION
  -----

- npm install

##  SEEDER 
  -----
- npm run seed(50 users have already been added to the database via seeder)  

## TEST 
  -----
- npm test

## RUN 
  -----
- npm run dev

## WAT CAN BE DONE WITHOUT LOGIN 

- add new user to the database
```
route: localhost:6002/api/users

what to write in the body: 

{ 
    "user":
    {
    "name": "user name",
    "email": "user email",
    "password": "user password"
    }
    
}
```


