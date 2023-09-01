import 'package:flutter/material.dart';

class StyledText extends StatelessWidget {
  const StyledText(this.title, {super.key});

  final String title;

  @override
  Widget build(context) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 50,
        fontWeight: FontWeight.bold,
        color: Colors.deepPurple,
      ),
    );
  }
}
