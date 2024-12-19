import React from 'react'
import styled from 'styled-components'
import { PrimaryColor } from './stockAnalysisDashboard'

interface NewsLink {
  title: string;
  link: string;
}

interface NewsListProps {
  newsLinks: NewsLink[];
}

const NewsListContainer = styled.div`
  max-width: 100%;
`;

const NewsItem = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%; /* Adjust the width as per your requirement */
  margin-bottom: 10px; /* Adjust spacing between links */
`;

const NewsLink = styled.a`
  text-decoration: none;
  color: ${PrimaryColor};
  font-size: 12px;
`;

const ScrollableList = styled.div`
  max-height: 80%; /* Adjust the height as needed */
  overflow-y: auto;
`;

const NewsList: React.FC<NewsListProps> = ({ newsLinks }) => {
  return (
    <NewsListContainer>
      <div style={{marginBottom: '10px'}}>In The News</div>
      <ScrollableList>
        {newsLinks.map((news) => (
          <NewsItem>
            <NewsLink href={news.link} title={news.title} target="_blank" rel="noopener noreferrer">
              {news.title}
            </NewsLink>
          </NewsItem>
        ))}
      </ScrollableList>
    </NewsListContainer>
  );
};

export default NewsList;
