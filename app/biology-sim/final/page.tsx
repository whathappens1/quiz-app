import BiologyChapterFinalForm from "@/app/components/forms/biology-chapter-final-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - نهائي 40 سؤال",
  }
}
 
export default async function BioExamFinalPage() {
  return <BiologyChapterFinalForm />
}