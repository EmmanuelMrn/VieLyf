import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'react-cards';

class CardExample extends React.Component {
  render() {
    return (
      <Card>
        <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" />
        <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button href="#">Button</Button>
        </CardBody>
    </Card>
    )
  }
};
export default CardExample;