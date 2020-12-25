import React from 'react'
import { Modal as NativeModal, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'

const Modal = ({ visible, onRequestClose, onDismiss, onPressOut, children, transparent }) => (

  <NativeModal
    transparent={transparent}
    visible={visible}
    onRequestClose={onRequestClose}
    onDismiss={onDismiss}
  >
    <TouchableOpacity style={styles.container} activeOpacity={1} onPressOut={onPressOut}>
      <ScrollView directionalLockEnabled={true} contentContainerStyle={styles.scrollModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </ScrollView>
    </TouchableOpacity>
  </NativeModal>
)

export default Modal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollModal: {
    flex: 1,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
