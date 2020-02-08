import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header-component.jsx'
import SignInSignUp from '../src/pages/sign-in-sign-up/sign-in-sign-out.component.jsx'
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {

  unsusbscribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props;;

    this.unsusbscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state)
          console.log('aaa')
        })
      }
      setCurrentUser(userAuth);
    });
  }

  //TODO dsajdsa
  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>



      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})

export default connect(
  null,
  mapDispatchToProps)
  (App);
