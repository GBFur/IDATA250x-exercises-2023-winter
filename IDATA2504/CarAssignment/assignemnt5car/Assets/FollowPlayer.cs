using UnityEngine;

public class FollowPlayer : MonoBehaviour
{
    private Vector3 offset;

    [SerializeField]
    private Transform player;

    [SerializeField]
    private float smoothTime;

    private Vector3 currentVelocity = Vector3.zero;

    private void Awake()
    {
        offset = transform.position - player.position;
    }

    private void LateUpdate()
    {
        Vector3 targetPosition = player.position + offset;
        transform.position = Vector3.SmoothDamp(
            transform.position,
            targetPosition,
            ref currentVelocity,
            smoothTime
        );
    }
}
