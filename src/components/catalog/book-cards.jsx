import { Link } from "react-router-dom";
import { Thumbnail } from "../common/book-thumbnail";
import { BookTitle } from "../common/book-title";

export function BookCards({ books }) {
  return (
    <div className="book-cards">
      {books.map((book) => (
        <BookCard key={book.id} {...{ book }} />
      ))}
    </div>
  );
}


function BookCard({ book }) {
  return (
    <Link to={`/books/${book.isbn}`} className="book-card">
      <Thumbnail url={book.thumbnailUrl} title={book.title}/>
      <BookTitle title={book.title}/>
      <BookAuthors authors={book.authors} />
      <BookPriceAndRating price={book.price} rating={book.rating} discount={book.discount} />
    </Link>
  );
}

export function BookAuthors({ authors }) {
  return (
    <span className="book-author-name">
      {authors
        .reduce((authors, author) => authors + ", " + author, "")
        .slice(2)}
    </span>
  );
}


export function BookPriceAndRating({ price, rating, discount }) {
  return (
    <div className="book-pricing-and-rating">
      <p className="actual-book-price">₹{price}</p>
      <p className="selling-book-price">₹{price * (100 - discount)/100}</p>
      <p className="book-price-discount">{discount}% off</p>
      <div className="book-rating">
        <RatingStar rating={rating} />
      </div>
    </div>
  );
}


function RatingStar({ rating }) {
  return (
    <>
      {Array.from(Array(rating).keys()).map((value) => (
        <StarImage key={value}></StarImage>
      ))}
    </>
  );
}

function StarImage() {
  return (
    <svg
      aria-hidden="true"
      className="star-icon"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
}
