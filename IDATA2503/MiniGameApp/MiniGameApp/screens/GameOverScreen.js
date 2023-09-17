import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ onNewGame, userChoice, numberOfGuesses }) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>The machine guessed it!</Text>
        <PrimaryButton onPress={onNewGame}>new game</PrimaryButton>
      </View>
      <View style={[styles.inputContainer, {flexDirection: "row", justifyContent: "space-between"}]}>
        <Text style={styles.text}>Gussed number:</Text>
        <Text>{userChoice}</Text>
      </View>
      <View style={[styles.inputContainer, {flexDirection: "row", justifyContent: "space-between"}]}>
        <Text style={styles.text}>Number of guesses:</Text>
        <Text>{numberOfGuesses}</Text>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    padding: 10,
    marginTop: 50,
    borderRadius: 6,
    marginHorizontal: 20,
    backgroundColor: "#38bdf8",
    elevation: 10,
    shadowColor: "black",
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
    marginHorizontal: 20,
    backgroundColor: "#0d0f10",
    elevation: 10,
  },

  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GameOverScreen;
