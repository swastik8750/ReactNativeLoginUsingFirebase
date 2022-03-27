import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {  Ionicons } from '@expo/vector-icons';

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

    const handlesignup= (credentials,setSubmitting) => {
        handleMessage(null);
        const url = 'http://hiring-tests.herokuapp.com/addUser';
        const put_url = 'http://hiring-tests.herokuapp.com/changeFlag/';
        const {name, phone, password,email} = credentials;
        const fname = name.split(" ")
        const emailsp = email.split("@");
        const credential = {
            fName : fname[0],
            lName : fname[1],
            email:email,
            phoneNum: phone,
            userName : emailsp[0],
            password: password
        };
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
                navigation.navigate('Welcome',{user:savedUser});
                setSubmitting(false);
            }
        })
        .catch((error) => {
            setSubmitting(false);
            // console.log(error.JSON());
            handleMessage('Something went wrong try again')
        })
    }
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessagetype(type);
    }



    return (
        <StyledContainer>
            <StatusBar Style="dark" />
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