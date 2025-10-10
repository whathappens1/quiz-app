import BiologyForm from "../components/forms/biology-form"

 export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الاولى أحياء",
  }
}
 
export default async function MultiplicationPage() {
  return <BiologyForm />
}