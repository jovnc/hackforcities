// app/page.tsx (or app/your-page/page.tsx)
import axios from "axios";

export default async function Home() {
  const res = await axios.get('http://127.0.0.1:5000/api/hello');
  const message = res.data.message;

  return <div>{message}</div>;
}
