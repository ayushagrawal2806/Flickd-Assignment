import { StyleSheet, Text, View } from "react-native";

const Header = (props: { title: string }) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>AI Clipart Generator</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#886161",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
