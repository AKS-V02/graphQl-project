const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull

} = graphql;

//Scalar Type
/* 
    String
    int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name : 'Person',
    description: 'Document for Person Type...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}, 
        
        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
});


//RootQuery

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    description: 'This is a Root Query',
    fields: {
        person: {
            type: Person,
            resolve(parent, args){
                let personObj = {
                    name: null,
                    age: 44,
                    isMarried: true,
                    gpa: 8.2,
                };
                return personObj;
            }

        }
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation,
});