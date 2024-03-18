import React from "react";

type Props = {
  params: { categorySlug: string };
};

const CategoryPage = (props: Props) => {
  return <div>CategoryPage - {props.params.categorySlug}</div>;
};

export default CategoryPage;
