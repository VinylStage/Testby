import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        {/* markdown-body 클래스를 추가하여 GitHub 스타일 적용 */}
        <section className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
