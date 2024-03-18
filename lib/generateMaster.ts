export const generateMasterData = async () => {
  try {
    let res = await fetch(`${process.env.NEXTAUTH_URL}/api/master-data/auto-generate`, { cache: "no-store" });
    await res.json();
  } catch (error) {
  }
};
