import { IssueStatusBadge } from "@/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export default function IssueDetails({issue}:{issue:Issue}) {
  return (
    <>
      <Heading>{issue.title}</Heading> 
      <Flex gap="2" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleString()}</Text>
      </Flex>
      <Card className="prose"> 
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
