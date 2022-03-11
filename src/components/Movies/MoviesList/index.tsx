
import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { MoviesListProps } from './interfaces';
import { motion } from 'framer-motion';
import { Container, Content, SectionTitle } from "./styles";
import { MovieCard } from '../MovieCard'

export const MoviesList = ({ 
  isRecommendation,
  isHomepage,
  isProfile,
  isPersonDetails,
  moviesToRender
}: MoviesListProps ) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSectionTitle = () => {
    let title = 'Filmes mais Populares';

    if (pathname.includes('upcoming')) {
      title = 'Próximos Lançamentos'
    } else if (pathname.includes('top-rated')) {
      title = 'Melhores Filmes'
    } else if (pathname.includes('now-playing')) {
      title = 'Filmes em Cartaz'
    }

    return title;
  }

  useEffect(() => {
    handleSectionTitle();
  }, [pathname])

  return (
    <>
      <Container>
        {
          isHomepage && 
          <SectionTitle>{handleSectionTitle()}</SectionTitle>
        }
        <Content 
          as={motion.ul}
          layout
          isRecommendation={isRecommendation}
          isProfile={isProfile}
          isHomepage={isHomepage}
        >
          {moviesToRender?.map((movie, i) => (
            <MovieCard
              isPersonDetails={isPersonDetails}
              isProfile={isProfile}
              key={movie.id}
              index={i}
              movie={movie}
              onClick={(id: number) => {
                navigate(`/movie/${id}`)
              }}
            />
          ))}
        </Content>
      </Container>
    </>
  );
}

