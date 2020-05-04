import { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../reducers/Auth';
import * as storage from '../../lib/storage';


class UserLoader extends Component {

  checkLoginStatus = async () => {
    
    const { AuthActions } = this.props;

    const userInfo = await storage.get();
    if(userInfo) {
        AuthActions.setUser(userInfo);
    }
    try {
      await AuthActions.checkLoginStatus();
      if(!!this.props.auth.userInfo.id)
      if(!userInfo || (userInfo && userInfo.id !== this.props.auth.userInfo.id)) {
        // if there is any change in login status, resave the user info
        storage.set(this.props.auth.userInfo);
      }
    } catch (e) {
      // if there is an error, removes the data from the storage
        console.log('error', e)
        storage.remove();
      return;
    }
  }  

  async componentDidMount() {
    await this.checkLoginStatus();  
  }
  
  render() {
    return null;
  }
}

const mapStateToComponent = ({ state }) => ({
    auth: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    AuthActions: bindActionCreators(actions, dispatch),
  })
  
  export default connect( mapStateToComponent,mapDispatchToProps )(UserLoader)