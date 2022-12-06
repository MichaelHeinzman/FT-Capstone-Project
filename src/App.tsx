import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.background}>
        <SafeAreaView style={styles.container}>
          <RootNavigation />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
});
