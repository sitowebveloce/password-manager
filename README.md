This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Password Manager app.
A simple password manager where archive your passwords.

![Info Tech Blog](/client/public/passman.gif)

#### Stack
- Backend: Nodejs
- Frontend: Reactjs
- Database: Mongodb(cloud)

### Usage
Rename file env.env inside the root directory, to .env, replace MONGO_URI field, with your db connection string, replace JWT(jsonwebtoken) with your secret key(can be a simple string), set the token expire (default one day), set the cookie expire (default one day):

```
MONGO_URI=
JWT_SECRET=your-secret-key
JWT_EXP=1d
JWT_COOKIE_EXP=1
```

Inside the client (react) folder rename env.env to .env, insert your secret registration key (can be a simple string):
```
REACT_APP_SIGNUP_SECRET=your-secret-key
```

### `npm run build`
If you edit the client files, redo the build for production,
after `npm run build` place the content of the `build` folder inside the `public` folder in the project root.

The build is minified and the filenames include the hashes.<br />

### `npm i`
Install dependencies.

### Version
`1.3.0`

### License MIT

#### author @lexpaper ❤️