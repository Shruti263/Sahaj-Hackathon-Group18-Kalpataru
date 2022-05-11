import React, { useState,useEffect } from 'react';
import { useHistory, withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import image from '../Assets/login_page_image.svg';
import { Link } from 'react-router-dom';
import { auth, storage, firestore } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import './Signup.css';
import {Form as InputForm, Input, Label, FormGroup} from 'reactstrap';
import NavBar from '../Landing/Navbar';
function Signup() {

const actionCodeSettings = {
    url: 'http://localhost:3000/form',
    handleCodeInApp: true,
  };

    const [role, setRole] = useState('Doctor');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adhar_number, setAdharNumber] = useState('');
    let history = useHistory();


    function getAndSetData(){
        {
           (role=='Doctor')?
            setDoc(doc(firestore, 'authorised_doctor/',adhar_number),{
            first_name : firstName.trim(),
            middle_name: middleName.trim(),
            last_name: lastName.trim(),
            email: email.trim(),
            password: password.trim(),
            adharNumber: adhar_number,
            time: Timestamp.now(),
                }, {merge: true})
                .then((e)=>{
                    console.log('data added successfully');
                    history.push(`/doctorDashboard/${adhar_number}`);
                    createUserWithEmailAndPassword(auth, email, password)
                })
                .catch((e)=>console.log(e))
                .then((user)=>{
                    console.log('addddddd');
                }).catch((e)=>alert(e.message))
            :
            setDoc(doc(firestore, 'authorised_patient/',adhar_number),{
                first_name : firstName.trim(),
                middle_name: middleName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
                password: password.trim(),
                adharNumber: adhar_number,
                time: Timestamp.now(),
                    }, {merge: true})
                    .then((e)=>{
                        console.log('data added successfully');
                        history.push(`/patientDashboard/${adhar_number}`);
                        createUserWithEmailAndPassword(auth, email, password)
                    })
                    .catch((e)=>console.log(e))
                   
                    .then((user)=>{
                        console.log('addddddd');
            }).catch((e)=>alert(e.message))
        }
        

    }

    useEffect(()=>{
        const credential = localStorage.getItem('email');
        if(!credential){
            history.push('/signup');
        }
    }, [history]);


    function submitData(){
        getAndSetData();
        //add the remove from localstorage here
        localStorage.clear();
    }

  
    return (
        <Container className = 'container'>
            <div className="wrapper">
            <NavBar />
        <Row className = 'row'>
            <div className = 'signupbox'>
                    <Row>
                        <Col sm = {12} xs = {12} md = {12} lg = {6} xl = {6} xxl = {6} className = 'left'>
                            <h1 className = 'h1'>
                                Sign Up
                            </h1>
                            <p className = 'para'>
                                Alerady have an account? 
                                <br />
                                <br />
                            <Link className = 'button' to = '/login/patient' style = {{textDecoration: 'none'}}>
                                    Login as Patient
                            </Link>
                            
                            <Link className = 'button' to = '/login/doctor' style = {{textDecoration: 'none'}}>
                                    Login as Doctor
                            </Link>
                            <br />
                            </p>
                            <Row>
                            <InputForm className = 'wrapper'>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'firstName'>Email</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'email' 
                                            placeholder = 'Email' 
                                            onChange = {(e)=>setEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'firstName'>Password</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'password' 
                                            placeholder = 'Password' 
                                            onChange = {(e)=>setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'firstName'>Confirm password</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'password' 
                                            placeholder = 'Password' 
                                            onChange = {(e)=>setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'firstName'>First Name</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'text' 
                                            placeholder = 'Enter First Name (According to Adhar Card)' 
                                            onChange = {(e)=>setFirstName(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'middleName'>Middle Name</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'text' 
                                            placeholder = 'Enter Middle Name (According to Adhar Card)' 
                                            onChange = {(e)=>setMiddleName(e.target.value)}
                                    />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'lasttName'>Last Name</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'text' 
                                            placeholder = 'Enter Last Name (According to Adhar Card)' 
                                            onChange = {(e)=>setLastName(e.target.value)}
                                    />
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'role'>You want to sign up as?</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'select' 
                                            name = 'select' 
                                            onChange = {(e)=>setRole(e.target.value)}>
                                                <option value = 'Doctor'>Doctor</option>
                                                <option value = 'Patient'>Patient</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup style = {{margin: '30px'}}>
                                        <Label className = 'label' for = 'adhar_no'>Enter Adhar Number</Label>
                                        <Input 
                                            required = {true}
                                            className = 'input' 
                                            style = {{marginTop: '15px', border: '2px solid black'}} 
                                            type = 'text' 
                                            name = 'text' 
                                            onChange = {(e)=>setAdharNumber(e.target.value)}
                                            placeholder = 'Enter Adhar Number (without spaces)'>
                                        </Input>
                                    </FormGroup>
                                    
                                    <button onClick = {(e)=>{
                                        e.preventDefault();
                                        submitData();
                                    }}>
                                        Sign Up
                                    </button>
                                </InputForm>
                            </Row>
                            
                        </Col>
                        <Col sm = {12} xs = {12} md = {12} lg = {6} xl = {6} xxl = {6}>
                         <img className = 'img' src = {image} alt = 'signup'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
            </div>
    </Container>
    )
}

export default Signup
