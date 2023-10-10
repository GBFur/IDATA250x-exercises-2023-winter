import { Box, Pressable, Text } from "@gluestack-ui/themed";

function CategoryGridTile({ title, color, onPress }) {
  return (
    <Box style={styles.gridItem}>
      <Pressable
        style={styles.button}
        bg={color}
        onPress={() => {
          onPress();
          console.log("pressed");
        }}
        sx={{ ":pressed": { opacity: 0.4 } }}
      >
        <Box style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </Box>
      </Pressable>
    </Box>
  );
}

const styles = {
  gridItem: {
    height: 150,
    padding: 10,
    width: "49%", // slightly less than half to account for margins or gaps
    marginBottom: 4, // for spacing between rows
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default CategoryGridTile;
