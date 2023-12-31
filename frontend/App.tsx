import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@shopify/restyle";

import theme from "@/utils/theme";

import Navigation from "@/navigation";

import SafeAreaWrapper from "@/components/shared/safeAreaWrapper";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider>
                <SafeAreaWrapper>
                    <Navigation />
                    <StatusBar translucent />
                </SafeAreaWrapper>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
