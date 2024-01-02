import { NavigationContainer } from "@react-navigation/native";

import useUserGlobalStore from "@/store/useUserGlobalStore";
import AppStackNavigator from "./appStackNavigator";
import AuthStackNavigator from "./authStackNavigator";

const Navigation = () => {
    const { user } = useUserGlobalStore();

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default Navigation;
