import React from 'react';
import Dashboard from './Components/Dashboard';
import UpdatePost from './Components/UpdatePost';
import { Route } from 'react-router-dom';
import Comments from './Components/Comments';
import './App.css';

function App() {
  return (
    <div className="App">

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/updatePost/:id" component={UpdatePost} />
      <Route exact path="/comments/:id" component={Comments} />
    </div>
  );
}

export default App;
