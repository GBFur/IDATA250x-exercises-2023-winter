import 'dart:math';

import 'package:flutter/material.dart';

final randomizer = Random();

class DiceRoller extends StatefulWidget {
  const DiceRoller({super.key});

  @override
  State<DiceRoller> createState() {
    return _DicerollerState();
  }
}

class _DicerollerState extends State<DiceRoller> {
  var activeDiceImage = 'images/dice-1.png';

  void rollDice() {
    setState(() {
      var randomNumber = randomizer.nextInt(6) + 1;
      print(randomNumber);
      activeDiceImage = 'images/dice-$randomNumber.png';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        //Pressing the image will roll the dice
        GestureDetector(
          onTap: () {
            rollDice();
          },
          child: Image.asset(activeDiceImage, width: 200),
        ),
        TextButton(
          onPressed: rollDice,
          style: TextButton.styleFrom(
            foregroundColor: Colors.yellow,
            textStyle: const TextStyle(fontSize: 36),
          ),
          child: const Text('Roll Dice'),
        ),
      ],
    );
  }
}
