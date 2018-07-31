# rKanban

[![rkanban](https://rkanban-app.herokuapp.com/static/logo.svg)](https://rkanban-app.herokuapp.com)

rKanban is a simple kanban app coded with [React](https://reactjs.org/) and [Material UI](https://material-ui.com/). 

### Features
  - SignIn and SignOn mechanics
  - Multiple project dashboard
  - Postit drag and drop and colouring

#### For the sake of experimentation :)

The main goal of this project is to serve as a learning subject, therefore I have used some experimental react features as well. Bellow, there is a list with the main mechanics you will find on this project

> [React Context](https://reactjs.org/docs/context.html) at ..src/components/login/[AuthContext.jsx](https://github.com/thiago-nsjob/react_kanban/blob/master/kanban.app/src/components/login/AuthContext.jsx)
>
> [Custom Routes](https://medium.freecodecamp.org/how-to-protect-your-routes-with-react-context-717670c4713a) at 
..src/components/protectedRoute/[ProtectedRoute.jsx](https://github.com/thiago-nsjob/react_kanban/blob/master/kanban.app/src/components/protectedRoute/ProtectedRoute.jsx)
>
> [Redux](https://redux.js.org/) at ..src/components/signup/[SignUp.jsx](https://github.com/thiago-nsjob/react_kanban/blob/master/kanban.app/src/components/signup/SignUp.jsx) 
*I had a hard time to graps it, thus I decided to use only on this component due to verbosity and time. It's good though to get the idea once it is implemented in just one component.
>
> [Some Reflection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)  at ..src/components/signup/[SignUp.jsx](https://github.com/thiago-nsjob/react_kanban/blob/master/kanban.app/src/components/container/reducers/signupReducers.jsx) 
>
> [Pure HTML Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) at ..src/components/lane/[Lane.jsx]


### Demo
This [demo](https://rkanban-app.herokuapp.com) is for some acquaintance only. All the data has the duration of a session.  

### Next Features
  - Addition of a database and store all data on a MongoDb instance.
  - Implement unit tests 


### Techs
> The overriding design goal for Markdown's
>

### Installation
Clone this repo

```sh
$ git clone https://github.com/thiago-nsjob/react_kanban
```

Install the dependencies.

```sh
$ cd react_kanban/kanban.app
$ yarn add
```
Run the start script.
```sh
$ yarn start
```

### Screenshots

