import { Text, StyleSheet } from "react-native";

function Title({children}) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    borderColor: "black",
    color: "black",
  },
});

export default Title;
