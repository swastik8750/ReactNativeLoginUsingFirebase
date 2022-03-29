import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
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
    Line,
} from './../components/styles';
import axios from 'axios';
import { View, ActivityIndicator } from 'react-native';
import { NavigationHelpersContext } from '@react-navigation/native';

const { brand, darkLight, primary } = Colors;
const OTPScreen = ({ navigation, route }) => {
    console.log(route.params.user);
    console.log(route.params.verificationId);
    const [code,setcode] = React.useState();
    const [Response, setResponse] = React.useState(null);
    const [result,setresult] = React.useState(null);
    const confirmCode = () => {
        const put_url = 'http://hiring-tests.herokuapp.com/changeFlag/';   
        const credential = firebase.auth.PhoneAuthProvider.credential(
          route.params.verificationId,
          code
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log(result);
            setresult(result);
             const id = String(user._id);
            axios.put(put_url+id,{isFirstLoggedIn:"false"}).then((response) => {console.log(response.data.user)}).catch((error)=>{})
            navigation.navigate('Welcome',user);
          });
          if(result!==null)
          {
              navigation.navigate('Login')
          }
      }; 

    return (

        <StyledContainer>
            <StatusBar Style="dark" />
            <InnerConatainer>
                <PageLogo resizeMode="cover" source={require('./../assets/index.jpeg')} />
                <PageTitle> Equiseed Wealth</PageTitle>
                <SubTitle>Verify OTP</SubTitle>
                <Formik
                    initialValues={{ code: '' }}
                    onSubmit={(values,{setSubmitting}) => {
                        setcode(code);
                        confirmCode();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, isSubmitting, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="One Time Password"
                                icon="lock-closed-sharp"
                                placeholder="1 2 3 4"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                value={values.code}
                            />

                            {!isSubmitting &&(
                                <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Verify
                                </ButtonText>
                            </StyledButton>
                            )}

                            {isSubmitting &&(
                                <StyledButton disable={true}>
                                <ActivityIndicator size = "large" color={primary}/>
                            </StyledButton>
                            )}  
                            <Line />
                        </StyledFormArea>)}
                </Formik>
            </InnerConatainer>
        </StyledContainer>


    );
}
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Ionicons name={icon} size={30} color={brand} />
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

export default OTPScreen;