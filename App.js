import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/AppStack";
import { LogBox } from "react-native";
import { ThemaProvider } from "./src/components/ThemeProvider";
import { UserProvider } from "./src/context";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <UserProvider>
        <ThemaProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </ThemaProvider>
      </UserProvider>
      <Toast />
    </>
  );
}
