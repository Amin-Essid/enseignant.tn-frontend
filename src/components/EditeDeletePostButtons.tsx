import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditeDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditeDeletePostButtons: React.FC<EditeDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
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
