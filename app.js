
const express = require('express');

//const expressGraphql = require('express-graphql');
const {graphqlHTTP} = require('express-graphql');

const schema = require('./server/schema/shema');
const testSchema = require('./server/schema/types_schema');

// mongodb+srv://AKS-V02:<password>@graphqlcluster.uji9dhv.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000


//app.use('/graphql', expressGraphql.graphqlHTTP({
app.use('/graphql', graphqlHTTP({ // "/graphql" is the url extention our case "http://localhost:4000/graphql"
    graphiql: true, ////to see the graphiql inteface in browser ui at localhost
    schema: schema
}));

mongoose.set('strictQuery', false).connect(`mongodb+srv://${process.env.mongoDBUserName}:${process.env.mongoDBUserPassword}@graphqlcluster.uji9dhv.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`
, {useNewUrlParser: true, useUnifiedTopology:true}//, useCreateIndex: true}
).then(() => {
    app.listen({port: port}, () => { //localhost:4000
        console.log("logo port"+port);
    });
}).catch((e) => console.log("error======"+e));

/*app.listen(4000, () => { //localhost:4000
    console.log("logo");
});*/