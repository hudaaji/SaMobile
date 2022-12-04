import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StatusBar,
    Image,
    Alert
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { axioz, path } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function Maps({ navigation }) {

    const [data, setData] = useState([])
    const [loading, setIsLoading] = useState(false)

    const getData = async () => {
        const dataToken = await AsyncStorage.getItem('authUser');
        setIsLoading(true)
        await axios.get(`${path}/activities/monitoring/dashboard`,
            { headers: { "Authorization": `Bearer ${dataToken}` } }
        )
            .then(res => {
                setData(res.data.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        return;
    }

    useEffect(() => {
        getData()
        console.log(data)
    }, []);

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -8.6726769,
                    longitude: 115.1542328,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
                {data.map((d, i) => (
                    <Marker
                        key={i}
                        coordinate={{ latitude: parseFloat(d.lat), longitude: parseFloat(d.long) }}
                        description={d.info}
                        title={d.act}
                    />
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});