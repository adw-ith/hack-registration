// pages/api/users.js
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function PUT(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data"); // use your database name
  console.log("in post");

  const { team, member } = await req.json();

  if (!team || !member)
    return Response.json({
      message: "error!! required field team,member not found",
    });

  const allteams = await db.collection("teams").find({}).toArray();

  for (const team of allteams) {
    const emailExists = team.members.some(
      (memberinside: any) => memberinside.email === member.email
    );
    if (emailExists) {
      return Response.json({ message: "email already in use " });
    }
  }

  const fetchteam = await db.collection("teams").findOne({ team: team });
  if (fetchteam.members.length == 4)
    return Response.json({
      message: "team full",
    });

  const teams = await db
    .collection("teams")
    .updateOne({ team: team }, { $push: { members: member } });

  // res.json(users);
  //@ts-ignore
  return Response.json({
    message: "teammate added successfully",
    team: teams,
  });
}
