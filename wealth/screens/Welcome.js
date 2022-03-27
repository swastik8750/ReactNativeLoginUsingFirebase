import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    InnerConatainer,
    PageTitle,
    StyledFormArea,
    SubTitle,
    StyledButton,
    ButtonText,
    Colors,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';

const Welcome = ({navigation, route }) => {
    console.log(route.params.user.userName);
    const [hidePassword, setHidePassword] = useState(true);
    const {fName,lName, phoneNum} = route.params.user;
    return (
        <>
            <StatusBar style="light" />
            <InnerConatainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/back.png')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}> Hola! Buddy </PageTitle>
                    <SubTitle welcome={true}>
                        {fName+" "+lName || 'Swastik Jain' }
                    </SubTitle>
                    <SubTitle welcome={true}>
                        {phoneNum || '+918750578258'}
                    </SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/avatar.png')} />
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate('Login')}}>
                            <ButtonText>LogOut</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerConatainer>
        </>
    );
};

export default Welcome;