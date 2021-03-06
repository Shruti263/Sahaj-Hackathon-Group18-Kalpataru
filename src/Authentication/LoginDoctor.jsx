import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../Firebase';
import { getDoc, doc } from 'firebase/firestore';
import {useHistory} from 'react-router';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Col, Container, Row } from 'reactstrap';
import image from '../Assets/login_page_image.svg';
import './Login.css';
import NavBar from '../Landing/Navbar';
//import { setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const [healthId, setHealthId] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, isSpinning] = useState(false);
    const [user, loading, err] = useAuthState(auth);
    const history = useHistory();
    useEffect(()=>{
        if(user)
        {
            const id = localStorage.getItem('id');
            history.push('/doctorDashboard/'+id);
        }
    }, [user, loading])
    const LogInWithHealthId = () => {
        isSpinning(true);
        getDoc(doc(firestore, 'authorised_doctor/',healthId))
            .then((docsnap)=> {
                if(password === docsnap.data()['password'])
                {
                    setPersistence(auth, browserSessionPersistence)
                    .then(()=>{
                        signInWithEmailAndPassword(
                            auth, 
                            docsnap.data()['email'], 
                            docsnap.data()['password']
                        )
                        .then((e)=>{
                            alert('Logged in successfully');
                            localStorage.setItem('id', healthId);
                            history.push('/doctorDashboard/'+healthId);
                        })
                        .catch((e)=>{
                            isSpinning(false);
                            alert('Account does not exist');
                            history.push('/login/doctor');
                        })
                    })
                    .catch((e)=>{
                        isSpinning(false);
                        history.push('/login/doctor')
                    })
                }
                else{
                    isSpinning(false);
                    alert('Wrong Credentials');
                    history.push('/login/doctor')
                }
            })
            .catch((e)=>{
                isSpinning(false);
                alert('Such accounts does not exist');
                history.push('/login/doctor')
            })
    }
    return (
        <Container>
            <div className="wrapper">
            <NavBar/>
        <Row>
            <div className = 'signupbox'>
                    <Row>
                        <Col sm = {12} xs = {12} md = {12} lg = {6} xl = {6} xxl = {6} className = 'left'>
                        <form>
                            <h1 className = 'h1'>
                                Log In As Doctor
                            </h1>
                            <p className = 'para'>
                                Don't have an account? 
                                <br />
                                <br />
                                <Link className = 'button' style = {{textDecoration: 'none'}} to = '/signup'>
                                {/* <button className = 'button'> */}
                                    Sign up
                                {/* </button>  */}
                                </Link>
                            </p>
                            <Row>
                            <input 
                                className = 'input'
                                placeholder = 'Enter the Health Id'
                                onChange = {(e)=>setHealthId(e.target.value)}
                            />
                            <input 
                                type = 'password'
                                className = 'input'
                                placeholder = 'Enter Password'
                                onChange = {(e)=>setPassword(e.target.value)}
                            />
                            </Row>
                            <button 
                            className = 'button'
                            onClick = {(e)=>{
                                e.preventDefault();
                                LogInWithHealthId();
                            }}>
                                {(spinner === false)?'Login':'Logging in...'}
                            </button>

                        </form>
                        </Col>
                        <Col sm = {12} xs = {12} md = {12} lg = {6} xl = {6} xxl = {6}>
                         <img className = 'img' src = {image} alt = 'login'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
            </div>
        </Container>
    )
}

export default Login;