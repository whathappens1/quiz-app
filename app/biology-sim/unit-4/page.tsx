import BiologyUnit4Form from "@/app/components/forms/biology-unit-4-form";

export async function generateMetadata() {
  return {
    title: "الباب الرابع: جهاز الهضم والغدد الصم",
  };
}

export default async function BiologyUnit4Page() {
  return <BiologyUnit4Form />;
}
