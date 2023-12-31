import {
    CompositeNavigationProp,
    NavigatorScreenParams
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    Today: undefined;
    Completed: undefined;
    CategoriesStack: NavigatorScreenParams<CategoryStackParamList>;
};

export type HomeStackParamList = {
    Home: undefined;
    EditTask: undefined;
};

export type CategoryStackParamList = {
    Categories: undefined;
    Category: {
        id: string;
    };
    CreateCategory: {
        id?: string;
    };
};

export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>;
    Settings: undefined;
};

export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>;
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, "Root">
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
