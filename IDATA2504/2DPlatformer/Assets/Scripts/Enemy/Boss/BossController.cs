using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BossController : MonoBehaviour
{
    public float speed = 5f; // Speed at which the boss moves

    private Rigidbody2D rb;
    private Vector2 movementDirection;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        ChooseRandomHorizontalDirection();
    }

    void FixedUpdate()
    {
        rb.MovePosition(rb.position + movementDirection * speed * Time.fixedDeltaTime);
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Wall"))
        {
            Debug.Log("hello");
            ChangeDirectionUponCollision(collision.contacts[0].normal);
        }
    }

    /**
    Choose a random horizontal direction for movement
    */
    void ChooseRandomHorizontalDirection()
    {
        float sign = Random.Range(0, 2) * 2 - 1; // -1 or 1
        movementDirection = new Vector2(sign, 0);
    }

void ChangeDirectionUponCollision(Vector2 normal)
{
    // Reflect based on collision normal
    Vector2 newDirection = Vector2.Reflect(movementDirection, normal);

    // Constrain to horizontal movement
    newDirection.y = 0;

    // If the new direction after reflection ends up being zero, try to reverse the direction instead
    if (newDirection.sqrMagnitude < 0.001f)
    {
        newDirection = -movementDirection;
    }

    // Update movement direction
    movementDirection = newDirection.normalized;
}

}
