import React from "react";
import { Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";
import { AuthScreenNavigationType } from "@/navigation/types";

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    return (
        <Box>
            <Text>SignUp Screen</Text>
            <Button
                title="Navigate to sign in"
                onPress={navigateToSignInScreen}
            />
        </Box>
    );
};

export default SignUpScreen;
