import * as React from "react"
import Layout from "../components/Layout/Layout"
import { graphql } from 'gatsby'

const IndexPage = () => {
  return (
    <Layout />
  )
}

export default IndexPage

export const Head = ({data}) => {
  return(
    <>
      <title>Rytis Portfolio Website</title>
      <link rel="icon" href={data.contentfulPage.favicon.file.url} type="image/svg+xml" />
    </>
  )
}

export const query = graphql`
query {
  contentfulPage(name: {eq: "Homepage"}) {
    favicon {
      file {
        url
      }
    }
  }
} 
`