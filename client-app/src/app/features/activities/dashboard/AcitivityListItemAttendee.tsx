import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { Profile } from '../../../models/profile';

interface Props {
  attendees: Profile[];
}

export default observer(function AcitivityListItemAttendee({attendees}: Props) {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
          <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
        </List.Item>
      ))}
    </List>
  )
})