import BiologyUnit7Form from "@/app/components/forms/biology-unit-7-form";

export async function generateMetadata() {
  return {
    title: "الباب السابع: التكاثر الخلوي",
  };
}

export default async function BiologyUnit7Page() {
  return <BiologyUnit7Form />;
}
