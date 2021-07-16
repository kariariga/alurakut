import { SiteClient } from "datocms-client";
import dotenv from "dotenv/config.js";

export default async function createRecord(request, response) {
  if (request.method === "POST") {
    const TOKEN = process.env.FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "967732", // model ID
      ...request.body,
    });

    response.json({
      record: record,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}
