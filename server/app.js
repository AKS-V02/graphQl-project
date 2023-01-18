
const express = require('express');

//const expressGraphql = require('express-graphql');
const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema/shema')

const app = express();



//app.use('/graphql', expressGraphql.graphqlHTTP({
app.use('/graphql', graphqlHTTP({ // "/graphql" is the url extention our case "http://localhost:4000/graphql"
    graphiql: true,
    schema: schema
}));

app.listen(4000, () => { //localhost:4000
    console.log("logo");
});