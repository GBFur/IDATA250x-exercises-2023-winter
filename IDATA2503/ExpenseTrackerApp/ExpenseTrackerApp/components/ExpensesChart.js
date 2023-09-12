import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { GlobalStyles } from "../constants/styles";

function ExpensesChart({ expenses }) {
  const [availableWidth, setAvailableWidth] = useState(0);
  const tagCount = {
    food: 0,
    travel: 0,
    leisure: 0,
    work: 0,
  };

  expenses.forEach((expense) => {
    if (tagCount[expense.tag] !== undefined) {
      tagCount[expense.tag] += 1;
    }
  });

  const chartData = [
    { value: tagCount.food, label: "Food", labelTextStyle: { color: "white" } },
    {
      value: tagCount.travel,
      label: "Travel",
      labelTextStyle: { color: "white" },
    },
    {
      value: tagCount.leisure,
      label: "Leisure",
      labelTextStyle: { color: "white" },
    },
    { value: tagCount.work, label: "Work", labelTextStyle: { color: "white" } },
  ];

  const numberOfBars = chartData.length;
  const gapBetweenBars = 50; //constant value
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
        renderTooltip={(item, index) => {
          return (
            <View
              style={{
                marginBottom: 20,
                marginLeft: -6,
                backgroundColor: GlobalStyles.colors.secondary700,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white" }}>{item.value}</Text>
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
  chart: {
    width: "50%", // set chart width to 100%
  },
});

export default ExpensesChart;
