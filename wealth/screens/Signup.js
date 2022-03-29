import React, { useState,useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { TouchableOpacity} from 'react-native';
import {  Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import firebase from '../firebase';
import {
    StyledContainer,
    InnerConatainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    SubTitle,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import axios from 'axios';
import { View,ActivityIndicator } from 'react-native';
const { brand, darkLight ,primary} = Colors;
const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [Message,setMessage] = useState();
    const [Messagetype, setMessagetype] = useState();
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState('');
    const recaptchaVerifier = useRef(null);
    const [matched,setmatched]= useState(false);
    const [otp,setOtp]=useState(false);
    const [sending,setsending] = useState(false);

    const [fname,setfname] = useState();
    const [lname,setlname] = useState();
    const [email,setemail] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    const [username, setusername] = useState();
    const [password,setpassword] = useState();

    const sendVerification = (phoneNumber) => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
          .then(setVerificationId);
          console.log('verifciation '+verificationId);
      };
      const confirmCode = () => {
        const url = 'http://hiring-tests.herokuapp.com/addUser';
        const put_url = 'http://hiring-tests.herokuapp.com/changeFlag/';
        console.log('code '+code);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log(result);
        //   console.log(user);
        const credential = {
            fName : fname,
            lName : lname,
            email:email,
            phoneNum: phoneNumber,
            userName : username,
            password: password
        };
          setmatched(true);
          axios
          .post(url,credential)
          .then((response) => {
              const result = response.data;
              const {status,savedUser,message} =result;
              if(status!=='success')
              {
                  handleMessage(message);
              }
              else{ 
                  const id = String(savedUser._id);
                  axios.put(put_url+id,{isFirstLoggedIn:"true"}).then((response) => {console.log(response.data.user)}).catch((error)=>{})
                  navigation.navigate('Welcome',{fname,lname,phoneNumber});
              }
          })
          .catch((error) => {
             
              console.log(error);
              handleMessage('Something went wrong try again')
          })
        });
    };

    const handlesignup= (credentials,setSubmitting) => {
        handleMessage(null);
       
        const {name, phone, password,email} = credentials;
        const fname = name.split(" ")
        const emailsp = email.split("@");
        setfname(fname[0]);
        setusername(emailsp[0]);
        setemail(email);
        setlname(fname[1]);
        setpassword(password);
        setPhoneNumber(phone);
        sendVerification('+91'+phone);
        setsending(true);
        setOtp(true);
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessagetype(type);
    }



    return (
        <StyledContainer>
             <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={
              {apiKey: "AIzaSyA2LfsaU7pcRDvwhHw38vfmnmw5Ng8gLik",

          authDomain: "fir-fae34.firebaseapp.com",
          
          projectId: "fir-fae34",
          
          storageBucket: "fir-fae34.appspot.com",
          
          messagingSenderId: "864759252483",
          
          appId: "1:864759252483:web:94ccbe0fe3680eb82cf036"}
        }
        />
            <StatusBar Style="dark" />
            {!otp && (
            <InnerConatainer>
                {/* <PageLogo resizeMode="cover" source={require('./../assets/index.jpeg')} /> */}
                <PageTitle> Equiseed Wealth</PageTitle>
                <SubTitle>Account SignUp</SubTitle>
                <Formik
                    initialValues={{ name:'',phone:'',email:'',password: '' , ConfirmPassword: ''}}
                    onSubmit={(values,{setSubmitting})=> {
                        if(values.email=='' || values.password == '' || values.phone=='' ||values.password=='' || values.ConfirmPassword=='')
                        {
                            handleMessage('Please fill all the field');
                            setSubmitting(false);
                        }
                        else if(values.password!==values.ConfirmPassword)
                        {
                            handleMessage('Password not match');
                            setSubmitting(false);
                        }
                        else
                        {
                            handlesignup(values,setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, isSubmitting, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Name"
                                icon="person"
                                placeholder="Swastik"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <MyTextInput
                                label="Email"
                                icon="mail"
                                placeholder="swastik8750@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <MyTextInput
                                label="Phone Number"
                                icon="call"
                                placeholder="+918750578258"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                            <MyTextInput
                                label="Password"
                                icon="lock-closed-sharp"
                                placeholder="* * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MyTextInput
                                label="Confirm Password"
                                icon="lock-closed-sharp"
                                placeholder="* * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('ConfirmPassword')}
                                onBlur={handleBlur('ConfirmPassword')}
                                value={values.ConfirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type ={Messagetype}>{Message}
                            </MsgBox>
                            {!isSubmitting &&(
                               <StyledButton onPress={handleSubmit}>
                               <ButtonText>
                                   SignUp
                               </ButtonText>
                           </StyledButton>
                            )}

                            {isSubmitting &&(
                                <StyledButton disable={true}>
                                <ActivityIndicator size = "large" color={primary}/>
                            </StyledButton>
                            )}  
                            
                            <ExtraView>
                                <ExtraText>
                                    Already have account?
                                </ExtraText>
                                <TextLink onPress={()=>{navigation.navigate('Login')}}>
                                    <TextLinkContent>
                                        Sign-In
                                    </TextLinkContent>

                                </TextLink>
                            </ExtraView>
                            <Line />
                        </StyledFormArea>)}
                </Formik>
            </InnerConatainer>
            )}
            {otp && ( <MyTextInput
            label="Enter OTP"
            icon="lock-closed-sharp"
            placeholder="1 2 3 4 5 6"
            placeholderTextColor={darkLight}
            onChangeText={setCode}

            />
            
            )}
            {otp && (<TouchableOpacity onPress={confirmCode}>
                <TextLinkContent>
                    Verify OTP
                </TextLinkContent>
</TouchableOpacity>)}
        </StyledContainer>
        
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            
            <LeftIcon>
                
                <Ionicons name = {icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};



export default Signup;