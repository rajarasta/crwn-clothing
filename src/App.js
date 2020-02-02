import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header-component.jsx'
import SignInSignUp from '../src/pages/sign-in-sign-up/sign-in-sign-out.component.jsx'
import { auth } from './firebase/firebase.util.js'


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsusbscribeFromAuto = null

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsusbscribeFromAuto();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>



      </div>
    );
  }

}
export default App;
