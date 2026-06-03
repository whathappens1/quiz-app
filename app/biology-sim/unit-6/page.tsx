import BiologyUnit6Form from "@/app/components/forms/biology-unit-6-form";

export async function generateMetadata() {
  return {
    title: "الباب السادس: جهاز المناعة",
  };
}

export default async function BiologyUnit6Page() {
  return <BiologyUnit6Form />;
}
