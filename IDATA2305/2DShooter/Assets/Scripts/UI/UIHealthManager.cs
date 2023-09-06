using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class UIHealthManager : MonoBehaviour
{
    public Image[] healthImageElements;  // Reference to your heart Image elements

    public Animator[] heartAnimators;
    public float lengthOfAnimation = 2f;

    private void Start()
    {
        UpdateHealthUI(3); // Initialize with the default health value (3 in this case)
    }

    public void UpdateHealthUI(int currentHealth)
    {
        StartCoroutine(UpdateHealthWithDelay(currentHealth));
    }

    private IEnumerator UpdateHealthWithDelay(int currentHealth)
    {
        for (int i = 0; i < healthImageElements.Length; i++)
        {
            if (i < currentHealth)
            {
                healthImageElements[i].gameObject.SetActive(true);
            }
            else
            {
                yield return new WaitForSeconds(2.2f);
                healthImageElements[i].gameObject.SetActive(false);
            }
        }
    }

    public void TriggerHearthLostAnimation(int heartIndex)
    {
        if (heartIndex >= 0 && heartIndex < heartAnimators.Length)
        {
            Animator heartAnimator = heartAnimators[heartIndex];
            if (heartAnimator != null)
            {
                heartAnimator.SetTrigger("HearthLostTrigger");
            }
        }
    }
}
