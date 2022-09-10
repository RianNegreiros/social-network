import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../../models/profile";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({profile}: Props) {
  return (
    <Card>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
      </Card.Content>
    </Card>
  )
})