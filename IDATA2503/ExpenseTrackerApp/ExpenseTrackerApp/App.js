import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import { Button, View } from "react-native";
import { GlobalStyles } from "./constants/styles";

const HeaderRightButton = ({ navigation }) => (
  <View style={{padding: 5}}>
    <Button
      onPress={() => navigation.navigate("AddExpense")}
      title="+"
      color={GlobalStyles.colors.primary900}
    />
  </View>
);

const headerRight = (navigation) => {
  return () => <HeaderRightButton navigation={navigation} />;
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: GlobalStyles.colors.primary900},
          headerStyle: {
            backgroundColor: GlobalStyles.colors.secondary600,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="ExpenseTracker"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: headerRight(navigation),
          })}
        />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
