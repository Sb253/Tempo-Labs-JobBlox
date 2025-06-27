import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";

// Contexts
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";

// Screens
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OwnerDashboardScreen from "./src/screens/OwnerDashboardScreen";
import ManagerDashboardScreen from "./src/screens/ManagerDashboardScreen";
import ProjectsScreen from "./src/screens/ProjectsScreen";
import CustomersScreen from "./src/screens/CustomersScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import ReportsScreen from "./src/screens/ReportsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

// Navigation
import TabNavigator from "./src/navigation/TabNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

// Theme
import { lightTheme, darkTheme } from "./src/theme/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDark ? darkTheme.colors : lightTheme.colors),
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider>
            <AuthProvider>
              <NavigationContainer theme={theme}>
                <Stack.Navigator
                  initialRouteName="Landing"
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: "slide_from_right",
                  }}
                >
                  <Stack.Screen name="Landing" component={LandingScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                    name="Main"
                    component={DrawerNavigator}
                    options={{
                      gestureEnabled: false,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
              <StatusBar style={isDark ? "light" : "dark"} />
            </AuthProvider>
          </ThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
