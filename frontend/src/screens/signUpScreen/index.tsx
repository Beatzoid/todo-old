import React from "react";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";

import { AuthScreenNavigationType } from "@/navigation/types";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Pressable } from "react-native";

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    return (
        <Box flex={1} px="5.5" py="13" backgroundColor="white">
            <Text variant="textXl" fontWeight="700">
                Welcome to Blossom!
            </Text>
            <Text variant="textXl" fontWeight="700" mb="6">
                Your journey starts here
            </Text>

            <Input label="Name" />
            <Box mb="6" />
            <Input label="Email" />
            <Box mb="6" />
            <Input label="Password" />
            <Box mt="5.5" />

            <Pressable onPress={navigateToSignInScreen}>
                <Text color="primary" textAlign="right">
                    Already have an account? Log in
                </Text>
            </Pressable>

            <Box mb="5.5" />

            <Button
                label="Register"
                uppercase
                onPress={navigateToSignInScreen}
            />
        </Box>
    );
};

export default SignUpScreen;
