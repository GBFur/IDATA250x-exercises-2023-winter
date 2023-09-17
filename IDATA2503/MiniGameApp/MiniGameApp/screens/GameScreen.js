import { Text, View, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
let numberOfGuesses = 0;

function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(numberOfGuesses, userChoice);
    }
  }, [currentGuess, userChoice]);

  useEffect(() => {
    numberOfGuesses = 0;
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    numberOfGuesses++;

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View style={styles.inputContainer}>
        <View style={styles.title}>
          <Text style={{ color: "white" }}>Higher or Lower?</Text>
        </View>
        <View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                +
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                -
              </PrimaryButton>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.inputContainer,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={{ color: "white" }}>What to guess: </Text>
        <Text style={{ color: "white" }}> {userChoice}</Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={{ color: "white" }}>Number of guesses by machine: </Text>
        <Text style={{ color: "white" }}>{numberOfGuesses}</Text>
      </View>
    </View>
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
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
    marginHorizontal: 20,
    backgroundColor: "#0d0f10",
    elevation: 10,
  },

  title: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
});

export default GameScreen;
