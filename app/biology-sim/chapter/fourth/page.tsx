import BiologyChapter4Form from "@/app/components/forms/biology-chapter-4-form"

 export async function generateMetadata() {
  return {
    title: "أختبار أحياء محاكاة - الفصل الرابع",
  }
}
 
export default async function BioExamUnit4Page() {
  return <BiologyChapter4Form />
}