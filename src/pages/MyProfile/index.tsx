import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { personApi } from "../../services/requests/api";

import { 
  Container, 
  Cover,
  MoviesSection,
  ProfileDetails,
  ProfileHeader,
  ProfileMoviesCount,
  ProfileSection
} from './styles';

import { MoviesList } from "../../components/Movies/MoviesList";
import { useSelector } from "react-redux";
import { EditProfileModal } from '../../components/Global/EditProfileModal';

export default function MyProfile() {
  const [ openModal, setOpenModal ] = useState(false);

  const { addedMoviesObj, profileEditedInfos } = useSelector((state) => state);

  const handleModalState = () => setOpenModal(!openModal);

  const handleThisYearMoviesWatched = (watchedMovies) => {
    const thisYearCount = [...watchedMovies]?.filter(
      (movie) =>
        new Date(movie.createdAt).getFullYear() === new Date().getFullYear()
    ).length;

    return thisYearCount;

  }

  const { watchedMovies, favoriteMovies } = addedMoviesObj;
  const { profileName, profileBio, usersProfileImagesObj } = profileEditedInfos;
  const { profileImage, profileCover } = usersProfileImagesObj;

  useEffect(() => {
    console.log('All', profileEditedInfos)
    const { profileName, profileBio, usersProfileImagesObj } = profileEditedInfos;
    const { profileImage, profileCover } = usersProfileImagesObj;

  }, [profileEditedInfos]);
  
  return (
    <Container>
      <Cover
        backdrop={profileCover?.preview}
      >
        <ProfileHeader>
          <ProfileDetails>
            <img 
              draggable={false}
              src={profileImage?.preview}
            />
            <div>
              <h2>{profileName}</h2>
              <p>{profileBio}</p>
            </div>
          </ProfileDetails>
          <ProfileSection>
            <ProfileMoviesCount>
              <li>
                <p>{watchedMovies?.length}</p>
                <span>Já vi</span>
              </li>
              <li>
                <p>{handleThisYearMoviesWatched(watchedMovies)}</p>
                <span>Neste ano</span>
              </li>
              <li>
                <p>{favoriteMovies?.length}</p>
                <span>Favoritos</span>
              </li>
            </ProfileMoviesCount>
            <button
              onClick={handleModalState}  
            >
              Editar Perfil
            </button>
            <EditProfileModal 
              openModal={openModal}
              handleModalState={handleModalState}
              profileEditedInfos={profileEditedInfos}
            />
          </ProfileSection>
        </ProfileHeader>
      </Cover>

      {favoriteMovies.length > 0 && (
        <MoviesSection>
          <h3>Filmes favoritos</h3>

          <MoviesList 
            moviesToRender={favoriteMovies}
            isRecommendation={true}
          />

        </MoviesSection>
      )}

      {watchedMovies.length > 0 && (
        <MoviesSection>
          <h3>Assisti Recentemente</h3>

          <MoviesList moviesToRender={watchedMovies} />

        </MoviesSection>
      )}

      {favoriteMovies.length <= 0 && watchedMovies.length <= 0 && (
        <MoviesSection>
          <h3>Ops... não há nada por aqui.</h3>
        </MoviesSection>
      )}
  
        
    </Container>
  );
}


