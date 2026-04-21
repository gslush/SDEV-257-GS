import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  titleBold: {
    fontWeight: 'bold',
  },
  swipeAction: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '100%',
  },
  swipeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});