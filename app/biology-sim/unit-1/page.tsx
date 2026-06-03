import BiologyUnit1Form from "@/app/components/forms/biology-unit-1-form";

export async function generateMetadata() {
  return {
    title: "الباب الأول: الجهازان الهيكلي والعضلي",
  };
}

export default async function BiologyUnit1Page() {
  return <BiologyUnit1Form />;
}
