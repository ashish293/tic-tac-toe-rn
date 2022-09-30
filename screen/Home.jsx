import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '../component/CustomButton'
import { FlatGrid } from 'react-native-super-grid';


const Home = () => {
  // const [game, setGame] = useState(new Array(9).fill(0))
  const [game, setGame] = useState([1, 1, 0, 2, 1, 2, 1, 2, 2])
  const [userTurn, setuserTurn] = useState(true)
  const [isGameOver, setisGameOver] = useState(false)
  const [winner, setWinner] = useState()
  const [winDigit, setWinDigit] = useState(new Array(3).fill(0))

  useEffect(() => {
    if (checkWin(0, 1, 2) || checkWin(3, 4, 5) || checkWin(6, 7, 8) ||
      checkWin(0, 3, 6) || checkWin(1, 4, 7) || checkWin(2, 5, 8) ||
      checkWin(0, 4, 8) || checkWin(2, 4, 6)) {
      setisGameOver(true)
      return;
    }
  }, [game])

  const checkWin = (i, j, k) => {
    if (game[i] != 0 && game[i] == game[j] && game[j] == game[k]) {

      setWinner(game[i])
      setWinDigit([i, j, k])
      return true;
    }
    return false;
  }


  useEffect(() => {
    if (!userTurn) {
      setTimeout(() => {
        computer();
        setuserTurn(true)
      }, 300)
    }
  }, [userTurn])

  const playUser = (index) => {
    setGame(game.map((item, i) => i === index ? 1 : item));
    setuserTurn(false)
  }

  const computer = () => {
    if (!game.includes(0) && !isGameOver) {
      setisGameOver(true);
      // setWinner(3);
      return;
    }
    let index = Math.floor(Math.random() * 9);
    if (game[index] == 0) {
      setGame(game.map((item, i) => i === index ? 2 : item));
    } else {
      computer();
    }
  }
  const handleReset = () => {
    setGame(new Array(9).fill(0))
    setuserTurn(true)
    setisGameOver(false)
    setWinner(0)
  }

  return (
    <View>
      <Text style={styles.title}>Tic Tac Toe</Text>

      <FlatGrid
        data={game}
        renderItem={({ item, index }) => (<CustomButton key={index} isGameOver={isGameOver} userTurn={userTurn} item={item} index={index} game={game} playUser={playUser} winDigit={winDigit} winner={winner} />)}
        spacing={0}
        additionalRowStyle={
          {
            justifyContent: "center"
          }
        }
        itemContainerStyle={{
          width: "auto"
        }}
      />
      {isGameOver && <Text style={styles.result}> {winner == 1 ? "You Won" : winner == 2 ? "You Lost" : "Match Drawn"}</Text>}
      {isGameOver && <View style={styles.btnContainer}>
        <Button title="Reset" onPress={handleReset} />
      </View>}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  gridRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50,
    textTransform: "uppercase",
    color: "black"
  },
  result: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 20
  },
  btnContainer: {
    width: 100,
    alignSelf: "center",
  }
})