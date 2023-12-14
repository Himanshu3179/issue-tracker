import { patchIssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to create an issue.",
      },
      { status: 401 }
    );
  }
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: params.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to create an issue.",
      },
      { status: 401 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });
  }

  await prisma.issue.delete({ where: { id: params.id } });

  return NextResponse.json({ status: "ok" });
}
