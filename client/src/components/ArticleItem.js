import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ArticleItem = ({ data }) => {
    const navigate = useNavigate()
    function timestampToDate(ts) {
        var d = new Date();
        d.setTime(ts);
        return ("" + (new Date(ts)).toISOString())
            .replace(/^([^T]+)T(.+)$/, '$1')
            .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')
    }

    const date = timestampToDate(data.createdAt)




    return (


        <div class="post-item " >
            <div class="post-thumbnail">
                {data.image ? (
                    <Card.Img variant="top" src={process.env.REACT_APP_IMG_URL + data.image} />
                ) : (
                    <Card.Img variant="top" />
                )}
            </div>
            <div class="post-content">
                <ul class="post-meta">
                    <li>
                        <a href="#">{data.category.name}</a>
                    </li>
                    <li>
                        <a href="#"><i class="far fa-calendar-alt"></i>{date}</a>
                    </li>
                </ul>
                <h3 class="title">
                    <a href={data.link}>{data.name}</a>
                </h3>
                <br />
                <p className='artcile_item_desc'>{data.description}</p>
                <a href="" onClick={() => navigate(`/article/${data.id}`)} class="post-link">Читать Далее <i class="far fa-arrow-right"></i></a>
            </div>
        </div >

    )
}

export default ArticleItem
