import {useEffect, useState} from "react";
import {redirect, useParams} from "react-router-dom";
import {getBook} from "../../clients/books.api";
import {BookAuthors, BookPriceAndRating} from "../catalog/book-cards";
import {Thumbnail} from "../common/book-thumbnail";
import {BookTitle} from "../common/book-title";
import '../../App.scss';

export function BookDetails({onAddToCart}) {
  let {isbn} = useParams();
  const [book, setBook] = useState();
  useEffect(() => {
    if (!isbn) {
      redirect("/");
      return;
    }
    getBook(isbn).then((books) => setBook(books[0]));
  }, [isbn]);

  if (!book) {
    return <NoValidBookError/>;
  }
  return (
    <div className="book-details">
      <ValidBookDetails book={book} onAddToCart={onAddToCart}/>
    </div>
  );
}

function NoValidBookError() {
  return <h1>No valid book details found</h1>;
}

function ValidBookDetails({book, onAddToCart}) {
  return (
    <div className="book-details-container">
      <div className="book-details-thumbnail">
        <Thumbnail url={book.thumbnailUrl} title={book.title}></Thumbnail>
        <AddToCartButton onAdd={() => onAddToCart(book);count=count+1}/>
      </div>
      <div className="book-details-text">
        <BookTitle title={book.title}/>
        <BookAuthors authors={book.authors}/>
        <BookPriceAndRating price={book.price} rating={book.rating} discount={book.discount}/>
        <BookDescription book={book}/>
      </div>
    </div>
  );
}


function BookDescription({book}) {
  return (
    <div className="book-description">
      <h3 className="book-description-label">About the Book</h3>
      <p className="leading-relaxed">{book.longDescription}</p>
      <BookDescriptionLineItem property="Category" content={getCategories()}/>
      <BookDescriptionLineItem property="Pages" content={book.pageCount.toString()}/>
      <BookDescriptionLineItem property="Published Date" content={book.publishedDate.split("T")[0]}/>
    </div>
  );

  function getCategories() {
    return book.categories
      .reduce((categories, category) => `${categories}, ${category}`, "")
      .slice(2);
  }
}

function BookDescriptionLineItem({property, content}) {
  return (
    <div className="book-description-line-item">
      <span className="book-description-property">{property}:</span>
      <span className="book-description-value">{content}</span>
    </div>
  );
}


function AddToCartButton({onAdd}) {
  return (
    <button onClick={() => onAdd()} className="add-to-cart-btn" title="Add To Cart">
      Add To Cart
    </button>
  );
}

