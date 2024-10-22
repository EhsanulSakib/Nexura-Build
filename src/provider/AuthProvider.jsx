import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState(null)
    const [databaseUser, setDatabaseUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(null)
    const [adminLoading, setAdminLoading] = useState(true)

    const axiosPublic = useAxiosPublic()
    const GoogleProvider = new GoogleAuthProvider()
    const GitHubProvider = new GithubAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, GoogleProvider)

    }

    const handleGitHubSignIn = () => {
        return signInWithPopup(auth, GitHubProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(true)
            setUser(currentUser);
            setAdminLoading(true)
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            axiosPublic.get(`/users/${currentUser.email}`)
                                .then(res => {
                                    setDatabaseUser(res.data)
                                    setLoading(false)
                                })
                            setLoading(false);
                        }
                    })
                setLoading(false)
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setAdminLoading(false)
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    useEffect(() => {
        setLoading(true)
    }, [])


    const userInfo = { databaseUser, isAdmin, adminLoading, setAdminLoading, loading, user, darkMode, setDarkMode, logOut, signIn, handleGoogleSignIn, handleGitHubSignIn, createUser }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;