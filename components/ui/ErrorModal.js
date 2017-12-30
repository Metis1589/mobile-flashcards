import React from 'react'
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import { white, black, redDark } from '../../utils/colors'

const ErrorModal = ({visibleModal, errorMessage, onCloseClick, ...props}) => (
    <Modal isVisible={visibleModal}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity onPress={onCloseClick} style={{width: '50%'}}>
                <View style={styles.modalButton}>
                    <Text style={{color: white, fontSize : 20}}>Close</Text>
                </View>
            </TouchableOpacity>
        </View>
    </Modal>
)

export default ErrorModal

const styles = StyleSheet.create({
    modalContainer: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: 24,
        color: redDark
    },
    modalButton: {
        backgroundColor: black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: black,
        margin: 16,
        padding: 8
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})