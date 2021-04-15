const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    res.status(200)
    res.send('ok')
})

// Handle Production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started on port: ${port}`))

app.use(async (err, req, res, next) => {
  await errorHandler.HandleError(err, req, res, next);
});

//app.use(errorHandler)