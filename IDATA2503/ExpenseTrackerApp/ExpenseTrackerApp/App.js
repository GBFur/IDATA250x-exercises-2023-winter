import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";
import { GlobalStyles } from "./constants/styles";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseTracker from "./screens/ExpenseTracker";
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
    <ExpensesContextProvider>
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
          }}
        >
          <Stack.Screen
            name="ExpenseTracker"
            component={ExpenseTracker}
            options={({ navigation }) => ({
              headerRight: headerRight(navigation),
            })}
          />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
