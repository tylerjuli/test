import React, {Component} from 'react'
import * as actions from '../../reducers/Auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from '../atoms/Alert'

class Signin extends Component{

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
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
        const { email, password } = this.state;
        const { AuthActions } = this.props

        try {
            await AuthActions.userLogin({email, password});
          } catch (e) {
            console.log(e);
          }
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
                                                <label>Email:</label>
                                                <input type="text" name="email" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input type="password" name="password" className="input_Box" onChange={(e)=>{ this.handleChange(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <div className="form-group">
                                                <button type="submit" className="gryBtn" onClick={(e)=>this.handleSubmit(e)}>Sign In</button>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <div className="form-group text-right">
                                                <a href="/" className="formLink">Forgot Password?</a>
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
                                        <div className="col-12 text-center">
                                            <a href="sign-up.html" className="links">Create An Account</a>
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

export default connect( mapStateToComponent,mapDispatchToProps )(Signin)