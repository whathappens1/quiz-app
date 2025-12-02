import BiologyChapter5Form from "@/app/components/forms/biology-chapter-5-form"

 export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الثانية أحياء - الفصل الخامس",
  }
}
 
export default async function MultiplicationPage() {
  return <BiologyChapter5Form />
}