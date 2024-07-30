import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppointmentsList from "./components/AppointmentsList";

const styles = StyleSheet.create({
    title: {
        marginTop: 12,
        marginLeft: 12,
        color: ' #666633'
    },
    titleText: {
        fontSize: 18,
    },
})

const Appointment = () => {
    return (
        <View>
            <View style={styles.title}>
                <Text style={styles.titleText}>Seus agendamentos para:</Text>
            </View>
            <AppointmentsList/>
        </View>
    );
}

export default Appointment;