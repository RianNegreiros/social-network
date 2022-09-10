import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function HomePage() {
    const {userStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Home Page
                </Header>
                {userStore.isLogggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome' />
                    <Button as={Link} to='/activities' size='huge' inverted>
                        See Activities
                    </Button>
                    </>
                ) : (
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login
                    </Button>
                )}
            </Container>
        </Segment>
    )
})