using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using TextMeshPro = TMPro.TextMeshProUGUI;

public class TutorialTextView : MonoBehaviour
{
  public Button myButton;
  public TextMeshPro myText;

  void Start()
  {
    Button btn = myButton.GetComponent<Button>();
    btn.onClick.AddListener(TaskOnClick);
  }

  void TaskOnClick()
  {
    myText.enabled = false;
    myButton.gameObject.SetActive(false);
  }
}
