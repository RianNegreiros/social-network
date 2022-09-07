import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
}

export default function ActivityDetails({ activity, cancelSelectActivity }: Props) {
  return (
    <Card>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button basic color='blue' content='Edit'></Button>
          <Button onClick={cancelSelectActivity} basic color='grey' content='Cancel'></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}