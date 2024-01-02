import React from "react";
import { Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/utils/theme";

import { AuthScreenNavigationType } from "@/navigation/types";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

import { IUser } from "@/types";
import { loginUser } from "@/services/api";

import useUserGlobalStore from "@/store/useUserGlobalStore";

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const { updateUser } = useUserGlobalStore();

    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Omit<IUser, "name">>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: Omit<IUser, "name">) => {
        try {
            const { email, password } = data;

            const user = await loginUser({ email, password });

            updateUser({ email: user.email, name: user.name });
        } catch (error) {}
    };

    return (
        <Box flex={1} px="5.5" justifyContent="center" backgroundColor="white">
            <Text variant="textXl" fontWeight="700">
                Welcome back!
            </Text>

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
                        error={errors.password}
                        secureTextEntry
                    />
                )}
                name="password"
            />
            <Box mt="5.5" />

            <Pressable onPress={navigateToSignUpScreen}>
                <Text color="primary" textAlign="right">
                    Dont' have an account? Register here
                </Text>
            </Pressable>

            <Box mb="5.5" />

            <Button label="Login" uppercase onPress={handleSubmit(onSubmit)} />
        </Box>
    );
};

export default SignInScreen;
