import React from "react";
import { Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";

import { AuthScreenNavigationType } from "@/navigation/types";

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    return (
        <Box>
            <Text>SignIn Screen</Text>
            <Button
                title="Navigate to sign up"
                onPress={navigateToSignUpScreen}
            />
        </Box>
    );
};

export default SignInScreen;
