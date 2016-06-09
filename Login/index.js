/**
 * Created by watcher on 5/18/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/UserActions';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {loginUser: this.props.loginUser.loginUser, validUser: 0};        
    }
    static propTypes = {
        loginUser: React.PropTypes.object.isRequired
    }
    componentWillReceiveProps (nextProps) {
        this.setState({...nextProps.loginUser});
    }
    loginHandler (e) {
        e.preventDefault();
        if(e.target.id == 'logout') {
            this.props.userActions.loginUserExit();
            return true;
        }
        this.props.userActions.loginUser({user: e.target[0].value, password: e.target[1].value});
        e.target[0].value = ''
        e.target[1].value = ''
    }
    render () {
        if (!this.state.validUser) {
            return (
                <form className='form-inline pull-xs-right' onSubmit={::this.loginHandler}>
                    <input className='form-control' type='email' required='required' placeholder='Login - Your email' />
                    <input className='form-control m-x-1' type='password' required='required' placeholder='Password' />
                    <button className='btn btn-success-outline' type='submit'>Enter</button>
                </form>
            );    
        }        
        return (
            <div className='pull-xs-right'>
                {this.state.loginUser} <button id='logout' className='btn btn-success-outline' type='submit' onClick={::this.loginHandler}>Exit</button>
            </div>
        );
    }
}

function mapStateToProps (state) {
    let { loginUser } = state
    return {
        loginUser        
    };
}
function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);