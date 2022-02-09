import {
  useParams
} from "react-router-dom";

function BookPage () {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

export default BookPage;
