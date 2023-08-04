import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

// модель «Пользователь», таблица БД «users»
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

// модель Избранное, таблица БД «favorites»
const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const FavoriteArticle = sequelize.define('favorite_article', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
})


const Article = sequelize.define('article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false }

})

// модель «Категория», таблица БД «categories»
const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// модель «Тег», таблица БД «tags»
const Tag = sequelize.define('tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Commentary = sequelize.define('commentary', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

const CommentaryItem = sequelize.define('commentary_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

Favorite.belongsToMany(Article, { through: FavoriteArticle, onDelete: 'CASCADE' })
Article.belongsToMany(Favorite, { through: FavoriteArticle, onDelete: 'CASCADE' })

Favorite.hasMany(FavoriteArticle)
FavoriteArticle.belongsTo(Favorite)
Article.hasMany(FavoriteArticle)
FavoriteArticle.belongsTo(Article)

Category.hasMany(Article, { onDelete: 'RESTRICT' })
Article.belongsTo(Category)

Tag.hasMany(Article, { onDelete: 'RESTRICT' })
Article.belongsTo(Tag)

Commentary.hasMany(CommentaryItem, { as: 'items', onDelete: 'CASCADE' })
CommentaryItem.belongsTo(Commentary)

User.hasMany(Commentary, { as: 'commentarys', onDelete: 'SET NULL' })
Commentary.belongsTo(User)

Article.hasMany(Commentary, { as: 'commentarys', onDelete: 'SET NULL' })
Commentary.belongsTo(Article)

export {
    User,
    Favorite,
    Article,
    Category,
    Tag,
    FavoriteArticle,
    Commentary,
    CommentaryItem
}

