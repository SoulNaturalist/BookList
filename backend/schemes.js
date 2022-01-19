const DB = require('./database');
const Schema = DB.Schema;


const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    registration_date:{ type:String, default: new Date().toLocaleDateString('pt-PT')},
    book_read_count: {type: Number, default:0},
    books: { type: Object, default:{} },
    status:{ type: Object, default:{} },
    role: {type: Boolean,default: false},
}, { minimize: false });

const BookSchema = new Schema ({
    book_name: { type: String, required: true},
    book_author: {type: String, required: true},
    year_of_release: {type: Number, required: true},
    description: {type: String, required: true, default:"description default"},
    reviews: {type: Object, default:{}},
}, { minimize: false })

const AuthorSchema = new Schema({
    author_name: {type: String, required: true},
    author_surname: {type: String, required: true},
    author_patronymic: {type: String, required: true},
    year_of_birth: {type: Number, required: true},
    description: {type: String, required: false, default:"This is a temporary description, the author's descriptions will appear soon."},
})


const Review = new Schema({
    book_id: { type: Number, required: true},
    author_review: { type: String, required: true},
    text_review: {type: String, required: true},
    rating_view: {type: Number, required: true}
})

module.exports = {UserSchema,BookSchema,AuthorSchema};