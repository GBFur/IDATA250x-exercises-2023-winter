import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionSpecs,
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { GlobalStyles } from "./constants/styles";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseTracker from "./screens/ExpenseTracker";
import ExpensesContextProvider from "./store/expenses-context";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";

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
              name="ExpenseTracker"
              component={ExpenseTracker}
              options={({ navigation }) => ({
                headerRight: headerRight(navigation),
                animation: "slide_from_right",
              })}
            />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </ToastProvider>
  );
}
