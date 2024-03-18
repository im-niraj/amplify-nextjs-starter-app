export const GET = async () => {
  try {
    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server Error", error }, { status: 500 });
  }
};
