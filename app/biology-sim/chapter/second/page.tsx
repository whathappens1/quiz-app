import BiologyChapter2Form from "@/app/components/forms/biology-chapter-2-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الثاني",
  }
}
 
export default async function BioExamUnit2Page() {
  return <BiologyChapter2Form />
}