import BiologyChapter1Form from "@/app/components/forms/biology-chapter-1-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الأول",
  }
}
 
export default async function BioExamUnit1Page() {
  return <BiologyChapter1Form />
}