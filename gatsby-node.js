const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        // 'createFilePath'는 경로 생성을 자동화하지만 여기서는 사용자 정의 경로가 필요
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              category
            }
          }
        }
      }
    }
  `);

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `blog/${node.frontmatter.category}/${node.frontmatter.title.replace(/ /g, "-").toLowerCase()}`,
            component: path.resolve(`./src/templates/blog-post.jsx`),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};
