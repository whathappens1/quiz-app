import BiologyChapter6Form from "@/app/components/forms/biology-chapter-6-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل السادس",
  }
}
  
export default async function BioExamUnit6Page() {
  return <BiologyChapter6Form />
}