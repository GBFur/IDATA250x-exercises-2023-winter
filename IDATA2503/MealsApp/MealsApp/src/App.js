import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Toast from "react-native-toast-message";
import CategoriesScreen from "./screens/CategoriesScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const CategoriesIcon = ({ color, size }) => (
  <MaterialIcons name={"category"} size={size} color={color} />
);

const FavoritesIcon = ({ color, size }) => (
  <MaterialIcons name={"favorite"} size={size} color={color} />
);

function BottomTabs() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" },
      }}
    >
      <Tab.Screen
        name="Categories"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => CategoriesIcon({ color, size }),
        }}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => FavoritesIcon({ color, size }),
        }}
        component={FavoriteScreen}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" },
        drawerInactiveTintColor: isDarkMode ? "#fff" : "#000",
        headerStyle: { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" },
        headerTintColor: isDarkMode ? "#fff" : "#000",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabs}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        options={{
          title: "Settings",
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        },
        headerTintColor: isDarkMode ? "#ffffff" : "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          title: "All Categories",
          headerShown: false,
        }}
      />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </GluestackUIProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
