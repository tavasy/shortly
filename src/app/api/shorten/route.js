import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Url from "../../../../models/Url";
import shortid from "shortid";

export async function POST(req) {
  const { originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    let url = await Url.findOne({ originalUrl });

    if (!url) {
      const shortUrl = shortid.generate();
      url = new Url({ originalUrl, shortUrl });
      await url.save();
    }

    return NextResponse.json(
      { originalUrl: url.originalUrl, shortUrl: url.shortUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
