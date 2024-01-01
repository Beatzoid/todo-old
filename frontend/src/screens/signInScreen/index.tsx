import React from "react";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";

import { AuthScreenNavigationType } from "@/navigation/types";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Pressable } from "react-native";

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    return (
        <Box flex={1} px="5.5" justifyContent="center" backgroundColor="white">
            <Text variant="textXl" fontWeight="700">
                Welcome back!
            </Text>

            <Input label="Email" />
            <Box mb="6" />
            <Input label="Password" />
            <Box mt="5.5" />

            <Pressable onPress={navigateToSignUpScreen}>
                <Text color="primary" textAlign="right">
                    Dont' have an account? Register here
                </Text>
            </Pressable>

            <Box mb="5.5" />

            <Button label="Login" uppercase onPress={navigateToSignUpScreen} />
        </Box>
    );
};

export default SignInScreen;
