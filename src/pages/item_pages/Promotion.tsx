import { useParams } from "react-router-dom";

export default function Promotion() {
  const {id, title} = useParams()
  console.log(id, title)
  return <div>Promotion</div>;
}
