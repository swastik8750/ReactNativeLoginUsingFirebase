// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Formik } from 'formik';

// // import firebase from '../firebase';
// // import auth from '@react-native-firebase/auth';
// // import { signInWithCredential,  signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
// import { Octicons, Ionicons } from '@expo/vector-icons';
// import { initializeApp, getApp } from 'firebase/app';
// import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// // Initialize Firebase JS SDK >=9.x.x
// // https://firebase.google.com/docs/web/setup
// try {
//   initializeApp({
//     apiKey: "AIzaSyB2oojiQXJ22ypZn-DuPvomTQsVhvVTt3Q",
//   authDomain: "swastikjain-225a0.firebaseapp.com",
//   projectId: "swastikjain-225a0",
//   storageBucket: "swastikjain-225a0.appspot.com",
//   messagingSenderId: "725790922127",
//   appId: "1:725790922127:web:5830b3f59afc492cdd67fa",
//   measurementId: "G-EDQF8T6CSJ"
//   });
// } catch (err) {
//   // ignore app already initialized error in snack
// }

// // Firebase references
// const app = getApp();
// const auth = getAuth();
// import {
//     StyledContainer,
//     InnerConatainer,
//     PageLogo,
//     PageTitle,
//     StyledFormArea,
//     SubTitle,
//     LeftIcon,
//     RightIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     StyledButton,
//     ButtonText,
//     Colors,
//     MsgBox,
//     Line,
//     ExtraText,
//     ExtraView,
//     TextLink,
//     TextLinkContent,
// } from './../components/styles';
// import axios from 'axios';
// import { View, ActivityIndicator } from 'react-native';
// import { NavigationHelpersContext } from '@react-navigation/native';

// const { brand, darkLight, primary } = Colors;
// const OTPScreen = ({ navigation, route }) => {
//     useEffect(() => {
//         signInWithPhoneNumber();
//     }, [])
//     const recaptchaVerifier = React.useRef(null);
//     const [phoneNumber, setPhoneNumber] = React.useState();
//     setPhoneNumber(route.params.user.phoneNum);
//     const [verificationId, setVerificationId] = React.useState();
//     const [verificationCode, setVerificationCode] = React.useState();
//     async function signInWithPhoneNumber() {
//         try {
//             const phoneProvider = new PhoneAuthProvider(auth);
//             const verificationId = await phoneProvider.verifyPhoneNumber(
//                 phoneNumber,
//                 recaptchaVerifier.current
//             );
//             setVerificationId(verificationId);
//             showMessage({
//                 text: 'Verification code has been sent to your phone.',
//             });
//         } catch (err) {
//             showMessage({ text: `Error: ${err.message}`, color: 'red' });
//         }
//     }


//     return (

//         <StyledContainer>
//             <StatusBar Style="dark" />
//             <InnerConatainer>
//                 <PageLogo resizeMode="cover" source={require('./../assets/index.jpeg')} />
//                 <PageTitle> Equiseed Wealth</PageTitle>
//                 <SubTitle>Verify OTP</SubTitle>



//                 <Formik
//                     initialValues={{ code: '' }}
//                     onSubmit={(values, { setSubmitting }) => {

//                     }}
//                 >
//                     {({ handleChange, handleBlur, handleSubmit, isSubmitting, values }) => (
//                         <StyledFormArea>
//                             <MyTextInput
//                                 label="One Time Password"
//                                 icon="lock-closed-sharp"
//                                 placeholder="1 2 3 4"
//                                 placeholderTextColor={darkLight}
//                                 onChangeText={handleChange('code')}
//                                 onBlur={handleBlur('code')}
//                                 value={values.code}
//                             />

//                             <StyledButton onPress={async () => {
//                                 try {
//                                     const credential = PhoneAuthProvider.credential(
//                                         verificationId,
//                                         verificationCode
//                                     );
//                                     await signInWithCredential(auth, credential);
//                                     showMessage({ text: 'Phone authentication successful 👍' });
//                                 } catch (err) {
//                                     showMessage({ text: `Error: ${err.message}`, color: 'red' });
//                                 }
//                             }}>
//                                 {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}
//                                 <ButtonText>
//                                     Verify
//                                 </ButtonText>
//                             </StyledButton>


//                             <Line />
//                         </StyledFormArea>)}
//                 </Formik>
//             </InnerConatainer>
//         </StyledContainer>


//     );
// }
// const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Ionicons name={icon} size={30} color={brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//             {isPassword && (
//                 <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                     <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
//                 </RightIcon>
//             )}
//         </View>
//     );
// };

// export default OTPScreen;