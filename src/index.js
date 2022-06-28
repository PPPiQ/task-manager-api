const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT ;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('')
//     } else {
//         next()
//     }
//     console.log(req.method, req.path);
//     next();
// })


// app.use((req, res, next) => {
//     res.status(503).send('Servis in maintenance. Sorry for inconvenience');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is up on port ', port);
})


// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('62b1a5f465223cfe3cf4f2d0');
//     // await task.populate('owner');
//     // console.log(task.owner);

//     const user = await User.findById('62b1a5df65223cfe3cf4f2c7');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main()

// const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'thsisisencryptionhash', { expiresIn: '1 hour'});
//     console.log(token);
//     const data = jwt.verify(token, 'thsisisencryptionhash')

// }

// myFunction()