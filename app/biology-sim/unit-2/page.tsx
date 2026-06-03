import BiologyUnit2Form from "@/app/components/forms/biology-unit-2-form";

export async function generateMetadata() {
  return {
    title: "الباب الثاني: الجهاز العصبي",
  };
}

export default async function BiologyUnit2Page() {
  return <BiologyUnit2Form />;
}
