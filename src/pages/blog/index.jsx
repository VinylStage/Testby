import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../../components/Layout';

const BlogIndex = () => {
  const data = useStaticQuery(graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
  `);

  return (
    <Layout>
      <h1>Blog Posts</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.fields.slug}>
          <h2>{node.frontmatter.category}</h2>
          <ul>
            <li>
              <Link to={node.fields.slug}>  // slug 필드를 이용한 링크 사용
                <h3 className='text-emerald-400'>{node.frontmatter.title}</h3>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </Layout>
  );
};

export default BlogIndex;
