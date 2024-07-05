// pages/api/users.js
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function PUT(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data");
  console.log("in post");

  const { team } = await req.json();
  if (!team)
    //@ts-ignore
    return Response.json({
      message: "required field teamnot found",
    });
  const teams = await db
    .collection("teams")
    .updateOne({ team: team }, { $set: { registered: true } });

  // res.json(users);
  //@ts-ignore
  return Response.json({
    message: "team registration succesfully",
    team: teams,
  });
}
