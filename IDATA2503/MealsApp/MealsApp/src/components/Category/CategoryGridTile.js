import { Box, Pressable, Text } from "@gluestack-ui/themed";

/**
 * A grid tile for a category.
 */
function CategoryGridTile({ title, color, onPress }) {
  return (
    <Box style={styles.gridItem}>
      <Pressable
        style={styles.button}
        bg={color}
        onPress={() => {
          onPress();
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
    width: "49%",
    marginBottom: 4,
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
