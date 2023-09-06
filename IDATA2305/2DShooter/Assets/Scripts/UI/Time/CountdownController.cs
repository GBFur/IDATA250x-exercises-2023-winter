using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CountdownController : MonoBehaviour
{
    public Text countdownText;
    public float timeRemaining = 0;
    public bool timerIsRunning = false;


    private void Start()
    {
        // Starts the timer automatically
        timerIsRunning = true;
    }

    private void Update()
    {
        if (timerIsRunning)
        {
            if (GameManager.instance.gameIsOver == true)
            {
                timerIsRunning = false;
            }

            if (timeRemaining >= 0 && (GameManager.getEnemiesDefeated <= GameManager.getEnemiesToDefeat))
            {
                timeRemaining -= Time.deltaTime;
                DisplayTime(timeRemaining);
            }

            else
            {
                Debug.Log("Time has run out!");
                DisplayTime(timeRemaining);
                GameManager.instance.GameOver();
                timerIsRunning = false;
            }
        }
    }

    private void DisplayTime(float timeRemaining)
    {
        if (countdownText != null)
        {
            float seconds = Mathf.FloorToInt(timeRemaining % 60);
            countdownText.text = string.Format("{0:00}", seconds);
            countdownText.text = $"Time remaining: {seconds:00} seconds";
        }
    }
}
