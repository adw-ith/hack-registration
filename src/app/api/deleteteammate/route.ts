//@ts-ignore
import clientPromise from "../../../lib/mongodb";
export async function DELETE(req: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data"); // use your database name
  console.log("in post");

  const { email, team } = await req.json();
  console.log(team);
  console.log(`new user is ${email} `);
  if (!email || !team)
    return Response.json({
      message: "error, no email, team provided",
    });
  const filter = { email: email };
  const users = await db.collection("users").deleteOne(filter);

  const updatedteam = await db
    .collection("teams")
    .updateOne({ team: team }, { $pull: { members: { email: email } } });

  if (users.deletedCount === 1)
    return Response.json({
      message: "delete success",
    });
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message: "delete success",
    user: users,
  });
}
