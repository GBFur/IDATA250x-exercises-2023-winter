using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwapper : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (SceneManager.GetActiveScene().name == "Scene1")
            {
                SceneManager.LoadScene("Scene2");
            }
            else if (SceneManager.GetActiveScene().name == "Scene2")
            {
                SceneManager.LoadScene("Scene3");
            }
            else if (SceneManager.GetActiveScene().name == "Scene3")
            {
                SceneManager.LoadScene("Scene1");
            }
        }
    }
}
