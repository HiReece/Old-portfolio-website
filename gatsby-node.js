/* This file was made for redirect testing - feel free to remove the whole content here and delete the gatsby-node.js file -R */
exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect } = actions
  
    createRedirect({
      fromPath: `/what-is-this-path`,
      toPath: `/`,
    })

    createRedirect({
        fromPath: `/hi`,
        toPath: `/bye`,
      })
  }