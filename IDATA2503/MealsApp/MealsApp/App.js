import { MaterialIcons } from "@expo/vector-icons";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";
import MealsOverviewScreen from "./src/screens/MealsOverviewScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { store } from "./src/store/redux/store";

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

function StatusBarCustom() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <StatusBar
      style={isDarkMode ? "light" : "dark"}
      backgroundColor={isDarkMode ? "#000000" : "#FFFFFF"}
    />
  );
}

export default function App() {
  return (
    <>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBarCustom />
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </GluestackUIProvider>
      <Toast />
    </>
  );
}
