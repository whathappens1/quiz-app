import BiologyChapter4Form from "@/app/components/forms/biology-chapter-4-form"

 export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الثانية أحياء - الفصل الرابع",
  }
}
 
export default async function MultiplicationPage() {
  return <BiologyChapter4Form />
}