import BiologyUnit9Form from "@/app/components/forms/biology-unit-9-form";

export async function generateMetadata() {
  return {
    title: "الباب التاسع: الوراثة المعقدة والوراثة البشرية",
  };
}

export default async function BiologyUnit9Page() {
  return <BiologyUnit9Form />;
}
