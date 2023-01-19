const graphql = require('graphql');
var _ = require('lodash');
const User = require('../model/user');
const Hobby = require('../model/hobby');
const Post = require('../model/post');

//dummy data
/*var userData = [//array of user data
    {id:"8", name: 'kaka', age: 82, profession: "mongo"},
    {id:"0", name: 'laa', age: 32, profession: "lobying"},
    {id:"99", name: 'saka', age: 82, profession: "serial Killer"},
    {id:"32", name: 'faka', age: 82, profession: "dead body"},
    {id:"12", name: 'naka', age: 82, profession: "zombie"},
    {id:"085", name: 'jaka', age: 82, profession: "vampier hunter"}
];

var hobbiesData = [//array of hobbiesData
    {id:"1", title: 'movie', description: "papappa", userId:'32'},
    {id:"2", title: 'root', description: "kaaklalal", userId:'32'},
    {id:"3", title: 'cause', description: "lalalala", userId:'12'},
    {id:"4", title: 'flying', description: "akakkaa", userId:'0'},
    {id:"5", title: 'killing', description: "mamam", userId:'99'},
    {id:"6", title: 'sleeping', description: "nanana", userId:'99'}
];

var postData = [//array of hobbiesData
    {id:"1", comments: 'movie', userId:'8'},
    {id:"2", comments: 'root', userId:'8'},
    {id:"3", comments: 'cause', userId:'0'},
    {id:"4", comments: 'flying', userId:'12'},
    {id:"5", comments: 'killing', userId:'99'},
    {id:"6", comments: 'sleeping', userId:'99'}
];
*/

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
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
        profession: {type: GraphQLString},
        hobbys: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
               return Hobby.find({userId: parent.id});
               // return _.filter(hobbiesData, {userId: parent.id})
            }
        },  
        posts: {
            type:new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({userId: parent.id});
               // return _.filter(postData, {userId: parent.id})
            }
        }    
    })
});

const HobbyType = new GraphQLObjectType({
    name : 'hobby',
    description: 'hobby for user...',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
                //return _.find(userData, {id: parent.userId})
            }
        }    
    })
});

const PostType = new GraphQLObjectType({
    name : 'post',
    description: 'post for user...',
    fields: () => ({
        id: {type: GraphQLID},
        comments: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
                //return _.find(userData, {id: parent.userId})
            }
        }  
    })
});


//RootQuery

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    description: 'This is a Root Query',
    fields: {
        user:{
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) { // parent is RootQuery
               return User.findById(args.id);
               // return _.find(userData, {id: args.id})
               
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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },
        hobby: {
            type: HobbyType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){ // parent is RootQuery
                //return data from hobby
                return Hobby.findById(args.id);
                //return _.find(hobbiesData, {id: args.id})
            }
        },
        hobbys: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return Hobby.find();
            }
        },
        post: {
            type: PostType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){ // parent is RootQuery
                //return data from postData
                return Post.findById(args.id);
                //return _.find(postData, {id: args.id})
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find();
            }
        },
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                //id: {type: GraphQLId}
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)},
                profession:{type: GraphQLString}
            },
            resolve(parent, args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                return user.save();
            }
        },
        createHobbyes: {
            type: HobbyType,
            args: {
                //id: {type: GraphQLID},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                });
                return hobby.save();
            }
        },
        createPost: {
            type: PostType,
            args: {
                //id: {type: GraphQLID},
                comments: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let post = Post({
                    comments: args.comments,
                    userId: args.userId
                });
                return post.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)},
                profession:{type: GraphQLString}
            },
            resolve(parent, args){
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: { 
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    },
                    {new: true}//send back the updated objectType
                );
            }
        },
        updateHobby: {
            type: HobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: { 
                            title: args.title,
                            description: args.description
                        }
                    },
                    {new: true}//send back the updated objectType
                );
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                comments: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: { 
                            comments: args.comments
                        }
                    },
                    {new: true}//send back the updated objectType
                );
            }
        },
        removeUser: {
            type: UserType,
            args: {
                id : {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let removedUser = User.findByIdAndRemove(args.id).exec();
                if(!removedUser) {
                    throw new "Error"();
                }
                return removedUser;
            }
        },
        removeHobby: {
            type: HobbyType,
            args: {
                id : {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec();
                if(!removedHobby) {
                    throw new "Error"();
                }
                return removedHobby;
            }
        },
        removePost: {
            type: PostType,
            args: {
                id : {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let removedPost = User.findByIdAndRemove(args.id).exec();
                if(!removedPost) {
                    throw new "Error"();
                }
                return removedPost;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation,
});
