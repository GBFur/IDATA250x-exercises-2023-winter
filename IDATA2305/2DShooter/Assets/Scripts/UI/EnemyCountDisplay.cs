using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// This class inherits for the UIelement class and handles updating the enemy count
/// </summary>
public class EnemyCountDisplay : UIelement
{

    public Text displayText = null;

    private void DisplayEnemiesLeft()
    {
        if (displayText != null)
        {
            int EnemiesToDefeat = GameManager.getEnemiesToDefeat;
            int EnemiesDefeated = GameManager.getEnemiesDefeated;
            int EnemiesLeft = EnemiesToDefeat - EnemiesDefeated;
            displayText.text = "Enemies left: " + EnemiesLeft.ToString();
        }
    }

    public override void UpdateUI()
    {
        // This calls the base update UI function from the UIelement class
        base.UpdateUI();

        // The remaining code is only called for this sub-class of UIelement and not others
        DisplayEnemiesLeft();
    }
}
