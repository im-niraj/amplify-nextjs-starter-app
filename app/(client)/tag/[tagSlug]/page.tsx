import React from "react";

type Props = {
  params: { tagSlug: string };
};

const TagPage = (props: Props) => {
  return <div>TagPage - {props.params.tagSlug}</div>;
};

export default TagPage;
