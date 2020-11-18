import React from 'react'
import HEAD from 'next/head'
import Link from "next/link"
import NProgress from "nprogress"
import Router from "next/router"
import 'nprogress/nprogress.css'
import { isAuth, logout } from '../helpers/auth'


Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({ children }) => {
    const head = () => (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/static/css/style.css" />
        </>
    )
    const nav = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                    </li>
                    {!isAuth() && (
                        <>
                            <li className="nav-item">
                                <Link href="/login">
                                    <a className="nav-link">Login</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="register">
                                    <a className="nav-link">Register</a>
                                </Link>
                            </li>
                        </>
                    )}
                    {isAuth() && isAuth().role === "admin" && (
                        <li className="nav-item ml-auto">
                            <Link href="/admin">
                                <a className="nav-link">{isAuth().name}</a>
                            </Link>
                        </li>
                    )}
                    {isAuth() && isAuth().role === "subscriber" && (
                        <li className="nav-item ml-auto">
                            <Link href="/user">
                                <a className="nav-link">{isAuth().name}</a>
                            </Link>
                        </li>
                    )}

                    {isAuth() && (
                        <li className="nav-item ml-auto">
                            <a onClick={logout} className="nav-link">
                                Logout
                                </a>
                        </li>
                    )}
                </ul>
            </nav>
        )
    }

    return (
        <>
            {head()}{nav()} <div className="container py-5">{children}</div>
        </>
    )
}

export default Layout