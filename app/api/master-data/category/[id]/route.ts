import { prismaDB } from "@/lib/connect";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        let { id } = params;
        let category = await prismaDB.category.update({ where: { id }, data: { deletedAt: new Date(), isDeleted: true } });
        if (!category) {
            return Response.json({ message: "Error in deleting category" }, { status: 400 });
        }
        return Response.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};
