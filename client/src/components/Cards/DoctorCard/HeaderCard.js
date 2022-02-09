import { Card } from 'react-bootstrap';

const HeaderCard = ({
    category
}) => {
    console.log(category + 'header category');
    return (
        <Card
            border="primary"
            text="primary"
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Header>{category != undefined ? category : 'All'}</Card.Header>

        </Card>
    )
}

export default HeaderCard;