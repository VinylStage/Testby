const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: `/blog/${encodeURIComponent(slug)}`, // 한글 URL 인코딩
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
    const { title, category } = node.frontmatter;
    if (!title || !category) {
      console.error("Missing category or title in frontmatter:", node.fields.slug);
      return; // 데이터가 없으면 페이지 생성 스킵
    }

    const pagePath = node.fields.slug;
    console.log("Creating page at:", pagePath);
    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
