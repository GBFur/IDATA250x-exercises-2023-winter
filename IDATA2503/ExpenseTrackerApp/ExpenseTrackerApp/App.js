import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { GlobalStyles } from "./constants/styles";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import ExpensesContextProvider from "./store/expenses-context";

const HeaderRightButton = ({ navigation }) => (
  <View style={{ padding: 5 }}>
    <Button
      onPress={() => navigation.navigate("AddExpense")}
      title="Add expense"
      color={GlobalStyles.colors.secondary900}
    />
  </View>
);

const headerRight = (navigation) => {
  return () => <HeaderRightButton navigation={navigation} />;
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: GlobalStyles.colors.primary950 },
              headerStyle: {
                backgroundColor: GlobalStyles.colors.secondary600,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "white",
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            <Stack.Screen
              name="ExpenseScreen"
              component={ExpenseScreen}
              options={({ navigation }) => ({
                headerRight: headerRight(navigation),
                animation: "slide_from_right",
                title: "Expenses",
              })}
            />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </ToastProvider>
  );
}
