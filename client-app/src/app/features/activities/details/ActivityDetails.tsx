import React, { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";

export default function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Card fluid>
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
          <Button basic color='grey' content='Cancel'></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}