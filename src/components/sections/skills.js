import React from 'react';
import { srConfig } from '@config';
import sr from '@utils/sr';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { GrHeroku } from 'react-icons/gr';
import {
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiRuby,
  SiRubyonrails,
} from 'react-icons/si';

const StyledSkillsSection = styled.section`
  max-width: 700px;

  .logo {
    height: 150px;
    width: 150px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;
    list-style: none;
  }

  skills-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Skills = () => {
  const data = useStaticQuery(graphql`
    query {
      skills: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/skills/" } }
        sort: { fields: [frontmatter___rank], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              rank
            }
          }
        }
      }
    }
  `);

  const skillData = data.skills.edges.filter(({ node }) => node);

  const skillLogos = [
    <FaReact />,
    <SiJavascript />,
    <FaPython />,
    <FaNodeJs />,
    <SiPostgresql />,
    <SiMongodb />,
    <SiRedux />,
    <SiRuby />,
    <SiRubyonrails />,
    <GrHeroku />,
  ];

  const skill = node => {
    const { frontmatter } = node;
    const { title, rank } = frontmatter;

    return (
      <>
        <div className="logo">{skillLogos[rank]}</div>
        <div>{title}</div>
      </>
    );
  };

  return (
    <StyledSkillsSection id="skills">
      <div>
        <h2 className="numbered-heading">Skills</h2>
        <div className="inner">
          <ul className="skills-grid">
            {skillData.map(({ node }) => (
              <li className="skills-item">{skill(node)}</li>
            ))}
          </ul>
        </div>
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
