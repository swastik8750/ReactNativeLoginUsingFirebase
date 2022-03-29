import React from "react";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import OTPScreen from "../screens/Otpscreen";
import { Colors } from "../components/styles";
const { tertiary } = Colors;
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor:'transparent'
                },
                headerTintColor:tertiary,
                headerTransparent:true,
                headerTitle:'',
                headerLeftConainerStyle:{
                    paddingleft:20
                }
            }}
            initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otpscreen" component={OTPScreen} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export  default RootStack;