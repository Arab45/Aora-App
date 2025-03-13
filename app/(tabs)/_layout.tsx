import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#ff9801",
      tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
            backgroundColor: "#161622",
            minHeight: 84,
            paddingTop: 16,
            paddingBottom: 16,
            // paddingBottom: 4
        }
    }}>
      <Tabs.Screen
        name="home"
        options={{
         title: "Home",
          headerShown: false,
          tabBarIcon: ({focused}) => ( <Entypo name="home" size={30} color={ focused ?  "#ff9801" : "gray"} />),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
         title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (<Ionicons name="person" size={30} color={ focused ? "#ff9801" : "gray"} />),
        }}
      />

      <Tabs.Screen
        name="created"
        options={{
         title: "Created",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome name="plus-circle" size={30} color={ focused ? "#ff9801" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
         title: "Saved",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome name="bookmark" size={30} color={ focused ? "#ff9801" : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
};
