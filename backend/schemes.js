const DB = require('./database');
const Schema = DB.Schema;



const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    registration_date:{ type:String, default: new Date().toLocaleDateString('pt-PT')},
    books: { type: Object, default:{} },
    status:{ type: String, default:"" },
    avatar: {type: String, default:"https://imageup.ru/img52/3963583/defolt-avatar.jpg?nc"},
    role: {type: Number,default:0}, // user:0 moder:1 admin:2
    reviews: {type: Object, required: true, default:{}},
    bg:{type:String,default:""},
    code: {type:String,required: true},
    emailConfirm:{type:Boolean,default:false},
    twoAuth:{type:Boolean,default:false},
}, { minimize: false });

const BookSchema = new Schema ({
    book_name: { type: String, required: true},
    book_author: {type: String, required: true},
    year_of_release: {type: Number, required: true},
    description: {type: String, required: true, default:"description default"},
    reviews: {type: Object, default:{}},
    cover:{type:String, default:""},
    slug: { type: String, slug: "title", index: { unique: true }}
}, { minimize: false })

BookSchema.pre("save", function(next) {
    this.slug = `${Math.round(Math.random() * (10000 - 1) + 1)}`;
    next();
});

const AuthorSchema = new Schema({
    author_name: {type: String, required: true},
    author_surname: {type: String, required: true},
    author_patronymic: {type: String, required: true},
    year_of_birth: {type: Number, required: true},
    description: {type: String, required: false, default:"This is a temporary description, the author's descriptions will appear soon."},
})

module.exports = {UserSchema,BookSchema,AuthorSchema};