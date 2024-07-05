// pages/api/searchTeamByEmail.ts
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function POST(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  //@ts-ignore
  const db = client.db("data");
  console.log("in post search team by email");

  const { email } = await req.json();

  if (!email) {
    return Response.json({
      message: "Error!! Required field 'email' not found",
    });
  }

  // Search for a team with the given email
  const existingTeamWithEmail = await db
    .collection("teams")
    .findOne({ "members.email": email });

  if (existingTeamWithEmail) {
    return Response.json({
      message: "Team found with the given email",
      team: existingTeamWithEmail,
    });
  }

  return Response.json({
    message: "No team found with the given email",
    team: false,
  });
}
