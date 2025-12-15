import BiologyChapter6Form from "@/app/components/forms/biology-chapter-6-form"

 export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الثانية أحياء - الفصل السادس",
  }
}
  
export default async function MultiplicationPage() {
  return <BiologyChapter6Form />
}