import { useState } from 'react';
import { Container } from './Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  const createSearchText = query => {
    setSearchText(query);
    setPage(1);
  };

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <Container>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Searchbar createSearchText={createSearchText} />
      <ImageGallery
        searchText={searchText}
        page={page}
        handleLoad={handleLoad}
      />
    </Container>
  );
};
