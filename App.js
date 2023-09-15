import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/AppStack";
import { LogBox } from "react-native";
import { ThemaProvider } from "./src/components/ThemeProvider";
import {
  DrawerProvider,
  TabBarProvider,
  PostsProvider,
  UserProvider,
  NotificationsProvider,
} from "./src/context";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <NotificationsProvider>
        <DrawerProvider>
          <TabBarProvider>
            <UserProvider>
              <PostsProvider>
                <ThemaProvider>
                  <NavigationContainer>
                    <AppStack />
                  </NavigationContainer>
                </ThemaProvider>
              </PostsProvider>
            </UserProvider>
          </TabBarProvider>
        </DrawerProvider>
      </NotificationsProvider>
      <Toast />
    </>
  );
}
