import BiologyUnit10Form from "@/app/components/forms/biology-unit-10-form";

export async function generateMetadata() {
  return {
    title: "الباب العاشر: الوراثة الجزيئية",
  };
}

export default async function BiologyUnit10Page() {
  return <BiologyUnit10Form />;
}
