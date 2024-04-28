import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import './App.css'
import ImageModal from "../ImageModal/ImageModal"
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from '../ImageGallery/ImageGallery'
import { fetchArticles } from "/src/articles-api.js"

function App() {
  const [images, setImages] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [quary, setQuary] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
   const [hasReachedEnd, setHasReachedEnd] = useState(false);
  
  const handleSearch = async (newQuary) => {
     
    setQuary(newQuary)
    setPage(1)
    setImages([])
        setModalIsOpen(false);
  }
  const onClick = () => {
    setPage(page + 1)
  }
  useEffect(() => {
    if (quary === "") {
    return
    }
       async function getArticles() {
      try {
        setisLoading(true);
        const data = await fetchArticles(quary, page);

        // Перевірка кінця колекції
        if (data.length === 0) {
          if (page === 1) {
            toast.error("необхідно ввести інший текст", {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },
            });
          } else {
            toast.info("кінець колекції", {
              style: {
                border: "1px solid #28a745",
                padding: "16px",
                color: "#28a745",
              },
              iconTheme: {
                primary: "#28a745",
                secondary: "#FFFAEE",
              },
            });
            setHasReachedEnd(true);
          }
        } else {
          setImages((prevArticles) => [...prevArticles, ...data]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setisLoading(false);
      }
    }
    
    getArticles();
  }, [page, quary]);
  const handleOpenModal = image => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return ( 
  <div className='page'>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage/>}
      {isLoading && <Loader/>
}
      {images.length > 0 && <ImageGallery onClick={handleOpenModal}  images={images}/>}
      {!hasReachedEnd && images.length > 0 && !isLoading && <LoadMoreBtn onClick={onClick} />}
      {hasReachedEnd && (
        <p style={{ color: '#28a745' }}>Кінець колекції</p>
      )}
     <ImageModal
        modalIsOpen={modalIsOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
  </div >
    )
}

export default App
