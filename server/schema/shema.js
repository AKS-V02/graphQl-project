const graphql = require('graphql');
var _ = require('lodash');

//dummy data
var userData = [//array of user data
    {id:"8", name: 'kaka', age: 82, profesion: "mongo"},
    {id:"0", name: 'laa', age: 32, profesion: "lobying"},
    {id:"99", name: 'saka', age: 82, profesion: "serial Killer"},
    {id:"32", name: 'faka', age: 82, profesion: "dead body"},
    {id:"12", name: 'naka', age: 82, profesion: "zombie"},
    {id:"085", name: 'jaka', age: 82, profesion: "vampier hunter"}
];

var hobbiesData = [//array of hobbiesData
    {id:"8", title: 'movie', description: "papappa"},
    {id:"0", title: 'root', description: "kaaklalal"},
    {id:"99", title: 'cause', description: "lalalala"},
    {id:"32", title: 'flying', description: "akakkaa"},
    {id:"12", title: 'killing', description: "mamam"},
    {id:"085", title: 'sleeping', description: "nanana"}
];

var postData = [//array of hobbiesData
    {id:"8", comments: 'movie'},
    {id:"0", comments: 'root'},
    {id:"99", comments: 'cause'},
    {id:"32", comments: 'flying'},
    {id:"12", comments: 'killing'},
    {id:"085", comments: 'sleeping'}
];

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql;


//Create types
const UserType = new GraphQLObjectType({
    name : 'user',
    description: 'Document for user...',
    fields: () => ({
        //id: "29299",
        id: {type: GraphQLID},
        //name: "Gogo",
        name: {type: GraphQLString},
        //age: 40,
        age: {type: GraphQLInt},
        profesion: {type: GraphQLString}    
    })
});

const HobbyType = new GraphQLObjectType({
    name : 'hobby',
    description: 'hobby for user...',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}    
    })
});

const PostType = new GraphQLObjectType({
    name : 'post',
    description: 'post for user...',
    fields: () => ({
        id: {type: GraphQLID},
        comments: {type: GraphQLString}    
    })
});


//RootQuery

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    description: 'This is a Root Query',
    fields: {
        user:{
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
               return _.find(userData, {id: args.id})
               
                /* let user = {  //before lodash install
                    id: '3326',
                    name: 'Gogo',
                    age: 99
                }

                return user;*/
                
                
                //we resolve with data
                //get and return data from datasource

            }
        },
        hobby: {
            type: HobbyType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //return data from hobby
                return _.find(hobbiesData, {id: args.id})
            }
        },
        post: {
            type: PostType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //return data from postData
                return _.find(postData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
});
