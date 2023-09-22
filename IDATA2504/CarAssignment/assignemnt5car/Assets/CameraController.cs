using UnityEngine;

public class CameraController : MonoBehaviour
{
    public Camera thirdPersonCamera;
    public Camera topViewCamera;

    void Start()
    {
        thirdPersonCamera.enabled = true;
        topViewCamera.enabled = false;
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1))
        {
            thirdPersonCamera.enabled = true;
            topViewCamera.enabled = false;
        }
        else if (Input.GetKeyDown(KeyCode.Alpha2))
        {
            thirdPersonCamera.enabled = false;
            topViewCamera.enabled = true;
        }

        if (thirdPersonCamera.enabled && Input.GetKey(KeyCode.F))
        {
            thirdPersonCamera.fieldOfView -= 20 * Time.deltaTime;
        }

        if (thirdPersonCamera.enabled && Input.GetKey(KeyCode.V))
        {
            thirdPersonCamera.fieldOfView += 20 * Time.deltaTime;
        }
    }
}
