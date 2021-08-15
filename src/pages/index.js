import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import { Box, Flex, Heading, Text } from 'rebass'
import styled from 'styled-components'

import Container from 'components/Container'
import Footer from 'components/Footer'
import Intro from 'components/Intro'
import Layout from 'components/Layout'
import PostCard from 'components/PostCard'
import ProjectCard from 'components/ProjectCard'

const Section = styled(Flex).attrs({ justifyContent: 'center', p: 4 })`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.snow}
  );
`

const SectionDescription = styled(Box).attrs({
  align: 'right',
  flex: '0 0 15%',
  mr: 3,
  pr: 3,
  width: 1 / 4
})`
  border-right: 2px solid ${({ theme }) => theme.colors.smoke};
`

const SectionHeading = styled(Heading).attrs({
  color: 'primary',
  fontSize: 5,
  fontWeight: 600,
  mb: 2
})`
  display: inline-block;
  text-transform: lowercase;
`

const SectionGrid = styled(Flex.withComponent('ol')).attrs({
  flexWrap: 'wrap'
})`
  list-style: none;
  margin: ${({ theme }) => -theme.space[2]}px;
  padding: 0;
`

const IndexPage = ({ data }) => (
  <Layout>
    <Intro />
    <Section>
      <Container maxWidth={64}>
        <Flex /* flexDirection={['column', null, 'row']} */>
          <SectionDescription>
            <SectionHeading>Projects</SectionHeading>
            <Text color="slate">
              A few projects I’ve built/collabed on recently.
            </Text>
          </SectionDescription>
          <SectionGrid>
            {data.projects.edges
              .map(({ node }) => node.data)
              .map(project => (
                <ProjectCard data={project} key={project.name} />
              ))}
          </SectionGrid>
        </Flex>
      </Container>
    </Section>
    <Footer />
  </Layout>
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        posts: allGhostPost(
          limit: 6
          sort: { order: DESC, fields: [published_at] }
        ) {
          edges {
            node {
              id
              title
              slug
              html
              feature_image
              published_at
              excerpt
            }
          }
        }
        projects: allAirtable(
          filter: {
            table: { eq: "Projects" }
            data: { Is_hidden: { ne: true } }
          }
          limit: 8
          sort: { order: DESC, fields: [data___Created_at] }
        ) {
          edges {
            node {
              data {
                name: Name
                description: Description
                background: Background
                project_url: Project_URL
                created_at: Created_at
                is_hidden: Is_hidden
              }
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} />}
  />
)
