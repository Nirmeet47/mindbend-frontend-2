"use client"
import React, {useState, useEffect, useRef } from 'react'
import "../login/login.css"
import { useForm } from "react-hook-form"



const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)
    const [showpassword, setShowpassword] = useState(false)
    const polygonRef = useRef(null);

    useEffect(() => {
        const element = document.getElementById("Logincardeffect");
        element.classList.remove("h-[100px]");
        element.classList.add("h-[450px]");
        const element2 = document.getElementById("logincard")
        element2.classList.remove("logincardeffect1")
        element2.classList.add("logincardeffect")

        const startPoints = [[0, 20], [5, 0], [36, 0], [41, 10], [95, 10], [100, 20], [100, 90], [95, 100], [5, 100], [0, 90]];
        const endPoints = [[0, 10], [10, 0], [36, 0], [41, 5], [95, 5], [100, 10], [100, 95], [95, 100], [5, 100], [0, 95]];

        let startTime = null;
        const duration = 500;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);


            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;


            const currentPoints = startPoints.map((start, i) => {
                const end = endPoints[i];
                return [
                    start[0] + (end[0] - start[0]) * easeInOut,
                    start[1] + (end[1] - start[1]) * easeInOut
                ];
            });


            if (polygonRef.current) {
                const pointsString = currentPoints.map(p => `${p[0]},${p[1]}`).join(' ');
                polygonRef.current.setAttribute('points', pointsString);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {

        }
    }, [])

    return (
        <section className='m-0 p-0 flex justify-center items-center h-screen w-screen bg-black'>
            <div className='loginsection absolute z-0 w-screen h-screen '></div>
            <div id="Logincardeffect" className='logincard-container h-25'>
                <svg className='logincard-border-svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
                    <defs>
                        <filter id='glow'>
                            <feGaussianBlur stdDeviation='0.5' result='coloredBlur' />
                            <feMerge>
                                <feMergeNode in='coloredBlur' />
                                <feMergeNode in='SourceGraphic' />
                            </feMerge>
                        </filter>
                    </defs>
                    <polygon
                        ref={polygonRef}
                        points='0,20 5,0 36,0 41,10 95,10 100,20 100,90 95,100 5,100 0,90'
                        fill='none'
                        stroke='#00ffff'
                        strokeWidth='0.5'
                        filter='url(#glow)'
                    />
                </svg>
                <div id='logincard' className='h-100 w-100  logincard logincardeffect1'>
                    <div className="form"  >

                        <h1 className='text-2xl text-white opacity-100'>Access Madness</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="forminput flex  flex-col justify-around mt-10">

                            <input onKeyDown={(event) => { if (event.key === " ") { event.preventDefault();}}}
                                className={`w-full bg-transparent border mt-2 h-10 px-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${errors.email ? 'focus:border-red-300 border-red-400 focus:shadow-[0_0_10px_rgba(255,0,0,0.3)] ' : 'border-cyan-400 focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] '} `}
                                type="text" {...register("email", {
                                    required: { value: true, message: "This is a required field" },
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder='Enter your Email'
                            />
                            {errors.email && <p className='text-red-600'>{errors.email.message}</p>
                            }
                            <div className='w-full relative'>

                                <input  onKeyDown={(event) => { if (event.key === " ") { event.preventDefault();}}} 
                                    className={`w-full bg-transparent border mt-3 h-10 pl-3 pr-12 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${errors.password ? 'focus:border-red-300 border-red-400 focus:shadow-[0_0_10px_rgba(255,0,0,0.3)] ' : 'border-cyan-400 focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] '} `}
                                    type={showpassword?"text":"password"} {...register("password", {
                                        required: {
                                            value: true, message: "This is a required field"
                                        }, minLength: { value: 8, message: "The password must contain 8 characters" }
                                    })}
                                    placeholder='Enter your Password'
                                />
                                <button type="button" onClick={()=>{setShowpassword(!showpassword)}} className='absolute right-3 top-1/2 -translate-y-1/2 mt-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'>
                                    <img src={!showpassword?"visible.svg":"notvisible.svg"} alt="Toggle password visibility" className='w-5 h-5' />
                                </button>
                            </div>
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>
                            }
                            <div className='w-full flex justify-end '>
                                <span><a href="" className='text-blue-500 underline text-xs'>Forgot Password?</a></span>
                            </div>
                            <div className='loginbtn-container relative'>
                                <svg className='loginbtn-border-svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
                                    <polygon
                                        points='5,0 95,0 100,0 100,80 95,100 0,100 0,80 0,20'
                                        fill='none'
                                        stroke='#00ffff'
                                        strokeWidth='1'
                                        filter='url(#glow)'
                                    />
                                </svg>

                                <button type="submit" id="loginbtn" className='cursor-pointer'>Log In</button>
                            </div>
                        </form>
                        <div className='w-full flex justify-center mt-4'>
                            <div className='text-sm'>
                                <span>Don't have a account?  </span><a href="/signup" className='text-cyan-300 font-bold'>Sign Up</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
