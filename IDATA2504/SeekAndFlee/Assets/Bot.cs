using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Bot : MonoBehaviour
{
    NavMeshAgent agent;
    public GameObject target;
    private Drive drive;

    // Start is called before the first frame update
    void Start()
    {
        agent = this.GetComponent<NavMeshAgent>();
        drive = target.GetComponent<Drive>();
    }

    void Seek(Vector3 location)
    {
        agent.SetDestination(location);
    }

    void Flee(Vector3 location)
    {
        Vector3 fleeVector = location - this.transform.position;
        agent.SetDestination(this.transform.position - fleeVector);
    }

    void Pursure()
    {
        Vector3 targetDir = target.transform.position - this.transform.position;

        float relativeHeading = Vector3.Angle(this.transform.forward, this.transform.TransformVector(target.transform.forward));
        float toTarget = Vector3.Angle(this.transform.forward, this.transform.TransformVector(targetDir));

        if ((toTarget > 90 && relativeHeading < 20) || drive.currentSpeed <= 0.01f)
        {
            Seek(target.transform.position);
            return;
        }

        float lookAhead = targetDir.magnitude / (agent.speed + drive.currentSpeed);
        Seek(target.transform.position + target.transform.forward * lookAhead);
    }

    void Evade()
    {
        Vector3 targetDir = target.transform.position - this.transform.position;
        float lookAhead = targetDir.magnitude / (agent.speed + drive.currentSpeed);
        Flee(target.transform.position + target.transform.forward * lookAhead);
    }

    Vector3 wanderTarget = Vector3.zero;

    void Wander()
    {
        float wanderRadius = 10;
        float wanderDistance = 20;
        float wanderJitter = 1;

        wanderTarget += new Vector3(Random.Range(-1.0f, 1.0f) * wanderJitter, 0, Random.Range(-1.0f, 1.0f) * wanderJitter);

        wanderTarget.Normalize();
        wanderTarget *= wanderRadius;

        Vector3 targetLocal = wanderTarget + new Vector3(0, 0, wanderDistance);
        Vector3 targetWorld = this.gameObject.transform.InverseTransformVector(targetLocal);

        Seek(targetWorld);
    }

    void Hide()
    {
        float distToClosest = Mathf.Infinity;
        Vector3 chosenSpot = Vector3.zero;

        for (int i = 0; i < World.Instance.GetHidingSpots().Length; i++)
        {
            Vector3 hideDir = World.Instance.GetHidingSpots()[i].transform.position - target.transform.position;
            Vector3 hidePos = World.Instance.GetHidingSpots()[i].transform.position + hideDir.normalized * 5;

            if (Vector3.Distance(this.transform.position, hidePos) < distToClosest)
            {
                distToClosest = Vector3.Distance(this.transform.position, hidePos);
                chosenSpot = hidePos;
            }
        }

        Seek(chosenSpot);
    }

    void CleverHide()
    {
        float distToClosest = Mathf.Infinity;
        Vector3 chosenSpot = Vector3.zero;
        Vector3 chosenDirection = Vector3.zero;
        GameObject chosenGO = World.Instance.GetHidingSpots()[0];

        for (int i = 0; i < World.Instance.GetHidingSpots().Length; i++)
        {
            Vector3 hideDir = World.Instance.GetHidingSpots()[i].transform.position - target.transform.position;
            Vector3 hidePos = World.Instance.GetHidingSpots()[i].transform.position + hideDir.normalized * 10;

            if (Vector3.Distance(this.transform.position, hidePos) < distToClosest)
            {
                distToClosest = Vector3.Distance(this.transform.position, hidePos);
                chosenDirection = hideDir;
                chosenGO = World.Instance.GetHidingSpots()[i];
                chosenSpot = hidePos;
            }
        }

        Collider hideCol = chosenGO.GetComponent<Collider>();
        Ray backRay = new Ray(chosenSpot, -chosenDirection.normalized);
        RaycastHit info;
        float distance = 100.0f;
        hideCol.Raycast(backRay, out info, distance);

        Seek(info.point + chosenDirection.normalized * 5);
    }

    bool CanSeeTarget()
    {
        RaycastHit raycastInfo;
        Vector3 rayToTarget = target.transform.position - this.transform.position;
        float lookAngle = Vector3.Angle(this.transform.forward, rayToTarget);
        if (Physics.Raycast(this.transform.position, rayToTarget, out raycastInfo))
        {
            if (lookAngle < 60 && raycastInfo.transform.gameObject.tag == "cop")
            {
                return true;
            }
        }
        return false;
    }

    bool TargetInRange() {
        float distance = Vector3.Distance(this.transform.position, target.transform.position);
        if (distance < 10) return true;
        return false;
    }



    bool CanSeeMe()
    {
        Vector3 rayToTarget = this.transform.position - target.transform.position;
        float lookAngle = Vector3.Angle(target.transform.forward, rayToTarget);

        if (lookAngle < 60) return true;

        return false;

    }

    bool coolDown = false;
    void BehaviourCooldown()
    {
        coolDown = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (!coolDown)
        {
            if (!TargetInRange())
            {
                Wander();
            }
            else if (CanSeeTarget() && CanSeeMe())
            {
                CleverHide();
                coolDown = true;
                Invoke("BehaviourCooldown", 5.0f);
            }
            else
            {
                Pursure();
            }
        }
    }
}

