express     = require('express')
http        = require('http')
bodyParser  = require('body-parser')
hosApi      = require('hos-api')
HoSAuth     = require('hos-auth')
cors        = require('cors')
path        = require('path')

amqpurl     = process.env.AMQP_URL ? "localhost"
amqpusername    = process.env.AMQP_USERNAME ? "guest"
amqppassword    = process.env.AMQP_PASSWORD ? "guest"

hosAuth = new HoSAuth(amqpurl, amqpusername, amqppassword)
hosAuth.on 'message', (msg) ->
  msg.accept()

port = process.env.API_PORT ? 8080
address = process.env.API_ADDRESS ? 'localhost'

hosAuth.connect().then ->
  hosApi.init(true, "#{address}:#{port}").then ->
    app = express()

    app.set 'port', port
    app.use cors()
    app.use express.static(path.join(__dirname, '../public'))
    app.get '/', (req, res)-> res.sendFile(path.join(__dirname,'../public/view/index.html'))
    app.use bodyParser.json()
    app.use hosApi.swaggerMetadata
    app.use hosApi.swaggerValidator
    app.use hosApi.swaggerUi
    app.use hosApi.middleware

    http.createServer(app).listen app.get('port'), ->
      console.log 'Express server listening on port ' + app.get('port')
      console.log 'try opening http://localhost:8080/docs/'
