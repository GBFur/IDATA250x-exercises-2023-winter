# Assignment 1 - ExpenseTracker

## Use Cases

![use-cases](docs/use-cases.drawio.svg)

## Project Structure

The project uses react navigation for navigating between screens.

These screens are the AddExpenseScreen and the ExpenseTracker.
AddExpenseScreen is where the user can add an expense.
ExpenseTracker is the landing page of the application, where the user sees the ExpensesList and ExpensesChart

ExpensesOutput is in charge of outputting the data using the ExpensesList and ExpensesChart
ExpenseOutput also handles the deletion and undo deletion.

ExpenseForm is in charge of showing an form where the user can add an expanse.

The expenses-context manages the state locally but it also interacts with a dummy backend using Firebase.

## Additional features

Dummy backend with firebase