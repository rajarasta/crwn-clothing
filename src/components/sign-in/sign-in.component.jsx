import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'
import { signInWithGoogle, auth } from '../../firebase/firebase.util.js'


class SignIn extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        console.log('krenilo')
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />


                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />


                    <div className='buttons'>
                        <CustomButton type='submit'>
                            Submit
                        </CustomButton>

                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                            {' '}
                            Sign in with Google{' '}
                        </CustomButton>
                    </div>


                </form>
            </div>
        )
    }

}

export default SignIn;