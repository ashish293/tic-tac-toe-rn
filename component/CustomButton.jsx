import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ item, index, playUser, userTurn, isGameOver, winner, winDigit }) => {
  return (
    <TouchableOpacity style={styles.CustomButton(winner, winDigit, index)}
      disabled={isGameOver || !userTurn || item != 0}
      onPress={playUser.bind(this, index)}>
      <Text style={styles.btnText}>{item == 1 ? "X" : item == 2 ? "O" : null}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  CustomButton: (winner, winDigit, index) => ({
    width: 80,
    height: 80,
    backgroundColor: (winner != 0 && winDigit.includes(index)) ? "#f6e58d" : "#ecf0f1",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
  btnText: {
    color: "#000",
    fontSize: 40
  }
})