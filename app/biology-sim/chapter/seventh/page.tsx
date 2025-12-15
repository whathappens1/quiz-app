import BiologyChapter7Form from "@/app/components/forms/biology-chapter-7-form";

export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الثانية أحياء - الفصل السابع",
  };
}

export default async function MultiplicationPage() {
  return <BiologyChapter7Form />;
}
