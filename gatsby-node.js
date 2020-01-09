/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
var slug = require('slug')

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `GraphQLSource`) {
    console.log(node)
  }
}

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
        got {
            listCharacters {
              items {
                name
              }
            }
          }
    }
  `)
  console.log(data.got.listCharacters.items)
  data.got.listCharacters.items.map(character => {
    actions.createPage({
      path: `app/characters/${slug(character.name, {
        lower: true,
        replacement: '-',
      })}`,
      component: path.resolve('./src/components/Character.js'),
      context: {
        name: character.name,
        description: character.description,
        avatar: character.avatar,
      },
    })
  })
}