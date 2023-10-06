using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>
/// This class handles the movement of the player with given input from the input manager
/// </summary>
public class PlayerController : MonoBehaviour
{
    [Header("Settings")]
    [Tooltip("The speed at which the player moves")]
    public float moveSpeed = 5f;

    [Tooltip("The speed at which the player rotates")]
    public float lookSpeed = 5f;

    [Tooltip("The force applied to the player when they jump")]
    public float jumpForce = 5f;

    [Tooltip("The gravity applied to the player")]
    public float gravity = 9.81f;

    [Header("Jump Timing")]
    public float jumpTimeLatency = 0.1f;
    float timeToStopBeingLenient = 0;

    [Tooltip("The player shooter script that fires projectiles")]
    public Shooter playerShooter;
    public Health playerHealth;
    public List<GameObject> disableWhileDead;

    bool doubleJumpAvailable = false;

    // The character controller component attached to the player
    private CharacterController characterController;
    private InputManager inputManager;

    /// <summary>
    /// Description:
    /// Standard Unity function called once before the first Update call
    /// Input:
    /// none
    /// Return:
    /// void (no return)
    /// </summary>
    void Start()
    {
        SetUpCharacterController();
        SetUpInputManager();
    }

    private void SetUpCharacterController()
    {
        characterController = GetComponent<CharacterController>();
        if (characterController == null)
        {
            Debug.LogError("No CharacterController component found on the player");
        }
    }

    private void SetUpInputManager()
    {
        inputManager = InputManager.instance;
        if (inputManager == null)
        {
            Debug.LogError("No InputManager found in the scene");
        }
    }

    Vector3 movementDirection;

    private void ProcessMovement()
    {
        // Get the input from the input manager
        float leftRightInput = inputManager.horizontalMoveAxis;
        float forwardBackwardInput = inputManager.verticalMoveAxis;
        bool jumpPressed = inputManager.jumpPressed;

        // Handle the control of the player while it is on the ground
        if (characterController.isGrounded)
        {
            doubleJumpAvailable = true;
            timeToStopBeingLenient = Time.time + jumpTimeLatency;

            // Set the movement direction to be the received input, set y to 0 since we are on the ground
            movementDirection = new Vector3(leftRightInput, 0f, forwardBackwardInput);
            // Set the move direction in relation to the transform
            movementDirection = transform.TransformDirection(movementDirection);
            movementDirection = movementDirection * moveSpeed;

            // Handle the jump input
            if (jumpPressed)
            {
                movementDirection.y = jumpForce;
            }
        }
        else
        {
            movementDirection = new Vector3(
                leftRightInput * moveSpeed,
                movementDirection.y,
                forwardBackwardInput * moveSpeed
            );
            movementDirection = transform.TransformDirection(movementDirection);

            if (jumpPressed && Time.time < timeToStopBeingLenient)
            {
                movementDirection.y = jumpForce;
            }
            else if (doubleJumpAvailable && jumpPressed)
            {
                movementDirection.y = jumpForce;
                doubleJumpAvailable = false;
            }
        }

        movementDirection.y -= gravity * Time.deltaTime;

        if (characterController.isGrounded && movementDirection.y < 0)
        {
            movementDirection.y = -1f;
        }

        characterController.Move(movementDirection * Time.deltaTime);
    }

    private void ProcessRotation()
    {
        float horizontalLookInput = inputManager.horizontalLookAxis;
        Vector3 playerRotation = transform.rotation.eulerAngles;
        transform.rotation = Quaternion.Euler(
            new Vector3(
                playerRotation.x,
                playerRotation.y + horizontalLookInput * lookSpeed * Time.deltaTime,
                playerRotation.z
            )
        );

        playerRotation.y += horizontalLookInput * lookSpeed * Time.deltaTime;
    }

    /// <summary>
    /// Description:
    /// Standard Unity function called once every frame
    /// Input:
    /// none
    /// Return:
    /// void (no return)
    /// </summary>
    void Update()
    {
        if (playerHealth.currentHealth <= 0)
        {
            foreach (GameObject obj in disableWhileDead)
            {
                obj.SetActive(false);
            }
            return;
        }
        else
        {
            foreach (GameObject obj in disableWhileDead)
            {
                obj.SetActive(true);
            }
        }

        ProcessMovement();
        ProcessRotation();
    }
}
