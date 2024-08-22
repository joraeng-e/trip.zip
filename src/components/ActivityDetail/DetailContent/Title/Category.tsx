interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  return (
    <div className="text-md-regular text-nomad-black dark:text-white">
      {category}
    </div>
  );
}
