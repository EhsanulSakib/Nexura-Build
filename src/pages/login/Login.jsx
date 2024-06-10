import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from '../../../public/google.png'
import github from '../../../public/github.png';
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";

const Login = () => {
    const { signIn, handleGoogleSignIn, handleGitHubSignIn } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const notify = () => toast.success("Successfully Logged In");
    const notifyError = errorName => toast.error(errorName);
    const location = useLocation()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [show, setShow] = useState(false)

    const onSubmit = (data) => {
        const { email, password } = data;

        signIn(email, password)
            .then(result => {
                navigate(location?.state ? location.state : '/')
                notify()
            }
            )
            .catch(error => {
                notifyError(error.message.split('(').pop().split(')')[0].split('/')[1])
            })

    }

    const handleGoogleLogin = () => {
        handleGoogleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: "user"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate(location?.state ? location.state : '/')
                        notify()
                    })
            })
    }

    const handleGithubLogin = () => {
        handleGitHubSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate(location?.state ? location.state : '/')
                        notify()
                    })
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center my-12">
            <div className="my-8 py-4 flex gap-4 rounded-xl flex-col items-center justify-center w-11/12 md:w-1/2 md:py-8 lg:py-12 shadow-xl z-10 backdrop-blur-lg bg-gradient-to-r from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.6)] text-black">
                <h2 className="text-2xl font-semibold">Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 md:w-3/4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Your Email" className="input input-bordered bg-inherit" {...register("email")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <div className="w-full relative">
                            <input type={show ? "text" : "password"} name="password" placeholder="Password" className="w-full input bg-inherit input-bordered" {...register("password")} />
                            <span className="absolute right-3 top-3 text-2xl cursor-pointer" onClick={() => setShow(!show)}>
                                {
                                    show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </span>
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-lg">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-blue-400 hover:bg-blue-500 border-none text-white text-lg font-bold">Login</button>
                    </div>
                </form>
                <div className="flex gap-4 my-2">
                    <img src={google} alt="google logo" onClick={handleGoogleLogin} className="w-10 cursor-pointer" />
                    <img src={github} alt="google logo" onClick={handleGithubLogin} className="w-10 cursor-pointer" />
                </div>
                <hr className="w-11/12 border border-stone-400 border-dashed" />
                <div>
                    <p>Does not have any account? <Link to='/register' className="no-underline text-blue-400 hover:text-blue-500 font-bold">Register Now</Link></p>
                </div>
            </div>
        </div>
    )
};

export default Login;