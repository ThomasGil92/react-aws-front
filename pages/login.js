import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { authenticate, isAuth } from '../helpers/auth'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts'

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: 'Login'
    })


    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    const { email, password, buttonText, error, success } = state

    const handleChange = (name) => (e) => {
        setState({ ...state, [name]: e.target.value, error: "", success: "", buttonText: "Login" })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setState({ ...state, buttonText: 'Logging in' })
        try {
            const response = await axios.post(`${process.env.API}/login`, {
                email,
                password
            })
            console.log(response);
            authenticate(response, () => {
                isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')
            })
        }
        catch (error) {
            console.log(error);
            setState({ ...state, buttonText: 'Login', error: error.response.data.error });
        }
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-warning">{buttonText}</button>
                </div>
            </form>
        )
    }

    return (
        <Layout>

            <div className="col-md-6 offset-md-3">
                <h1>Login</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {loginForm()}
                <Link href="/auth/password/forgot">
                    <a className="text-danger float-right">Forgot Password</a>
                </Link>
            </div>
        </Layout>
    )
}

export default Login