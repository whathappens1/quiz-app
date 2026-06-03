import BiologyUnit3Form from "@/app/components/forms/biology-unit-3-form";

export async function generateMetadata() {
  return {
    title: "الباب الثالث: أجهزة الدوران والتنفس والإخراج",
  };
}

export default async function BiologyUnit3Page() {
  return <BiologyUnit3Form />;
}
