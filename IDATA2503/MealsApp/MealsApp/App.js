import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

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
  return (
    <Tab.Navigator>
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
  return (
    <Drawer.Navigator>
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

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                  title: "All Categories",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
              />
              <Stack.Screen name="MealDetail" component={MealDetailScreen} />
            </Stack.Navigator>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
