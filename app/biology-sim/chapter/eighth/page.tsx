import BiologyChapter8Form from "@/app/components/forms/biology-chapter-8-form";

export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الثامن",
  };
}

export default async function BioExamUnit8Page() {
  return <BiologyChapter8Form />;
}
