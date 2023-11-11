import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useGetWeather } from "../hooks/useGetWeather";
import * as Location from "expo-location";

const Weather = () => {
    const [loading, error, weather] = useGetWeather();
    console.log('weatherData: ',loading,error,"hellp", weather.list)
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setStatus(status);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (reverseGeocode && reverseGeocode[0]) {
            setLocationName(reverseGeocode[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [status]);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={28} color="black" />
          <View>
            <Text style={{ marginLeft: 2, fontSize: 14 }}>
              {locationName ? locationName.city : "City"}
            </Text>
            <Text style={{ marginLeft: 2, fontSize: 10, color: "grey" }}>
              {locationName ? locationName.region : "Region"}
            </Text>
          </View>
        </View>
        <MaterialIcons name="notifications-on" size={28} color="black" />
      </View>
      <ScrollView>
        <View style={{alignItems: "center"}}>
          <View style={styles.weatherContainer}>
            <Text>Hiii</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 23,
    padding: 16,
  },
  weatherContainer: {
    height: 192,
    width: "92%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(83, 137, 242, 0.86)',
    borderRadius: 30
  },
});