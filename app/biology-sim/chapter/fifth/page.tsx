import BiologyChapter5Form from "@/app/components/forms/biology-chapter-5-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الخامس",
  }
}
 
export default async function BioExamUnit5Page() {
  return <BiologyChapter5Form />
}