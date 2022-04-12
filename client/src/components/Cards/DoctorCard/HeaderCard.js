import { Card } from 'react-bootstrap';

const HeaderCard = ({
    category
}) => {
    // console.log(category + ' header category');
    return (
        <Card
            border="primary"
            text="primary"
            style={{ width: '18rem', boxShadow: '5px 5px #888888' }}
            className="mb-2"
        >
            <Card.Header style={{ fontWeight: 'bold', fontSize: '20px', padding: '3px 16px 3px 16px' }}>
                {category !== undefined ? category : 'All'}
            </Card.Header>

        </Card>
    )
}

export default HeaderCard;