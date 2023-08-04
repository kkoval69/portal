import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const FavoriteItem = (props) => {
    const navigate = useNavigate()
    return (
        <tr >
            <td onClick={() => navigate(`/article/${props.id}`)} className="favorite_table_name">{props.name} </td>
            <td>{props.description}</td>

            <td>
                <Button variant="link" onClick={() => props.remove(props.id)}>
                    Удалить
                </Button>
            </td>
        </tr>
    );
}

export default FavoriteItem