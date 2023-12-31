import { NavigationContainer } from "@react-navigation/native";

import AuthStackNavigator from "./authStackNavigator";
import AppStackNavigator from "./appStackNavigator";

const Navigation = () => {
    return (
        <NavigationContainer>
            {/* <AuthStackNavigator /> */}
            <AppStackNavigator />
        </NavigationContainer>
    );
};

export default Navigation;
