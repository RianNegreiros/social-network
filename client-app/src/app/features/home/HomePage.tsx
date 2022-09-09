import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Home Page
                </Header>
                <Header as='h2' inverted content='Welcome' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    See Activities
                </Button>
            </Container>
        </Segment>
    )
}