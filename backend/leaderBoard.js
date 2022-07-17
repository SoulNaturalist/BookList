const DB = require('./database');
const {UserSchema} = require('./schemes');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post('/api/get_leaders', async function (req, res) {
    const typeLeaders = req.body["type_leaders"];
    const usersModel = DB.model('users', UserSchema);
    if (typeLeaders === "books") {
        const queryData = { password: false,__v: false,role: false,twoAuth:false,code:false,emailConfirm:false,email:false,registration_date:false,reviews:false,
            _id:false,
            status:false,
            bg:false,
            books:false
        };
        const sortByCountBooks = await usersModel.find({},queryData).sort({books:"descending"}).limit(3).exec();
        return res.json(sortByCountBooks);
    } else if (typeLeaders === "reviews") {
        const queryData = { password: false,__v: false,role: false,twoAuth:false,code:false,emailConfirm:false,email:false,registration_date:false,books:false,
            _id:false,
            status:false,
            bg:false,
            books:false
        };
        const sortByCountReviews = await usersModel.find({},queryData).sort({reviews:"descending"}).limit(3).exec();
        return res.json(sortByCountReviews);
    } else {
        return res.json({message:"Сортировка по симпатиям в разработке"});


    }

})

module.exports = router;