import { Table } from 'react-bootstrap'

const Commentary = (props) => {

    return (
        <>
            <ul>
                <li>Дата комментария {props.data.prettyCreatedAt}</li>

            </ul>
            <ul>
                <li>Имя, фамилия: {props.data.name}</li>
            </ul>
            <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>

                    </tr>
                </thead>
                <tbody>
                    {props.data.items.map(item =>
                        <tr key={item.id}>
                            <td>{item.name}</td>

                        </tr>
                    )}

                </tbody>
            </Table>
        </>
    )
}

export default Commentary