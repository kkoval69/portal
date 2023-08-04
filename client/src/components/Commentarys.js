const Commentarys = (props) => {

    if (props.items.length === 0) {
        return <p>Список комментариев пустой</p>
    }
    let itemsFilt = []
    props.items.map(item => {
        if (item.articleId == props.arId) { itemsFilt.push(item) }
    }
    )
    // console.log(itemsFilt)
    // console.log(props.items)
    return (

        <ul class="comments-list">
            <li>
                {itemsFilt.map(item =>
                    <div class="comment-body" >

                        <div class="comment-content" style={{ width: "100%" }}>
                            <h5 class="commentator">{item.userId}</h5>
                            <span class="date">{item.prettyCreatedAt}</span>
                            <p>
                                {item.name}
                            </p>
                        </div>
                    </div>
                )}
            </li>
        </ul>

    )
}

export default Commentarys