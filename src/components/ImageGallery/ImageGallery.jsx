import css from "./ImageGallery.module.css"
import ImageCard from "../ImageCard/ImageCard"
export default function ImageGallery({ images, onClick }) {
    return (
         <>
      <ul className={css.gallery}>
        {images.map(image => (
          <li className={css.image} key={image.id}>
            <ImageCard {...image} onClick={onClick} />
          </li>
        ))}
      </ul>
    </>
    )
}