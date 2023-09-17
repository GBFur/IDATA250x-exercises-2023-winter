import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.buttonContainer]
            : styles.buttonContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#7dd3fc" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#38bdf8",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "black",
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },

  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
