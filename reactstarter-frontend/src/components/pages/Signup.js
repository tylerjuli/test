import React, {Component} from 'react'
import * as actions from '../../reducers/Auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from '../atoms/Alert'

class Signup extends Component{

    constructor(props){
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            retypePassword: ''
        }
    }

    componentDidMount(){
        const { AuthActions } = this.props;
        AuthActions.initialize();
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, retypePassword } = this.state;
        const { AuthActions } = this.props

        AuthActions.initialize();
        const usernamePattern = /^[a-zA-Z0-9]{3,12}$/;
        if(!usernamePattern.test(username)) {
            AuthActions.setError('Username is allowed 3 ~ 12 letters/numbers!')
            return;
        }
        const emailPattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailPattern.test(email)) {
            AuthActions.setError('Email is not valid!')
            return;
        }
        if(password.length < 6){
            AuthActions.setError("Password's length should be 6 ~ 30!")
            return;
        }
        if(password !== retypePassword){
            AuthActions.setError("Password is not matched!")
            return;
        }

        await AuthActions.userRegister({ username, email, password})
    }

    render(){
        const { isAlert, alertStatus, alert } = this.props.auth
        return(
            <section className="ptb_80 bgImg main_BodySection flex_Center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-10 col-12 offset-md-2 offset-sm-1">
                            <div className="formCol">
                                <div className="formTopLogo">
                                    <img src={require("../../static/images/logo.png")} alt="logo" />
                                </div>
                                <form>
                                    <div className="row">
                                        {
                                            !!isAlert&&
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <Alert className={alertStatus}>
                                                        { alert }
                                                    </Alert>                                                
                                                </div>
                                            </div>
                                        }
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input type="text" name="username" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" name="email" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" name="password" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Retype Password</label>
                                                <input type="password" name="retypePassword" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group text-center">
                                                <button type="submit" className="gryBtn" onClick={(e)=>this.handleSubmit(e)}>Register</button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                        <ul className="socialList mt-3">
                                                <li>
                                                    <a href="/" className="fb_L"><img src={require("../../static/images/facebook.svg")} alt="facebook" /></a>
                                                </li>
                                                <li>
                                                    <a href="/" className="Google_L"><img src={require("../../static/images/google.svg")} alt="google" /></a>
                                                </li>
                                                <li>
                                                    <a href="/" className="tw_L"><img src={require("../../static/images/twitter.svg")} alt="twitter" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }   
}

const mapStateToComponent = ({ state }) => ({
    auth: state
})

const mapDispatchToProps = (dispatch) => ({
    AuthActions: bindActionCreators(actions, dispatch),
})

export default connect( mapStateToComponent,mapDispatchToProps )(Signup)
