import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditeDeletePostButtonsProps {
  id: number;
  creatorId: number;
  filename: string;
}

export const EditeDeletePostButtons: React.FC<EditeDeletePostButtonsProps> = ({
  id,
  creatorId,
  filename,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return (
      <Box>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/files/${filename}`}
          download={filename}
          target="_blank"
        >
          <IconButton
            as={Link}
            mr={4}
            icon="download"
            aria-label="download file"
            onClick={() => {}}
          />
        </a>
      </Box>
    );
  }
  return (
    <Box>
      <a
        href={`http://localhost:4000/files/${filename}`}
        download={filename}
        target="_blank"
      >
        <IconButton
          as={Link}
          mr={4}
          icon="download"
          aria-label="download file"
          onClick={() => {}}
        />
      </a>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          icon="edit"
          aria-label="edit post"
          onClick={() => {}}
        />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="delete post"
        onClick={() =>
          deletePost({
            variables: { id },
            update: (cashe) => {
              cashe.evict({ id: "Post:" + id });
            },
          })
        }
      />
    </Box>
  );
};
