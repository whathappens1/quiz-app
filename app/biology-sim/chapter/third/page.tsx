import BiologyChapter3Form from "@/app/components/forms/biology-chapter-3-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الثالث",
  }
}
 
export default async function BioExamUnit3Page() {
  return <BiologyChapter3Form />
}