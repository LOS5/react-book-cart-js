import { BookCards } from "./book-cards";

export function Catalog({ items }) {
  return (
    <>
      <h1 className="catalog-title">Books Catalog</h1>
      <BookCards books={items}></BookCards>
    </>
  );
}
