// pages/api/abstracts.js
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function PUT(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data"); // use your database name
  console.log("in post");

  const { projectTitle, theme, description, team } = await req.json();

  if (!projectTitle || !theme || !description || !team)
    return new Response(
      JSON.stringify({
        message:
          "error!! required fields projectTitle, theme, description, or team not found",
      }),
      { status: 400 }
    );

  const newAbstract = {
    projectTitle,
    theme,
    description,
  };

  const result = await db
    .collection("teams")
    .updateOne({ team: team }, { $set: { abstract: newAbstract } });

  return new Response(
    JSON.stringify({
      message: "Abstract added successfully",
      team: result,
    }),
    { status: 200 }
  );
}
