import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';

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
    const [Messagetype, setMessagetype] = useState();

    const handlelogin = (credentials,setSubmitting) => {
        handleMessage(null);
        const url = 'http://hiring-tests.herokuapp.com/login';
        const put_url = 'http://hiring-tests.herokuapp.com/changeFlag/';
        axios
        .post(url,credentials)
        .then((response) => {
            const result = response.data;
            const {msg,token,user} =result;
            navigation.navigate('Otpscreen',{user});
            // const id = String(user._id);
            // axios.put(put_url+id,{isFirstLoggedIn:"false"}).then((response) => {console.log(response.data.user)}).catch((error)=>{})
            
            setSubmitting(false);
        })
        .catch((error) => {
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
            <StatusBar Style="dark" />
            <InnerConatainer>
                <PageLogo resizeMode="cover" source={require('./../assets/index.jpeg')} />
                <PageTitle> Equiseed Wealth</PageTitle>
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