import React from "react";
import { Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";

import { AuthScreenNavigationType } from "@/navigation/types";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

import { IUser } from "@/types";

import { registerUser } from "@/services/api";

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            /**
             * register user
             */

            await registerUser({ email, name, password });

            navigateToSignInScreen();
        } catch (error) {}
    };

    return (
        <Box flex={1} px="5.5" py="13" backgroundColor="white">
            <Text variant="textXl" fontWeight="700">
                Welcome to Blossom!
            </Text>
            <Text variant="textXl" fontWeight="700" mb="6">
                Your journey starts here
            </Text>

            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Name"
                        error={errors.name}
                    />
                )}
                name="name"
            />
            <Box mb="6" />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Email"
                        error={errors.email}
                    />
                )}
                name="email"
            />
            <Box mb="6" />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Password"
                        error={errors.name}
                        secureTextEntry
                    />
                )}
                name="password"
            />
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
                onPress={handleSubmit(onSubmit)}
            />
        </Box>
    );
};

export default SignUpScreen;
