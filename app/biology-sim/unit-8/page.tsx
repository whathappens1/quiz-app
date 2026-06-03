import BiologyUnit8Form from "@/app/components/forms/biology-unit-8-form";

export async function generateMetadata() {
  return {
    title: "الباب الثامن: التكاثر الجنسي والوراثة",
  };
}

export default async function BiologyUnit8Page() {
  return <BiologyUnit8Form />;
}
