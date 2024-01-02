import { StatusBar } from "expo-status-bar";
import { AppState } from "react-native";
import { SWRConfig } from "swr";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@shopify/restyle";

import theme from "@/utils/theme";

import Navigation from "@/navigation";

import SafeAreaWrapper from "@/components/shared/safeAreaWrapper";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { useEffect } from "react";

export default function App() {
    const { updateUser } = useUserGlobalStore();

    useEffect(() => {
        // updateUser(null);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider>
                <SafeAreaWrapper>
                    <SWRConfig
                        value={{
                            provider: () => new Map(),
                            isVisible: () => {
                                return true;
                            },
                            initFocus(callback) {
                                let appState = AppState.currentState;

                                const onAppStateChange = (
                                    nextAppState: any
                                ) => {
                                    /* If it's resuming from background or inactive mode to active one */
                                    if (
                                        appState.match(/inactive|background/) &&
                                        nextAppState === "active"
                                    ) {
                                        callback();
                                    }
                                    appState = nextAppState;
                                };

                                // Subscribe to the app state change events
                                const subscription = AppState.addEventListener(
                                    "change",
                                    onAppStateChange
                                );

                                return () => {
                                    subscription.remove();
                                };
                            }
                        }}
                    >
                        <Navigation />
                    </SWRConfig>
                    <StatusBar translucent />
                </SafeAreaWrapper>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
