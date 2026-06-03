import BiologyUnit5Form from "@/app/components/forms/biology-unit-5-form";

export async function generateMetadata() {
  return {
    title: "الباب الخامس: التكاثر والنمو في الإنسان",
  };
}

export default async function BiologyUnit5Page() {
  return <BiologyUnit5Form />;
}
