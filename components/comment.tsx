'use client';

import { DiscussionEmbed } from "disqus-react"
import config from '@/gine.config';

export const DisqusComments = ({ post }: {
  post: {
    id: string;
    title: string;
  }
}) => {
  const disqusShortname = config.disqus.shortname;
  const disqusConfig = {
    url: "https://gine.me/posts/" + post.id,
    identifier: post.id, // Single post id
    title: post.title // Single post title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}