import { redirect } from "next/navigation";
import dbConnect from "../../../lib/dbConnect";
import Url from "../../../models/Url";

export default async function RedirectPage({ params }) {
  const { shorturl } = params;

  await dbConnect();

  const url = await Url.findOne({ shortUrl: shorturl });

  if (url) {
    redirect(url.originalUrl);
  } else {
    return <h1>404 - Not Found</h1>;
  }
}
