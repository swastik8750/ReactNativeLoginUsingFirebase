import React, { useState,useRef } from 'react';
import { TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
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
    TextLinkContent,
} from './../components/styles';
import axios from 'axios';
import { View,ActivityIndicator } from 'react-native';
import { NavigationHelpersContext } from '@react-navigation/native';
const { brand, darkLight,primary } = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [Message,setMessage] = useState();
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [Messagetype, setMessagetype] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const[fname,setfname] =useState();
    const [lname , setlname] = useState();
    const [code, setCode] = useState('');
    const [otp,setOtp]=useState(false);
    const user='';
    const sendVerification = (phoneNumber) => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
          .then(setVerificationId);
          console.log('verifciation '+verificationId);
          
      };
    
      const confirmCode = () => {
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
            console.log(user);
            navigation.navigate('Welcome',{fname,lname,phoneNumber});
          });
      };
      


    const handlelogin = (credentials,setSubmitting) => {
        handleMessage(null);
        const url = 'http://hiring-tests.herokuapp.com/login';
        const put_url = 'http://hiring-tests.herokuapp.com/changeFlag/';
        axios
        .post(url,credentials)
        .then((response) => {
            const res = response.data;
            
            const {msg,token,user} =res;
            console.log('phonenumber');
            sendVerification('+91'+user.phoneNum);
            console.log(user);
            setPhoneNumber('+91'+user.phoneNum);
            setOtp(true);
            const{fName,lName,phoneNum}=user;
            setfname(fName);
            setlname(lName);
           
            // if(user.phoneNum)
            // {
                
            //     sendVerification('+91'+user.phoneNum);
            //     // if(verificationId)
            //     // {

            //     //     navigation.navigate('Otpscreen',{user,verificationId});
            //     // }
            // } 
           
            setSubmitting(false);
            handleMessage('Click to send otp')
        })
        .catch((error) => {
            console.log(error);
            setSubmitting(false);
            // console.log(error.JSON());
            handleMessage('User Not Found')
        })
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
            <InnerConatainer>
                <PageLogo resizeMode="cover" source={require('./../assets/index.jpeg')} />
                {/* <PageTitle> Equiseed Wealth</PageTitle> */}
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values,{setSubmitting})=> {
                        if(values.email=='' || values.password == '')
                        {
                            handleMessage('Please fill all the field');
                            setSubmitting(false);
                        }
                        else
                        {
                            handlelogin(values,setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit,isSubmitting, values }) => (
                        <StyledFormArea>
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
                            <MsgBox type ={Messagetype}>{Message}
                            </MsgBox>
                            {!isSubmitting &&(
                                <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>
                            )}

                            {isSubmitting &&(
                                <StyledButton disable={true}>
                                <ActivityIndicator size = "large" color={primary}/>
                            </StyledButton>
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
                           
                            <ExtraView>
                                <ExtraText>
                                    Don't have account?
                                </ExtraText>
                                <TextLink onPress={()=> navigation.navigate('Signup')}>
                                    <TextLinkContent>
                                        Sign-Up
                                    </TextLinkContent>

                                </TextLink>

                            </ExtraView>
                            <Line />
                        </StyledFormArea>)}
                </Formik>
            </InnerConatainer>
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



export default Login;