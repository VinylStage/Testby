const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    // 슬래시를 인코딩하지 않음
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    });
  }
};




exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug, // 인코딩된 슬러그를 사용하지 않음
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

