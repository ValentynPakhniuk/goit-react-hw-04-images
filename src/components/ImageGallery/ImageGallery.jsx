import { getPixaBay } from 'components/fetch';
import { useEffect, useState } from 'react';
import { CardItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { CardList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button.styled';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { PER_PAGE } from 'components/fetch';

export const ImageGallery = ({ searchText, page, handleLoad }) => {
  const [cardsToShow, setCardsToShow] = useState(0);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPixaBayAsync = async (query, page) => {
    try {
      const data = await getPixaBay(query, page);
      const hits = data.hits.length;
      const totalHits = data.totalHits;
      const quotientPage = Math.ceil(totalHits / PER_PAGE);
      setCardsToShow(totalHits);
      if (hits === 0) {
        setPicture(null);
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (page !== 1) {
        setPicture(prevPicture => [...prevPicture, ...data.hits]);
      } else {
        setPicture([...data.hits]);
      }
      if (page === quotientPage) {
        return toast(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      setError(error);
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = searchText.trim();
    if (query || page) {
      setIsLoading(true);
      setError(null);
      getPixaBayAsync(query, page);
    }
  }, [searchText, page]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {error && <h1>{error.response.data}</h1>}
      {picture && (
        <>
          <CardList>
            {picture.map(el => (
              <CardItem key={el.id} image={el} />
            ))}
          </CardList>
          {cardsToShow > picture.length && (
            <Button type="button" onClick={handleLoad}>
              Load more
            </Button>
          )}
        </>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleLoad: PropTypes.func.isRequired,
};
