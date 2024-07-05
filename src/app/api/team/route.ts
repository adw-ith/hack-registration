// pages/api/users.ts
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function POST(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  //@ts-ignore
  const db = client.db("data");
  console.log("in post team create");

  const { team, members } = await req.json();
  const newTeam = {
    team,
    members,
    registered: false,
    abstract: {
      projectTitle: "",
      theme: "",
      description: "",
    },
  };

  // Check if members[0].email already exists in any team
  const existingTeamWithEmail = await db
    .collection("teams")
    .findOne({ "members.0.email": members[0].email });
  if (existingTeamWithEmail) {
    return Response.json({
      message: "Email address already exists in another team",
      team: existingTeamWithEmail,
    });
  }

  // Check if team name already exists
  const existingTeam = await db.collection("teams").findOne({ team: team });
  if (existingTeam) {
    return Response.json({
      message: "Team name already exists",
      team: existingTeam,
    });
  }

  console.log(`Creating new team: ${team}`);
  if (!team) {
    return Response.json({
      message: "Error!! Required field 'team' not found",
    });
  }

  const result = await db.collection("teams").insertOne(newTeam);

  return Response.json({
    message: "Team added successfully",
    team: result, // Return the newly inserted team object
  });
}
