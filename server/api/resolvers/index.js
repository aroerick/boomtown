/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control the error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server')
const jwt = require("jsonwebtoken")
const authMutations = require("./auth")
const { UploadScalar, DateScalar } = require('../custom-types')

module.exports = function(app) {
  return {
    Upload: UploadScalar,
    // Date: DateScalar,
    Query: {
      viewer(parent, args, context, info) {
        if(context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'))
        }
        return null
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const item = await pgResource.getItems(filter)
          return item
        } catch (e) {
          throw new ApolloError(e)
        }
        // -------------------------------
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const tag = await pgResource.getTags()
          return tag
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    User: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The User GraphQL type has two fields that are not present in the
       *  user table in Postgres: items and borrowed.
       *
       *  According to our GraphQL schema, these fields should return a list of
       *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
       *
       */
      // @TODO: Uncomment these lines after you define the User type with these fields
      items(parent, args, { pgResource }, info) {
        try {
          const items = pgResource.getItemsForUser(parent.id)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      borrowed (parent, args, { pgResource }, info) {
        try {
          const borrowed = pgResource.getBorrowedItemsForUser(parent.id)
          return borrowed
        } catch (e) {
          throw new ApolloError(e)
        }
      }
      // -------------------------------
    },

    Item: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The Item GraphQL type has two fields that are not present in the
       *  Items table in Postgres: itemowner, tags and borrower.
       *
       * According to our GraphQL schema, the itemowner and borrower should return
       * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
       *
       */
      // @TODO: Uncomment these lines after you define the Item type with these fields
      async itemowner(parent, args, { pgResource }, info) {
        const owner = pgResource.getUserById(parent.ownerid)
        return owner
        // @TODO: Replace this mock return statement with the correct user from Postgres
        // return {
        //   id: 29,
        //   fullname: "Mock user",
        //   email: "mock@user.com",
        //   bio: "Mock user. Remove me."
        // }
        // -------------------------------
      },
      async tags(parent, args, { pgResource }, info) {
        // @TODO: Replace this mock return statement with the correct tags for the queried Item from Postgres
        try {
          const tags = pgResource.getTagsForItem(parent.id)
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
        // -------------------------------
      },
      async borrower(parent, args, { pgResource }, info) {
        /**
         * @TODO: Replace this mock return statement with the correct user from Postgres
         * or null in the case where the item has not been borrowed.
         */
        try {
          const borrower = pgResource.getUserById(parent.borrowerid)
          return borrower
        } catch (e) {
          throw new ApolloError(e)
        }
        // -------------------------------
      },
      // async imageurl({ imageurl, imageid, mimetype, data }) {
      //   if (imageurl) return imageurl
      //   if (imageid) {
      //     return `data:${mimetype};base64, ${data}`
      //   }
      // }
      // -------------------------------
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, context, info) {
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        const image = await args.image
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'))
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image: image,
          user
        })
        return newItem
      }
    }
  }
}
