export function Thumbnail({ url, title }) {
  return <img className="thumbnail-image" src={url} alt={title}></img>;
}