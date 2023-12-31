import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CategoryStackParamList } from "./types";

import CategoriesScreen from "@/screens/categoriesScreen";
import CategoryScreen from "@/screens/categoryScreen";

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const CategoriesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default CategoriesStackNavigator;
