import { issueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
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
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });
  }

  await prisma.issue.delete({ where: { id: params.id } });

  return NextResponse.json({ status: "ok" });
}