import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CallIncomingScreen from "./src/screens/CallIncomingScreen";
import CallOngoingScreen from "./src/screens/CallOngoinScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScenarioSelection } from "./src/screens/ScenarioSelection";
import { HomeScreen } from "./src/screens/HomeScreen";
import { IphoneCallContainer } from "./src/screens/IphoneCallContainer";
import { ContactsScreen } from "./src/screens/ContactsScreen";
import ChannelTalkScreen from "./src/screens/ChannelTalkScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // 상단 헤더 숨김
          animationEnabled: true, // 화면 전환 애니메이션 활성화
        }}
      >
        <Stack.Screen name="ScenarioSelect" component={ScenarioSelection} />
        <Stack.Screen name="Ongoing" component={CallOngoingScreen} />
        <Stack.Screen name="Incoming" component={CallIncomingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IphoneCall" component={IphoneCallContainer} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen
          name="ChannelTalk"
          component={ChannelTalkScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
