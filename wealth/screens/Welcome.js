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

const Welcome = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    
    return (
        <>
            <StatusBar style="light" />
            <InnerConatainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/back.png')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}> Hola! Buddy </PageTitle>
                    <SubTitle welcome={true}>
                        {route.params.fname+" "+route.params.lname || 'Swastik Jain' }
                    </SubTitle>
                    <SubTitle welcome={true}>
                        {route.params.phoneNumber || '+918750578258'}
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