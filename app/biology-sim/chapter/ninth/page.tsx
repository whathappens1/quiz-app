import BiologyChapter9Form from "@/app/components/forms/biology-chapter-9-form";

export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل التاسع",
  };
}

export default async function BioExamUnit7Page() {
  return <BiologyChapter9Form />;
}
