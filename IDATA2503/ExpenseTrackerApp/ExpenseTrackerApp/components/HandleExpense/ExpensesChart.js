import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { GlobalStyles } from "../../constants/styles";

/**
 * Bar chart component for displaying expenses by tag in a bar chart
 * Click on a bar to see the total amount for the tag
 */
function ExpensesChart({ expenses }) {
  const [availableWidth, setAvailableWidth] = useState(0);

  const tagAmount = {
    food: 0,
    travel: 0,
    leisure: 0,
    work: 0,
  };

  // Calculate total amount for each tag
  expenses.forEach((expense) => {
    if (tagAmount[expense.tag] !== undefined) {
      tagAmount[expense.tag] += parseFloat(expense.amount); // Parse to float to avoid string concatenation
    }
  });

  const chartData = [
    {
      value: tagAmount.food,
      label: "Food",
      labelTextStyle: { color: "white" },
    },
    {
      value: tagAmount.travel,
      label: "Travel",
      labelTextStyle: { color: "white" },
    },
    {
      value: tagAmount.leisure,
      label: "Leisure",
      labelTextStyle: { color: "white" },
    },
    {
      value: tagAmount.work,
      label: "Work",
      labelTextStyle: { color: "white" },
    },
  ];

  const numberOfBars = chartData.length;
  const gapBetweenBars = 50;
  const barWidth = Math.floor(
    (availableWidth - gapBetweenBars * (numberOfBars - 1)) / numberOfBars
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        setAvailableWidth(layout.width);
      }}
    >
      <BarChart
        data={chartData}
        frontColor={GlobalStyles.colors.secondary700}
        hideRules={true}
        barWidth={barWidth}
        hideAxesAndRules={true}
        renderTooltip={(item) => {
          return (
            <View
              style={{
                position: "absolute",
                padding: 5,
                backgroundColor: GlobalStyles.colors.primary500,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>{`$${item.value}`}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: "50%",
  },
});

export default ExpensesChart;
