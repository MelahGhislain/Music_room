import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoom from "./CreateRoom";
import HomePage from './HomePage';

export default function App(){
    return (
      <div>
        Hello world
      </div>
      //   <Router>
      //   <Switch>
      //     <Route exact path="/" component={ HomePage } />
      //     <Route path="/join" component={RoomJoinPage} />
      //     <Route path="/create" component={CreateRoom} />
      //   </Switch>
      // </Router>
    );
}

const appDiv = document.getElementById('app');

render(<App />, appDiv);
