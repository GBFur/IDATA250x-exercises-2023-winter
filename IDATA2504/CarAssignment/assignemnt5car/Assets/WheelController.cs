using UnityEngine;

public class WheelController : MonoBehaviour
{
    [SerializeField]
    WheelCollider frontRight;

    [SerializeField]
    WheelCollider frontLeft;

    [SerializeField]
    WheelCollider backRight;

    [SerializeField]
    WheelCollider backLeft;

    [SerializeField]
    Transform frontRightTransform;

    [SerializeField]
    Transform frontLeftTransform;

    [SerializeField]
    Transform backRightTransform;

    [SerializeField]
    Transform backLeftTransform;

    public float acceleration = 500f;
    public float breakingForce = 300f;
    public float maxTurnAngle = 15f;

    private float currentAcceleration = 0f;
    private float currentBreakForce = 0f;
    private float currentTurnAngle = 0f;

    

    private void FixedUpdate()
    {
        currentAcceleration = acceleration * Input.GetAxis("Vertical");

        if (Input.GetKey(KeyCode.Space))
        {
            currentBreakForce = breakingForce;
        }
        else
        {
            currentBreakForce = 0f;
        }

        frontRight.motorTorque = currentAcceleration;
        frontLeft.motorTorque = currentAcceleration;

        frontRight.brakeTorque = currentBreakForce;
        frontLeft.brakeTorque = currentBreakForce;
        backLeft.brakeTorque = currentBreakForce;
        backRight.brakeTorque = currentBreakForce;

        currentTurnAngle = maxTurnAngle * Input.GetAxis("Horizontal");
        frontLeft.steerAngle = currentTurnAngle;
        frontRight.steerAngle = currentTurnAngle;

        UpdateWheel(frontRight, frontRightTransform);
        UpdateWheel(frontLeft, frontLeftTransform);
        UpdateWheel(backRight, backRightTransform);
        UpdateWheel(backLeft, backLeftTransform);
    }

    void UpdateWheel(WheelCollider col, Transform trans) {
        Vector3 posistion;
        Quaternion rotation;
        col.GetWorldPose(out posistion, out rotation);

        trans.position = posistion;
        trans.rotation = rotation;
    }
}
