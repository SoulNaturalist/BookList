const DB = require('./database');
var mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = DB.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  registration_date: { type: String, default: new Date().toLocaleDateString('pt-PT') },
  books: { type: Object, default: {} },
  status: { type: String, default: '' },
  avatar: { type: String, default: 'https://cdn1.iconfinder.com/data/icons/neutro-essential/32/user-512.png' },
  role: { type: Number, default: 0 }, // user:0 moder:1 admin:2
  reviews: { type: Object, required: true, default: {} },
  bg: { type: String, default: '' },
  code: { type: String, required: true },
  emailConfirm: { type: Boolean, default: false },
  twoAuth: { type: Boolean, default: false },
  support: { type: Object, default: {"active":false, "date_end":""} },
  online: { type: Object, default: {"last_online_time":""} }
}, { minimize: false })




const BookSchema = new Schema({
  book_name: { type: String, required: true },
  book_author: { type: String, required: true },
  year_of_release: { type: Number, required: true },
  description: { type: String, required: true, default: 'description default' },
  reviews: { type: Object, default: {} },
  cover: { type: String, default: '' },
  quotes:{type: mongoose.Schema.Types.ObjectId, ref: 'quotes'},
  slug: { type: String, slug: ["book_name", "book_author"], index: { unique: true } }
}, { minimize: false })

const BookQuote = new Schema({
  book_id:{type: mongoose.Schema.Types.ObjectId, ref: 'books'},
  description_quote: {type: String, default: 'BookQuote example 1'}
}, { minimize: false })


const AuthorSchema = new Schema({
  author_name: { type: String, required: true },
  author_surname: { type: String, required: true },
  author_patronymic: { type: String, required: true },
  author_img:{ type: String, required: true },
  year_of_birth: { type: String, required: true },
  description: { type: String, required: false, default: "This is a temporary description, the author's descriptions will appear soon." },
  slug: { type: String, slug: ["author_name", "author_surname", "author_patronymic"], index: { unique: true } }
})

const messagesSchema = new Schema({
  dialog_id: { type: String, required: true },
  messages: { type: Object, required: true },
  initiator_id: { type: Number, required: true },
  interlocutor_id: { type: Number, required: true }
})

const userActLogging = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  act_id: { type: String, required: true },
  change_data: { type: Boolean, required: true },
  delete_data: { type: Boolean, required: true },
  create_data: { type: Boolean, required: true },
  act_description: { type: Number, required: true }
})

module.exports = { UserSchema, BookSchema, AuthorSchema, messagesSchema, userActLogging, BookQuote }
