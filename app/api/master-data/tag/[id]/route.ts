import { prismaDB } from "@/lib/connect";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        let { id } = params;
        let tag = await prismaDB.tag.update({ where: { id }, data: { deletedAt: new Date(), isDeleted: true } });
        if (!tag) {
            return Response.json({ message: "Error in deleting tag" }, { status: 400 });
        }
        return Response.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};
